import React, { useState ,useContext, useEffect } from 'react';
import { View, Text, TextInput, Alert, Image, StyleSheet, Dimensions, ScrollView, Pressable } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // 使用 Expo 的 Icon 庫

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import PageTitle from '../../components/Utility/PageTitle';
import CheckoutBar from '../../components/Believer/CheckoutBar';

const API=require('../config/DBconfig')
import axios from 'axios';
import { UserContext } from '../../components/Context/UserContext';

const { width } = Dimensions.get('window');

const EditOfferingInfoPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { offering } = route.params;
  const { userId } = useContext(UserContext);

  const [image, setImage] = useState(offering.IMAGE); 
  const [name, setName] = useState(offering.NAME); 
  const [price, setPrice] = useState(offering.PRICE.toString()); 
  const [stock, setStock] = useState(offering.AMOUNT.toString()); 
  const [remark, setRemark] = useState(offering.DESCRIPTION || ''); 
  const offering_id = offering.offering_id;



  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      Alert.alert('相機需要存取權限!請更改設定');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const handleSave = async () =>{
    if (!name || isNaN(price) || isNaN(stock)) {
      Alert.alert('請輸入有效的供品名稱、金額和庫存數量');
      return;
    }

    const updatedOffering = {
      ...offering,
      imageUrl: image,
      name,
      price: parseFloat(price),
      amount: parseInt(stock),
      remark,
    };
    

    try {
      // 使用 await 來處理 axios 請求
      const response = await axios.post(`${API}/edit_temple_offering/${offering_id}`, updatedOffering);
      Alert.alert('供品已更新！', response.data.message);
      navigation.navigate('OfferingEditPage');
    } catch (error) {
      console.error('Error uploading offering:', error);
      Alert.alert('供品更新失敗', '請稍後再試');
    }
  };

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: '#f2f2f2',
        justifyContent: 'start',
        alignItems: 'center',
        paddingTop: insets.top + 30,
        paddingBottom: insets.bottom - 40,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}>
        <View style={styles.btncontainer}><GoBackButton1 /></View>
        <PageTitle iconName={'edit'} titleText="供品編輯"></PageTitle>

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.offeringImage} />
            <Pressable style={styles.overlay} onPress={pickImage}>
              <MaterialIcons name="edit" size={24} color="white" />
            </Pressable>
          </View>

          <Text style={styles.label}>供品名稱</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="輸入供品名稱"
          />

          <Text style={styles.label}>金額</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="輸入金額"
            keyboardType="numeric"
          />

          <Text style={styles.label}>庫存數量</Text>
          <TextInput
            style={styles.input}
            value={stock}
            onChangeText={setStock}
            placeholder="輸入庫存數量"
            keyboardType="numeric"
          />

          <Text style={styles.label}>備註</Text>
          <TextInput
            style={styles.input}
            value={remark}
            onChangeText={setRemark}
            placeholder="輸入備註 (選填)"
            multiline
          />
        </ScrollView>

        <CheckoutBar btnText={'確認送出'} iconName={'arrow-forward-circle-outline'} onPress={handleSave} />
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
  container: {
    width: width * 0.95,
    flexGrow: 1,
    padding: 20,
    paddingBottom: 180,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4F4F4F',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  imageContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    marginBottom: 35,
    alignSelf: 'center',
  },
  offeringImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default EditOfferingInfoPage;
