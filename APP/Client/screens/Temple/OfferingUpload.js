import React, { useState ,useContext, useEffect } from 'react';
import { View, TextInput, Text, Image, StyleSheet, Pressable, Dimensions, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../components/Context/UserContext';
import { MaterialIcons } from '@expo/vector-icons'; // Importing the icon

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import PageTitle from '../../components/Utility/PageTitle';
import CheckoutBar from '../../components/Utility/CheckoutBar';

const API=require('../config/DBconfig')
import axios from 'axios';

const { width } = Dimensions.get('window');

const OfferingUpload = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { userId } = useContext(UserContext);

  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [remark, setRemark] = useState('');
  const [amount, setAmount] = useState('');

  // Image picker function
  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('相機需要存取權限!請更改設定');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || isNaN(price)) {
      Alert.alert('請輸入有效的供品名稱及金額');
      return;
    }
  
    const newOffering = {
      imageUri,
      name,
      price: parseFloat(price),
      remark,
      amount,
    };
  
    try {
      // 使用 await 來處理 axios 請求
      const response = await axios.post(`${API}/uploadOffering/${userId}`, newOffering);
      Alert.alert('供品已上傳！', response.data.message);
      navigation.goBack();
    } catch (error) {
      console.error('Error uploading offering:', error);
      Alert.alert('供品上傳失敗', '請稍後再試');
    }
  };
  

  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: '#f2f2f2',
          justifyContent: 'start',
          alignItems: 'center',
          paddingTop: insets.top + 30,
          paddingBottom: insets.bottom - 40,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <View style={styles.btncontainer}><GoBackButton1 /></View>
        <PageTitle iconName="cloud-upload" titleText="供品上傳" />

        <ScrollView contentContainerStyle={styles.container}>
          <Pressable style={styles.imagePicker} onPress={selectImage}>
            {imageUri ? (
              <View>
                <Image source={{ uri: imageUri }} style={styles.image} />
                {/* Gray overlay with icon */}
                <View style={styles.overlay}>
                  <MaterialIcons name="edit" size={24} color="white" />
                </View>
              </View>
            ) : (
              <Text style={styles.imagePickerText}>點擊上傳圖片</Text>
            )}
          </Pressable>

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

          <Text style={styles.label}>備註</Text>
          <TextInput
            style={styles.input}
            value={remark}
            onChangeText={setRemark}
            placeholder="輸入備註 (選填)"
            multiline
          />

          {/* <Text style={styles.label}>存貨數量</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="輸入備註 (選填)"
            multiline
          /> */}
        </ScrollView>

        <CheckoutBar btnText={'確認送出'} iconName={'arrow-forward-circle-outline'} onPress={handleSubmit} />
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
  imagePicker: {
    backgroundColor: '#fff',
    width: 200,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imagePickerText: {
    fontSize: 18,
    color: '#888',
  },
  image: {
    width: 200,
    height: 200,
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

export default OfferingUpload;
