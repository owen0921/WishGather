import React, { useState, useCallback, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Pressable, FlatList, Dimensions, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import CheckoutBar from '../../components/Believer/CheckoutBar';
import OfferingItem from "../../components/Believer/OfferingItem"; 
import CloseButton from "../../components/Utility/CloseButton";
import DrawlotsButton from '../../components/Believer/DrawlotsButton';

import { useRoute } from '@react-navigation/native'; // 確保 useRoute 被正確導入
import { UserContext } from '../../components/Context/UserContext'; //取得 userId
const API=require('../config/DBconfig')
import axios from 'axios';


const { width, height } = Dimensions.get('window');

const OfferingsByTemple = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { userId } = useContext(UserContext);
  const route = useRoute();
  const { templeId } = route.params;  // 從 route 取得 templeId

  const [selectedOfferings, setSelectedOfferings] = useState([]);  // 儲存供品數據
  const [chosenItems, setChosenItems] = useState([]);  // 儲存選中的項目

  const [quantities, setQuantities] = useState({});  // 儲存購物車中的數量
  const [loading, setLoading] = useState(true);  // 加載狀態
  const [templeInfo, setTempleInfo] = useState({});  // 儲存宮廟資訊

 
  // 從後端透過 templeId 取得 temple offering 的資料
  const believerFetchTempleOfferingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/believer_get_temple_items/${templeId}`);
      setSelectedOfferings(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch temple offerings');
    }
  };

  // 使用 useEffect 在頁面加載時獲取供品數據和宮廟資訊
  useEffect(() => {
    believerFetchTempleOfferingData();
    fetchTempleInfo();
  }, [templeId]);

  // 從後端獲取宮廟資訊
  const fetchTempleInfo = async () => {
    try {
      const response = await axios.get(`${API}/believer_get_temple_info/${templeId}`);
      setTempleInfo(response.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch temple information');
    }
  };

  // 將所選物品新增到資料庫的 cart_items 中
  const handleAddToCart = async (title, quantity, price, image) => {
    try {
      const totalAmount = quantity * price;
      const itemCount = quantity;

      await axios.post(`${API}/add_to_cart`, {
        templeName: templeInfo.NAME,
        itemCount,
        totalAmount,
        IMAGE: selectedOfferings.IMAGE,
        pID: userId  // 使用 pID 來表示 userId
      });

      Alert.alert('新增成功', `${title} 已新增至購物車`);
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };

  // 根據所選類別篩選供品並顯示
  const renderOfferingItem = ({ item }) => {
    return (
      <OfferingItem
        imageSource={{ uri: item.IMAGE }}  // 使用資料庫中的圖片URL
        title={item.NAME}                 // 使用資料庫中的名稱
        price={item.PRICE.toString()}     // 使用資料庫中的價格
        description={item.DESCRIPTION}    // 使用資料庫中的描述
        quantity={quantities[item.title]?.quantity || 0}
        onAddToCart={(title, quantity) => handleAddToCart(title, quantity, item.PRICE, item.id)}
      />
    );
  }; 

  const handleCheckout = () => {
    const items = Object.keys(quantities)
      .filter(title => quantities[title].quantity > 0)
      .map(title => ({
        title,
        quantity: quantities[title].quantity,
        price: quantities[title].price,
      }));
  
    console.log("Selected items for checkout:", items);
    navigation.navigate('OrderConfirmationPage', { items });
  };

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top -50,
        paddingBottom: insets.bottom - 40,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}>
        
        <View>
          <Image 
            style={styles.headerImage} 
            contentFit="cover" 
            source={{ uri: templeInfo.IMAGE ? `${API}${templeInfo.IMAGE}` : require("../../assets/rectangle-3.png") }} 
          />
          <CloseButton />
        </View>


        {/* 根據 templeId 顯示宮廟資訊 */}
        <View style={styles.infoContainer}>
          <Text style={styles.mainTitle}>{templeInfo.NAME || "宮廟名稱"}</Text>
        </View>
          
        {loading ? (
          <Text>Loading...</Text>  // 顯示加載狀態
        ) : (
          <FlatList
            data={selectedOfferings}
            renderItem={renderOfferingItem}
            keyExtractor={(item) => item.offering_id.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        )}
        
        <View style={styles.buttonContainer}>
           <CheckoutBar btnText={"前往結帳"} iconName={"cart-outline"} onPress={handleCheckout} />
        </View>

        <View style={styles.buttonContainer}>
          <DrawlotsButton />
        </View>
      </View>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  headerImage: {
    height: height * 0.30,
    opacity: 0.9,
    width: width,
    alignSelf: 'center',
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: '#4F4F4F',
  },
  subTitle: {
    fontSize: 16,
    color: "#9D9D9D",
    marginTop: 5,
  },
  category: {
    fontSize: 18,
    color: "#4F4F4F",
    fontWeight: "500",
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginLeft: width * 0.05,
  },
  selectedCategory: {
    color: "white",
    backgroundColor: "#FFA042",
    borderRadius: 15,
  },
  flatListContent: {
    paddingVertical: 10,
    justifyContent:'center',
    alignItems: 'center',
    paddingBottom:60,
  },
  buttonContainer: {
    width: width,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default OfferingsByTemple;
