import React, { useEffect, useState, useCallback, useContext, useRef } from "react";
import { StyleSheet, View, Text, Dimensions, Pressable, Modal } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { UserContext } from '../../components/Context/UserContext';
import AddressOverlay from "../../components/Believer/AddressOverlay";
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');
const API = require('../config/DBconfig');
const axiosInstance = axios.create({
  baseURL: API,
  timeout: 10000,
});

const BelieverLeftoverPage = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [locationIconVisible, setLocationIconVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("定位中...");
  const [allTemples, setAllTemples] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const { userId } = useContext(UserContext);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchTemplesAndOfferings = async () => {
      try {
        // 獲取所有宮廟資料
        const templesResponse = await axios.get(`${API}/temples`);
        const templesWithCoordinates = await Promise.all(templesResponse.data.map(async (temple) => {
          const coordinates = await geocodeAddress(temple.ADDRESS);
          return { ...temple, latitude: coordinates.latitude, longitude: coordinates.longitude };
        }));

        // 獲取所有供品資料
        const offeringsResponse = await axios.get(`${API}/offerings`);
        const offerings = offeringsResponse.data;

        // 將供品資料與宮廟資料合併
        const templesWithOfferings = templesWithCoordinates.map(temple => {
          const templeOfferings = offerings.filter(offering => 
            offering.tID_fk === temple.tID && offering.TYPE === 'A'
          );

          // 在這裡添加 console.log 以檢查結果
        //   templeOfferings.forEach(offering => {
        //     console.log(`宮廟 ID: ${temple.tID}, 供品名稱: ${offering.NAME}, 數量: ${offering.AMOUNT}`);
        //   });
          return {
            ...temple,
            offerings: templeOfferings
          };
        });

        setAllTemples(templesWithOfferings);
      } catch (error) {
        console.error("獲取資料時發生錯誤", error);
        setError(error);
      }
    };

    fetchTemplesAndOfferings();
  }, []);

  const geocodeAddress = async (address) => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.EXPO_PUBLIC_API_TOKEN}`;
  
    try {
      const response = await axios.get(url);
      if (response.data.features.length > 0) {
        const { center } = response.data.features[0];
        return { latitude: center[1], longitude: center[0] };
      } else {
        console.error('地理編碼失敗：找不到對應的地址');
        return null;
      }
    } catch (error) {
      console.error('地理編碼失敗：', error);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setCurrentAddress('無法獲取位置權限');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        setUserLocation(location.coords);
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }, 1000);
        }
      }

      let result = await Location.reverseGeocodeAsync(location.coords);
      if (result.length > 0) {
        let address = result[0];
        setCurrentAddress(`${address.city || ''}${address.street || ''}${address.streetNumber || ''}`.trim());
      }
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingBottom: insets.bottom - 35,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="map-search-outline" size={30} color="orange" style={styles.icon} />
          <Text style={styles.pageTitle}>剩食地圖</Text>
        </View>

        <View style={styles.locationContainer}>
          <Pressable style={styles.locationIcon} onPress={() => setLocationIconVisible(true)}>
            <MaterialCommunityIcons name="map-marker" size={26} color="orange" />
          </Pressable>
          <Text style={styles.locationText}>當前位置: {currentAddress}</Text>
        </View>

        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 22.624,
            longitude: 120.299,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {allTemples.map((temple) => (
            <Marker
              key={temple.tID}
              coordinate={{
                latitude: temple.latitude,
                longitude: temple.longitude,
              }}
              title={temple.NAME}
              pinColor="orange"
              onPress={() => setSelectedTemple(temple)}
            />
          ))}

          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="我的位置"
              pinColor="#600000"
            />
          )}
        </MapView>

        {selectedTemple && (
          <Modal
          transparent={true}
          visible={!!selectedTemple}
          animationType="fade"
          onRequestClose={() => setSelectedTemple(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Modal Title */}
              <Text style={styles.modalTitle}>現有供品 - 水果</Text>
              {selectedTemple && (
                <>
                  {/* Temple Name */}
                  <Text style={styles.modalSubtitle}>{selectedTemple.NAME}</Text>
        
                  {/* Offerings Table */}
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableHeader}>名稱</Text>
                      <Text style={styles.tableHeader}>數量</Text>
                    </View>
        
                    {/* Offerings List */}
                    {selectedTemple.offerings && selectedTemple.offerings.length > 0 ? (
                      selectedTemple.offerings.map((offering, index) => (
                        <View key={index} style={styles.tableRow}>
                          <Text style={styles.tableCell}>{offering.NAME}</Text>
                          <Text style={styles.tableCell}>{offering.AMOUNT}</Text>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.noOfferingsText}>目前尚無供品</Text>
                    )}
                  </View>
                </>
              )}
        
              {/* Close Button */}
              <Pressable onPress={() => setSelectedTemple(null)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>關閉</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        
        )}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: width * 0.95,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: 15,
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
  },
  locationContainer: {
    width:"95%",
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1, //Test
  },
  locationIcon: {
    width: 25,
    height: 25,
  },
  locationText: {
    color: "#4F4F4F",
    fontSize: 16,
    fontWeight:'semibold',
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  overlayBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  icon: {
    marginRight: 10,
  },
  pageTitle: {
    fontSize: 28,
    color: "#4F4F4F",
    fontWeight: "bold",
    textAlign: 'left',
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明的深色背景
  },
  modalContainer: {
    width: '75%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5, // 提升陰影效果
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight:'semibold',
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    width: '90%',
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tableCell: {
    fontSize: 16,
    color: '#4F4F4F',
  },
  noOfferingsText: {
    textAlign: 'center',
    paddingVertical: 15,
    color: '#888',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'orange',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, 
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BelieverLeftoverPage;
