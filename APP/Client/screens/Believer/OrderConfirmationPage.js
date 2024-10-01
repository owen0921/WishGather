import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, Image, Dimensions, TextInput, Alert } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import RadioButton from "expo-checkbox"; // You may use a Radio Button library for better control.

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import ConfirmItem from '../../components/Believer/ConfirmItem';
import OrderInfo from '../../components/Believer/OrderInfo';
import DatePickerModal from '../../components/Utility/DatePickerModal';
import TimePickerModal from '../../components/Utility/TimePickerModal';
import PaymentMethodModal from '../../components/Believer/PaymentMethodModal';
import ConfirmModal from '../../components/Believer/ConfirmModal'; 
import CheckoutBar from '../../components/Believer/CheckoutBar';


import { UserContext } from '../../components/Context/UserContext'; //取得 userId
import axios from 'axios';

const API = require('../config/DBconfig');
const { width } = Dimensions.get('window');

const OrderConfirmationPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

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

  const { items = [] } = route.params || {};

  const calculateTotalPrice = () => {
    // 確保 totalAmount 是數字，避免格式問題
    if (cartItems.length > 0) {
      return Number(cartItems[0].totalAmount); // 取出第一個項目的 totalAmount
    }
    return 0; // 如果沒有 cartItems，返回 0 或其他預設值
  };
  
  
  const totalPrice = calculateTotalPrice();

  const [note, setNote] = useState('');

  const [pickupDate, setPickupDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [pickupTime, setPickupTime] = useState({ hour: '06', minute: '00' }); 
  const [isTimePickerVisible, setTimePickerVisible] = useState(false); 

  const [paymentMethod, setPaymentMethod] = useState('現場付款');
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [donation, setDonation] = useState(false); // Default is not donating


  const handleDateChange = (selectedDate) => { setPickupDate(selectedDate); };


 {/* Function - Payment Method */}
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentModalVisible(false);
  };

  {/* Function - Show Confirm Modal */}
  const handleOrderSubmit = () => {
    setConfirmModalVisible(true);
  };

  {/* Function - Confirm and back to HomePage */}
  const handleConfirmOrder = async () => {
    const activity_name = cartItems.length > 0 && cartItems[0].templeName ? cartItems[0].templeName : '未知活動';
    const cart_id = cartItems.length > 0 && cartItems[0].cart_id ? cartItems[0].cart_id : null;

    const orderData = {
      activity_name: activity_name, // 將 templeName 作為活動名稱
      totalAmount: totalPrice, // 訂單總金額
      pickup_date: pickupDate.toISOString().split('T')[0], // 領取日期
      pickup_time: `${pickupTime.hour}:${pickupTime.minute}`, // 領取時間
      payment_method: paymentMethod, // 付款方式
      note: note, // 使用者填寫的備註
      cart_id: cart_id, // 購物車 ID
      donation: donation, // Include the donation status in the order data
    };
    console.log(orderData);

    try {
      const response = await axios.post(`${API}/orders_confirm/${userId}`, orderData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 200) {
        Alert.alert('訂單已送出', '您的訂單已成功提交！');
        navigation.navigate('BelieverHomePage');
      } else {
        Alert.alert('錯誤', '提交訂單失敗，請稍後再試！');
      }
    } catch (error) {
      console.error('提交訂單失敗:', error);
      Alert.alert('錯誤', '提交訂單失敗，請稍後再試！');
    }
  };
  
  


  const renderOrderInfo = () => (
    <View style={styles.orderInfoContainer}>
      <OrderInfo
        iconName="store" 
        iconType="MaterialIcons" 
        title="活動名稱" 
        value={cartItems.length > 0 ? cartItems[0].templeName : '無活動名稱'} // 顯示 templeName
        onPress={() => {}} 
      />
      <OrderInfo
        iconName="calendar" 
        iconType="Entypo" 
        title="領取日期" 
        value={pickupDate.toISOString().split('T')[0]}
        onPress={() => setDatePickerVisible(true)} 
      />
      <OrderInfo
        iconName="clock" 
        iconType="Entypo" 
        title="領取時間" 
        value={`${pickupTime.hour}:${pickupTime.minute}`}
        onPress={() => setTimePickerVisible(true)} 
      />
      <OrderInfo
        iconName="payment" 
        iconType="MaterialIcons" 
        title="付款方式" 
        value={paymentMethod} 
        onPress={() => setPaymentModalVisible(true)} 
      />
      {paymentMethod === '線上轉帳付款' && (
        <View style={styles.paymentAccountContainer}>
          <Text style={styles.paymentAccountText}>宮廟匯款帳號 : 72668349{"\n"}請於送出訂單後12小時之內匯款</Text>
        </View>
      )}
    </View>
  );

  const orderDetails = {
    eventName: cartItems.length > 0 ? cartItems[0].templeName : "無活動名稱", // 如果有 templeName，顯示第一個 templeName
    pickupDate: pickupDate.toISOString().split('T')[0],
    pickupTime: `${pickupTime.hour}:${pickupTime.minute}`,
    paymentMethod: paymentMethod,
    totalPrice: totalPrice,

  };

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top, 
        paddingBottom: insets.bottom-40, 
        paddingLeft: insets.left, 
        paddingRight: insets.right 
      }}>

        <GoBackButton1 destination="OfferingsByTemple" />

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <FontAwesome5 name="file-alt" size={24} color="orange" style={styles.icon} />
            <Text style={styles.pageTitle}>您的訂單</Text>
          </View>

          {/* Item */}
          {items.map((item, index) => (
            <View style={styles.itemsContainer}>
              <ConfirmItem key={item.id} quantity={item.quantity} title={item.title} price={item.price} />
            </View>
          ))}
          
          {/* Total */}
          <View style={{width:width*0.95, paddingHorizontal:10, paddingTop: 15,justifyContent:"center", alignItems:"flex-end"}}>
            <Text style={{fontSize:18, fontWeight:"bold", color:"#4f4f4f"}}>總計 :  <Text style={{color:"orange"}}>${calculateTotalPrice()}</Text>  元</Text>
          </View>
          
          {/* Donation Choose*/}
          <View style={styles.titleContainer}>
            <MaterialIcons name="volunteer-activism" size={24} color="orange" style={styles.icon} />
            <Text style={styles.pageTitle}>捐贈選擇</Text>
          </View>
        
          <View style={styles.donationButtonContainer}>
            {/* 捐赠按钮 */}
            <Pressable
              style={[styles.donationButton, donation ? styles.selectedButton : null]}
              onPress={() => setDonation(true)} // 设置为捐赠
            >
              <Text style={[styles.donationButtonText, donation ? styles.selectedButtonText : null]}>捐贈</Text>
            </Pressable>

            {/* 不捐赠按钮 */}
            <Pressable
              style={[styles.donationButton, !donation ? styles.selectedButton : null]}
              onPress={() => setDonation(false)} // 设置为不捐赠
            >
              <Text style={[styles.donationButtonText, !donation ? styles.selectedButtonText : null]}>不捐贈</Text>
            </Pressable>  
          </View>
          
        
        {/* Add Donation Button */}
        {/* <View style={styles.donationButtonContainer}>
          <Pressable
            style={[styles.donationButton, donation ? styles.selectedButton : null]}
            onPress={() => setDonation(!donation)} // Toggle donation status
          >
            <Text style={styles.donationButtonText}>
              {donation ? '捐贈' : '不捐贈'}
            </Text>
          </Pressable>
        </View> */}

        

          {/* Note */}
          <View style={styles.titleContainer}>
            <MaterialIcons name="add-comment" size={24} color="orange" style={styles.icon} />
            <Text style={styles.pageTitle}>新增備註</Text>
          </View>

          <View style={styles.noteContainer}>
            <TextInput
              style={styles.noteInput}
              placeholder='請在此撰寫備註...'
              multiline
              value={note}
              onChangeText={setNote}
            />
          </View>
          
          {/* OrderInfo */}
          {renderOrderInfo()}

        </ScrollView>
        
        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
           <CheckoutBar btnText={"送出訂單"} iconName={"checkbox-outline"} onPress={handleOrderSubmit} />
        </View>

        {/* Confirmation Modal */}
        <ConfirmModal
            isVisible={isConfirmModalVisible}
            onCancel={() => setConfirmModalVisible(false)}
            onConfirm={handleConfirmOrder}
            orderDetails={orderDetails}
            animationType="fade" transparent
        />
        {/* Date Picker Modal */}
        <DatePickerModal
          isVisible={isDatePickerVisible}
          onClose={() => setDatePickerVisible(false)}
          date={pickupDate}
          onChange={handleDateChange}
        />

        {/* Time Picker Modal */}
        <TimePickerModal
          isVisible={isTimePickerVisible}
          initialTime={pickupTime}
          onClose={() => setTimePickerVisible(false)}
          onConfirm={(hour, minute) => {
            setPickupTime({ hour, minute });
            setTimePickerVisible(false);
          }}
        />
        {/* Payment Method Modal*/}
        <PaymentMethodModal
          isVisible={isPaymentModalVisible}
          onClose={() => setPaymentModalVisible(false)}
          onMethodSelect={handlePaymentMethodChange}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: width * 0.95,
    flexDirection:'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,     
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10, 
  },
  pageTitle: {
    fontSize: 26,
    color: "#4F4F4F",
    fontWeight: "bold",
    textAlign: 'left',
    marginVertical: 2,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 80,
  },
  itemsContainer: {
    width: width*0.95,
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  noteContainer: {
    width: width*0.95,
    marginVertical: 2,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth:1,
    borderColor: '#E0E0E0',
  },
  noteInput: {
    height: 100,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    textAlignVertical: 'top',
  },
  orderInfoContainer: {
    width: width*0.95,
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 20,
  },
  paymentAccountContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  paymentAccountText: {
    fontSize: 16,
    color: "#4F4F4F",
    textAlign: "center",
  },
  buttonContainer: {
    width: width,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  donationButtonContainer: {
    width: width * 0.95,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  donationButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: width * 0.4,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  selectedButton: {
    backgroundColor: 'orange',
    color:'white', 
  },
  selectedButtonText:{
    color:'white',

  },
  donationButtonText: {
    fontSize: 16,
    fontWeight:'bold',
    color: '#4F4F4F',
  },
  
});

export default OrderConfirmationPage;
