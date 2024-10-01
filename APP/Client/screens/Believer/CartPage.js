import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import CartItem from "../../components/Believer/CartItem";
import { UserContext } from '../../components/Context/UserContext'; //取得 userId


import axios from 'axios';


const { width } = Dimensions.get('window');
const API = require('../config/DBconfig');

const CartPage = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { userId } = useContext(UserContext); //取得 userId
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API}/cartItems/${userId}`, { params: { userId } });
      setCartItems(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('獲取購物車資料時發生錯誤:', error);
      setError('無法載入購物車資料。');
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <CartItem
      onPress={() => navigation.navigate("OrderConfirmationPage")}
      imageSource={{ uri: item.IMAGE }}
      orderTitle={`${item.templeName}\n`}
      orderDetails={`${item.itemCount} 項商品 · NT$${item.totalAmount}`}
    />
  );

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingBottom: insets.bottom-35,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}>

        <View style={styles.titleContainer}>
          <Ionicons name="cart-outline" size={30} color="orange" style={styles.icon} />
          <Text style={styles.pageTitle}>購物車</Text>
        </View>

        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContentContainer}
          style={styles.flatList}
        />

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
    borderBottomColor:'#ccc'
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
  listContentContainer: {
    paddingBottom: 15,
  },
  flatList: {
    flex: 1,
  },
});

export default CartPage;
