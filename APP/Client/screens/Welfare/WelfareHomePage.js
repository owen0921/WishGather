import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import SectionHeader from '../../components/Utility/SectionHeader';
import { UserContext } from '../../components/Context/UserContext';

const API = require('../config/DBconfig');
const { width, height } = Dimensions.get('window');

function WelfareHomePage() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { userId } = useContext(UserContext);
  const [temples, setTemples] = useState([]);
  const [welfares, setWelfaresData] = useState([]);
  const [anotherData, setAnotherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch temples data
  useEffect(() => {
    axios.get(`${API}/temples`)
      .then(response => {
        setTemples(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  // Fetch user data
  useEffect(() => {
    if (userId) {
      axios.get(`${API}/sw_organization/${userId}`)
        .then(response => {
          setWelfaresData(response.data[0]);
        })
        .catch(error => {
          setError(error);
        });
    }
  }, [userId]);

  // Fetch additional data
  useEffect(() => {
    axios.get(`${API}/anotherDataTable`)
      .then(response => {
        setAnotherData(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const transportItem = ({ item }) => (
    <View style={styles.donateItemContainer}>
      {/* 顯示照片 */}
      
        <Image
        source={{ uri: `${API}${item.IMAGE}` }} // Assuming the image path is relative to the API base URL
        style={styles.templeImage}
      />
      
      <Text style={styles.donateItemTitle}>{item.NAME}</Text>
      <Text style={styles.donateItemText}>{item.ADDRESS}</Text>
    </View>
  );

  const matchingItem = ({ item }) => (
    <View style={styles.anotherItemContainer}>
      <Text style={styles.anotherItemText}>Field1: {item.TEMPLE_NAME}</Text>
      <Text style={styles.anotherItemText}>Field2: {item.EVENT_NAME}</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <View style={[styles.container, {
        paddingTop: insets.top + 25,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 30,
        paddingRight: insets.right + 30
      }]}>
        
        <View style={{ width: width * 0.95, flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'center', marginBottom: 35 }}>
          <MaterialCommunityIcons name="home-heart" size={30} color="orange" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4F4F4F' }}>
            {'歡迎回來 ! '}{welfares.NAME}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <SectionHeader title="捐贈運送狀態" onPress={() => navigation.navigate('WelfareTransportPage')} />
          <FlatList
            data={temples}
            renderItem={transportItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>

        <View style={styles.infoContainer}>
          <SectionHeader title="媒合確認" onPress={() => navigation.navigate('WelfareMatchingPage')} />
        </View>

        <View>
          <FlatList
            data={anotherData}
            renderItem={matchingItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {error && <Text style={styles.errorText}>{error.message}</Text>}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'start',
    alignItems: 'start',
  },
  infoContainer: {
    width: width * 0.95,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 40,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  flatListContainer: {
    alignSelf: 'center',
  },
  donateItemContainer: {
    width: width * 0.4,
    height: 230,
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    alignItems:'flex-start',
    justifyContent: 'start',
  },
  templeImage: {
    width: '95%',
    height: 120, // 控制圖片高度
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,

    alignSelf:'center',
  },
  donateItemTitle: {
    color: '#4F4F4F',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  donateItemText: {
    fontSize: 14,
    color: '#4F4F4F',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    top: '20%',
  },
});

export default WelfareHomePage;
