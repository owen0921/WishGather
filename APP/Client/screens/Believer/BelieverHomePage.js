import React, { useState, useCallback, useEffect, useContext } from "react";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, TextInput, Pressable, Modal, StyleSheet, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import axios from 'axios';

import TempleDistance from "../../components/Believer/TempleDistance";
import AddressOverlay from "../../components/Believer/AddressOverlay";
import DrawlotsButton from "../../components/Believer/DrawlotsButton";
import {UserContext} from '../../components/Context/UserContext';
const API = require('../config/DBconfig');

import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');
const axiosInstance = axios.create({
  baseURL: API,
  timeout: 10000, // 設置 10 秒超時（默認是 0，表示無限等待）
});

const BelieverHomePage = () => {
  const [locationIconVisible, setLocationIconVisible] = useState(false);
  const [text1Visible, setText1Visible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentAddress, setCurrentAddress] = useState("定位中...");
  const [nearbyTemples, setNearbyTemples] = useState([]);
  const [allTemples, setAllTemples] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const { userId } = useContext(UserContext);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [error, setError] = useState(null);

// 從API獲取所有宮廟數據
useEffect(() => {
  axios.get(`${API}/temples`)
    .then(response => {
      setAllTemples(response.data);
    })
    .catch(error => {
      setError(error);
    });
}, []);

  const openLocationIcon = useCallback(() => {
    setLocationIconVisible(true);
  }, []);

  const closeLocationIcon = useCallback(() => {
    setLocationIconVisible(false);
  }, []);

  const openText1 = useCallback(() => {
    setText1Visible(true);
  }, []);

  const closeText1 = useCallback(() => {
    setText1Visible(false);
  }, []);

  // const handleAddressSubmit = useCallback((newAddress) => {
  //   if (newAddress) {
  //     setCurrentAddress(newAddress);
  //   }
  //   setLocationIconVisible(false);
  //   setText1Visible(false);
  // }, []);
  const handleAddressSubmit = useCallback(async (newAddress) => {
    if (newAddress) {
      setCurrentAddress(newAddress);
      const newLocation = await geocodeAddress(newAddress);
      if (newLocation) {
        setUserLocation(newLocation); // 更新 userLocation 為新地址的座標
      }
    }
    setLocationIconVisible(false);
    setText1Visible(false);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setCurrentAddress('無法獲取位置權限');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        setUserLocation(location.coords); // 確保 userLocation 被正確設置
      } else {
        setCurrentAddress('無法獲取位置信息');
      }

      let result = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      if (result.length > 0) {
        let address = result[0];
        let fullAddress = `${address.city || ''}${address.street || ''}${address.streetNumber || ''}`.trim();
        setCurrentAddress(fullAddress || '無法獲取具體地址');
      }
    })();
  }, []);

  const geocodeAddress = async (address) => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.EXPO_PUBLIC_API_TOKEN}`;
  
    try {
      const response = await axios.get(url);
      if (response.data.features.length > 0) {
        const { center } = response.data.features[0];
        return { latitude: center[1], longitude: center[0] }; // 注意緯度和經度的位置
      } else {
        console.error('地理編碼失敗：找不到對應的地址');
        return null;
      }
    } catch (error) {
      console.error('地理編碼失敗：', error);
      return null;
    }
  };
  

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  const findNearbyTemples = async () => {
    if (!userLocation) {
      alert('無法獲取宮廟資訊');
      return;
    }
  
    console.log("User location:", userLocation);  // 確認 userLocation 是否存在
  
    try {
      const templesWithDistance = await Promise.all(allTemples.map(async temple => {
        if (temple.COORDINATE && typeof temple.COORDINATE === 'string') {
          const [lat, lon] = temple.COORDINATE.split(',').map(Number);
          if (!isNaN(lat) && !isNaN(lon)) {
            const distance = calculateDistance(userLocation.latitude, userLocation.longitude, lat, lon);
            console.log(`Distance to ${temple.NAME}: ${distance}`);
            return { ...temple, distance };
          }
        }
        
        if (temple.ADDRESS) {
          const coordinates = await geocodeAddress(temple.ADDRESS);
          if (coordinates) {
            const distance = calculateDistance(userLocation.latitude, userLocation.longitude, coordinates.latitude, coordinates.longitude);
            console.log(`Distance to ${temple.NAME} (from address): ${distance}`);
            return { ...temple, distance };
          }
        }
  
        return { ...temple, distance: Infinity };
      }));
  
      const sortedTemples = templesWithDistance.sort((a, b) => a.distance - b.distance);
      const nearestFiveTemples = sortedTemples.slice(0, 5);
  
      setNearbyTemples(nearestFiveTemples);
      console.log("Nearby temples:", nearestFiveTemples);  // 確認 temple 的排序結果
    } catch (error) {
      console.error("Error in findNearbyTemples:", error);  // 如果出錯，將錯誤打印出來
    }
  };
  

  const renderTempleItem = ({ item }) => (
    <TempleDistance
      // imageSource={{ uri: item.IMAGE }}
      //imageSource={item.IMAGE}
      imageSource={{ uri: item.IMAGE ? `${API}${item.IMAGE}` : 'https://news.nsysu.edu.tw/static/file/120/1120/pictures/930/m/mczh-tw810x810_small253522_197187713212.jpg' }}
      temple={item.NAME}
      distance={`${item.distance.toFixed(2)} km`}
      onPress={() => navigation.navigate("OfferingsByTemple", { templeId: item.tID })}
    />
  );

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: "#f2f2f2",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom -40,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}>
        <View style={styles.buttonContainer}>
          <DrawlotsButton />
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          
        <View style={{ marginRight: 10 }}>
          <Pressable style={styles.locationIcon} onPress={openLocationIcon}>
            <MaterialCommunityIcons name="map-marker" size={26} color="orange" />
          </Pressable>
        </View>

        <View>
            <Pressable style={styles.pressable} onPress={openText1}>
              <Text style={styles.locationText}>當前位置: {currentAddress}  </Text>
            </Pressable>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="搜尋(Ex:左營金鑾殿)"
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Find Nearby Temples Button */}
          <Pressable style={styles.findNearbyButton} onPress={findNearbyTemples}>
            <Entypo name="chevron-small-down" size={24} color="white" />
            <Text style={styles.findNearbyButtonText}>查詢附近宮廟</Text>
          </Pressable>

        {/* Temples List */}
        <FlatList
          data={nearbyTemples}
          renderItem={renderTempleItem}
          // Image={renderTempleItem.imageSource}
          // keyExtractor={(item) => item.tID.toString()}
          style={styles.templeList}
          // contentContainerStyle={styles.templeListContent}
        />

        {/* Temple */}
        
        {/* <FlatList
          data={temples}
          renderItem={({ item }) => (
            <TempleDistance
              imageSource={item.imageSource}
              temple={item.temple}
              event={item.event}
              distance={item.distance}
              date1={item.date1}
              date2={item.date2}
              onPress={() => navigation.navigate("OfferingsByTemple")}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.activityContainer}
        /> */}

        {/*Modal - address modify*/}
        <Modal animationType="fade" transparent visible={locationIconVisible}>
          <View style={styles.overlay}>
            <Pressable style={styles.overlayBg} onPress={closeLocationIcon} />
            <AddressOverlay onClose={closeLocationIcon} onSubmit={handleAddressSubmit} />
          </View>
        </Modal>

        <Modal animationType="fade" transparent visible={text1Visible}>
          <View style={styles.overlay}>
            <Pressable style={styles.overlayBg} onPress={closeText1} />
            <AddressOverlay onClose={closeText1} onSubmit={handleAddressSubmit} />
          </View>
        </Modal>


      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  buttonContainer: { //Drawlots
    width: width,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: -40,
    zIndex: 9999,
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
  },
  searchContainer: {
    width: width*0.95,
    height:50,
    justifyContent:"center",
    marginBottom:10,
    paddingHorizontal: 10,
    // borderWidth:1 //Test
  },
  findNearbyButton: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  findNearbyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  input: {
    width:"100%",
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  templeList: {
    width: width*0.95,
    alignSelf:'center',
    padding: 10,
    paddingBottom:60,
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
    width: '100%',
    height: '100%',
  },
});

export default BelieverHomePage;


