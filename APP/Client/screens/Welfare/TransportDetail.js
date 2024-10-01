import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import GoBackButton1 from '../../components/Utility/GoBackButton1'; // Assuming you have a GoBackButton component
import PageTitle from '../../components/Utility/PageTitle'; // Assuming you have a PageTitle component
import CloseButton from '../../components/Utility/CloseButton';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const API = require('../config/DBconfig');
const axiosInstance = axios.create({
  baseURL: API,
  timeout: 10000,
});

function TransportDetail({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { temple } = route.params; // Passing temple details from the previous page (WelfareTransportPage)

  // State to manage if the items list should be shown
  const [showItems, setShowItems] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null); // State to store fetched coordinates
  const mapRef = useRef(null);

  // Example items list (you can replace this with actual data)
  const itemsList = [
    { name: '供品A', quantity: 10 },
    { name: '供品B', quantity: 5 },
    { name: '供品C', quantity: 3 },
  ];

  //捐贈品運送的API
  const [temples, setTemples] = useState([]);
  useEffect(() => {  
    axiosInstance.get('/temples')
      .then(response => {
        setTemples(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const geocodeAddress = async (address) => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.EXPO_PUBLIC_API_TOKEN}`;
    
    try {
      const response = await axios.get(url);
      if (response.data.features.length > 0) {
        const { center } = response.data.features[0];
        return { latitude: center[1], longitude: center[0] };
      } else {
        console.error('Geocoding failed: Address not found');
        return null;
      }
    } catch (error) {
      console.error('Geocoding failed:', error);
      return null;
    }
  };

  // UseEffect to fetch coordinates when component mounts
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (temple.ADDRESS) {
        const coords = await geocodeAddress(temple.ADDRESS);
        if (coords) {
          setCoordinates(coords);
          // console.log('Fetched coordinates:', coords); // Log the fetched coordinates
        }
      }
    };

    fetchCoordinates();
  }, [temple.ADDRESS]); //依賴於 temple.ADDRESS 變化

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: insets.top - 50,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>

        {/* Top Section */}
        <View style={styles.headerSection}>
          <Image source={{ uri: temple.IMAGE }} style={styles.templeImage} />
          <Text style={styles.templeName}>{temple.NAME}</Text>
          <Text style={styles.templeAddress}>{'地址 : '}{temple.ADDRESS}</Text>
        </View>

        <View style={styles.btncontainer}>
          <CloseButton />
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>

          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>配送期限 : </Text>
            <Text style={styles.detailValue}>4/1 ~ 4/30</Text> {/* Static value for now */}
          </Text>

          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>配送距離 : </Text>
            <Text style={styles.detailValue}>2.3 km</Text> {/* Static value for now */}
          </Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>配送物資 : </Text>
            <TouchableOpacity
              style={styles.viewItemsButton}
              onPress={() => setShowItems(!showItems)}
            >
              <Text style={styles.viewItemsText}>{showItems ? '收起' : '查看'}</Text>
            </TouchableOpacity>
          </View>

          {/* Conditionally render items list */}
          {showItems && (
            <View style={styles.itemsList}>
              {itemsList.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>數量: {item.quantity}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Map Section */}
          <MapView
            ref={mapRef}
            style={{ width: '100%', height: '90%', alignItems: 'center' }}
            initialRegion={{
              latitude: coordinates ? coordinates.latitude : 22.623, // Default latitude
              longitude: coordinates ? coordinates.longitude : 120.293, // Default longitude
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {/* 添加當前寺廟的 Marker */}
            {coordinates && (
              <Marker
                coordinate={coordinates}
                title={temple.NAME}
                pinColor="orange"
              />
            )}

            {/* Loop through temples and place markers on the map */}
            {temples.map((temple) => (
              <Marker
                key={temple.tID}
                coordinate={{
                  latitude: temple.latitude,
                  longitude: temple.longitude,
                }}
                title={temple.NAME}
                pinColor="orange"
              />
            ))}
            
          </MapView>

          {/* Conditionally show error message */}
          {error && <Text style={styles.errorText}>無法載入宮廟資料: {error.message}</Text>}

        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    height: '40%',
    backgroundColor: 'orange',
    opacity: 0.8,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  btncontainer: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  templeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  templeName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  templeAddress: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20, 
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },
  detailLabel: {
    fontSize: 18,
    color: '#4F4F4F',
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
    color: '#4F4F4F',
  },
  viewItemsButton: {
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginLeft: 8,
    borderRadius: 5,
  },
  viewItemsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemsList: {
    marginTop: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#333',
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TransportDetail;
