import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, Pressable, } from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import PageTitle from '../../components/Utility/PageTitle';

const API = require('../config/DBconfig');
const { width, height } = Dimensions.get('window'); 

function WelfareTransportPage() {  
  const navigation = useNavigation();
  const [error, setError] = useState(null); 
  const insets = useSafeAreaInsets();

  //捐贈品運送的API
  const [temples, setTemples] = useState([]);
  useEffect(() => {  
    axios.get(`${API}/temples`)
      .then(response => {
        setTemples(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  {/* 還需要一個column儲存運送狀態的state */}

  const handleTemplePress = (temple) => {
    // Navigate to TransportDetail and pass temple data
    navigation.navigate('TransportDetail', { temple });
  };

  {/*放到資料庫裡的資料 */}
  // const temples = [
  //   {
  //     NAME: '高雄市文武聖殿',
  //     ADDRESS: '前金區民權街32號',
  //     STATE: '確認收貨',
  //     IMAGE: 'https://example.com/temple-image1.jpg', // Replace with actual image URL
  //   },
  //   {
  //     NAME: '台北市大天后宮',
  //     ADDRESS: '大同區民生西路307號',
  //     STATE: '待出貨',
  //     IMAGE: 'https://example.com/temple-image2.jpg', // Replace with actual image URL
  //   },
  //   {
  //     NAME: '台中市媽祖廟',
  //     ADDRESS: '中區建國路74號',
  //     STATE: '待出貨',
  //     IMAGE: 'https://example.com/temple-image3.jpg', // Replace with actual image URL
  //   },
  // ];


  const transportItem = ({ item }) => (
    <Pressable  style={styles.itemContainer} onPress={() => handleTemplePress(item)}>
      {/* Image of the temple */}
      <Image
        source={{ uri: `${API}${item.IMAGE}` }} // Assuming the image path is relative to the API base URL
        style={styles.templeImage}
      />

      {/* Temple details */}
      <View style={styles.detailsContainer}>
        <View style={{}}>

          <View style={{flexDirection:'row',}}>
            <MaterialIcons name="temple-buddhist" size={20} color="#4F4F4F" />
            <Text style={styles.templeName}>{item.NAME}{"\n"}</Text>
          </View>
          
          <Text style={styles.address}>{item.ADDRESS}</Text>
        </View>
      </View>

      <View style={styles.transportState}>
        <Text style={styles.stateText}>{item.STATE}</Text>
      </View>
    </Pressable>
  );
  

  
  return (

    <SafeAreaProvider>
      <View style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'start',
    
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom-40,
          paddingLeft: insets.left,
          paddingRight: insets.right
      }}>


      <GoBackButton1 />
      
      <PageTitle titleText="捐贈運送狀態" iconName="emoji-transportation" /> 
      
      <View style={styles.donateListContainer}>
        <FlatList
          data={temples}
          renderItem={transportItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {error && <Text style={styles.errorText}>{error.message}</Text>}

      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  btncontainer:{
    position: 'absolute',
    top: 60,
  },
  
  text: {
    fontSize: 20,
    color: "black",
    position: 'absolute',
    left: '10%',
  },
  donateListContainer: {
    width: width,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    paddingHorizontal:10,
    paddingBottom: 80,
    // borderWidth:1
  },
  itemContainer: {
    width: width*0.95,
    height: 120,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 5,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  templeImage:{
    width:90,
    height:90,
    borderRadius:10,

  },
  detailsContainer:{
    width: "60%",
    height:'100%',
    alignItems:'flex-start',
    alignSelf:'center',
    paddingTop: 15,
    paddingHorizontal: 10,
    lineHeight: 30,
    // borderWidth:1,

  },
  templeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#4F4F4F',
    marginLeft: 5,
  },
  address: {
    fontSize: 14,
    color: 'gray',
    marginLeft:3,
  },
  transportState:{
    height:'100%',
    justifyContent:'flex-end',
    paddingBottom: 5,
    paddingHorizontal: 10,
    // borderWidth:1
  },
  stateText:{
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    top:'20%',
  },
});
export default  WelfareTransportPage;
