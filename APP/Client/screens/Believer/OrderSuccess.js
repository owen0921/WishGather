import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import axios from 'axios';
import { StyleSheet, Pressable, Text, View ,SafeAreaView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import GoBackButton1 from "../../components/Utility/GoBackButton1";


const { width, height } = Dimensions.get("window");

const API=require('../config/DBconfig')

const OrderSuccess = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    
    axios.get(`${API}/transaction`)
      .then(response => {
        setTransaction(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the temples!!!', error);
      });
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: "orange",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom -40,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}>
        <View style={styles.btncontainer}><GoBackButton1 /></View>

        {/* Whole White Block */}
        <View style={styles.recieptBlock}>
          <View style={{flexDirection:'row'}}>
            <Ionicons name="checkmark-done-circle-outline" size={36} color="orange" />
            <Text style={styles.orderStatus}>訂單成立</Text>
          </View>
          

          <View style={styles.infoContainer}>
            {transaction.map((transaction, index) => (
            <View key={index} style={styles.infoContainer}>
              <Text style={styles.infoText}>
                <Text style={styles.infoLabel}>宮廟名稱 : </Text>
                <Text style={styles.infoContent}>{transaction.tNO}{"\n"}</Text>
                <Text style={styles.infoLabel}>交易時間 : </Text>
                <Text style={styles.infoContent}>{transaction.TRANSACTION_TIME}{"\n"}</Text>
                <Text style={styles.infoLabel}>交易方式 : </Text>
                <Text style={styles.infoContent}>{transaction.TRANSACTION_METHOD}{"\n"}</Text>
                <Text style={styles.infoLabel}>銀行代碼 : </Text>
                <Text style={styles.infoContent}>${transaction.BANK_CODE}{"\n"}</Text>
                <Text style={styles.infoLabel}>銀行名稱 : </Text>
                <Text style={styles.infoContent}>{transaction.BANK_NAME}{"\n"}</Text>
                <Text style={styles.infoLabel}>領取時間 : </Text>
                <Text style={styles.infoContent}>{transaction.EXPIRATION_DATE}</Text>
              </Text>
            </View>
          ))}
          </View>

          {/* <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>宮廟名稱: </Text>
              <Text style={styles.infoContent}>行天宮{"\n"}</Text>
              <Text style={styles.infoLabel}>宮廟地址: </Text>
              <Text style={styles.infoContent}>10491台北市中山區民權東路二段109號{"\n"}</Text>
              <Text style={styles.infoLabel}>總數量: </Text>
              <Text style={styles.infoContent}>3{"\n"}</Text>
              <Text style={styles.infoLabel}>總金額: </Text>
              <Text style={styles.infoContent}>$1040{"\n"}</Text>
              <Text style={styles.infoLabel}>捐贈供品清單: </Text>
              <Text style={styles.infoContent}>草仔粿 * 2{"\n"}發糕 * 100{"\n"}</Text>
              <Text style={styles.infoLabel}>領取時間: </Text>
              <Text style={styles.infoContent}>2024/08/05 P.M.2:50</Text>
            </Text>
          </View> */}

          {/* Home Button */}
          {/* <Pressable style={styles.confirmButton} onPress={() => navigation.navigate("HomePage")}>
            <Image
              style={styles.confirmButtonBackground}
              contentFit="cover"
              source={require("../assets/rectangle-91.png")}
            />
            <Text style={styles.confirmButtonText}>回首頁</Text>
          </Pressable> */}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  btncontainer:{
    position: 'absolute',
    top: 60,
    left: 10,
  },
  recieptBlock: {
    width: width * 0.9,
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderStatus: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#4F4F4F',
    marginLeft: 10,
    marginBottom: 20,
  },
  infoContainer: {
    height: height*0.3,
    alignItems: "flex-start",
  },
  infoText: {
    fontSize: 16,
    color: '#4F4F4F',
    lineHeight: 40,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoContent: {
    marginBottom: 10,
  },
});

export default OrderSuccess;
