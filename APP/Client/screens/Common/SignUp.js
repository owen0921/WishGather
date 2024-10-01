import React, { useState } from 'react';

import { View, TextInput, Pressable, StyleSheet, Alert, Text, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import NavigateBack from '../../components/Utility/NavigateBack';
import TextInputBox from '../../components/Utility/TextInputBox';
import PageTitle from '../../components/Utility/PageTitle';
import DropDown from '../../components/Utility/DropDown';
import { useValidation } from '../../components/CustomHook/useValidateInput';
import { useAlertDialog } from '../../components/CustomHook/useAlertDialog';
const base = require('../config/DBconfig');
const SIGNUP_API = `${base}/signup`

const { width }=Dimensions.get('window')

const SignUp = () => {
  // 會員基本資訊
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [preferences, setPreferences] = useState([]);

  // HOOKS
  const navigation = useNavigation();
  const { showAlertDialog, renderAlertDialog } = useAlertDialog();
  const {
    validateUserName,
    validatePhoneNumber,
    validateUserEmail,
    validateUserPassword,
    validateUserRole,
    validataAddressError,
    validateAddress,
    userNameError,
    phoneNumberError,
    userEmailError,
    userPasswordError,
    userRoleError,
    addressError
  } = useValidation();

  // 抓取使用者地址function
  const getGeoCoordinates = async (address) => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/search/geocode/v6/forward?q=${address}&proximity=ip&access_token=${process.env.EXPO_PUBLIC_API_TOKEN}`);
      const result = response.data;
      const [longitude, latitude] = result["features"][0]["geometry"]["coordinates"];
      return { latitude, longitude }; 
    }
    catch(err){
      console.log('API error:'+err);
      return { latitude: null, longitude: null }; 
    }
    
  }

  const handleRegister = async () => {
    const isUserNameValid = validateUserName(name),
          isPhoneNumberValid = validatePhoneNumber(phone),
          isEmailValid = validateUserEmail(email.trim()),
          isPasswordValid = validateUserPassword(password),
          isRoleValid = validateUserRole(role),
          isAddressValid = validateAddress(address);
      
    let coordinates = { latitude: null, longitude: null };
    if (isAddressValid && address) {
      coordinates = await getGeoCoordinates(address);
    }
    
    const userInputData = {
      NAME: name,
      PHONE_NUM: phone,
      EMAIL: email.trim(),
      PASSWORD: password,
      ROLE: role,
      ADDRESS: address ?? '',
      LONGTITUDE: coordinates.longitude,
      LATITUDE: coordinates.latitude,
      PREFERENCES: preferences.filter(pref => pref !== null).join(',')
    }
    console.log(userInputData);
    // 
    if(!isRoleValid){
      showAlertDialog('輸入錯誤', '請選擇身份別');
    }
    if(isUserNameValid && isPhoneNumberValid && isEmailValid && isPasswordValid && isRoleValid && isAddressValid){
      // 註冊API 
      axios.post(SIGNUP_API, userInputData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
          showAlertDialog('註冊成功', '歡迎登入');
          // 廟方或社福機構導向註冊頁
          navigation.navigate('SignIn');
      })
      .catch((error) => {
        if(error.response){
          showAlertDialog('註冊失敗', '請重新註冊');
        }
      })
    }

  }
  return (
    <LinearGradient
      colors={['#EA7500','#FFFAF4']}
      style={styles.container}
    >
      <View style={styles.btncontainer}>
          <NavigateBack />
        </View>
      <View style={styles.pageTitleContainer}>
        <Text style={{color:"#4F4F4F", fontSize: 35, marginBottom: 15, fontWeight: '500'}}>註冊</Text>
        <Text style={{color:"#4F4F4F", fontSize: 25, marginBottom: 50}}>Registration</Text>
      </View>
      {!role && 
        <View>
          <View style={styles.formContainer}>
            <TextInputBox
              inputType='text'
              placeholder="輸入名稱"
              textValue={name}
              onChangeText={(text) => {
                setName(text);
                validateUserName(text);
              }}
              validState={!userNameError}
              invalidInput={userNameError || ''}
            />
            <TextInputBox
              inputType='text'
              placeholder="輸入電話號碼"
              textValue={phone}
              onChangeText={(text) => {
                setPhone(text);
                validatePhoneNumber(text);
              }}
              validState={!phoneNumberError}
              invalidInput={phoneNumberError || ''}
            />
            <TextInputBox
              inputType='email'
              placeholder="輸入電子郵件"
              textValue={email}
              onChangeText={(text) => {
                setEmail(text);
                validateUserEmail(text);
              }}
              validState={!userEmailError}
              invalidInput={userEmailError || ''}
            />
            <TextInputBox
              inputType='password'
              placeholder="設定密碼"
              textValue={password}
              onChangeText={(text) => {
                setPassword(text);
                validateUserPassword(text);
              }}
              validState={!userPasswordError}
              invalidInput={userPasswordError || ''}
            />
          </View>

          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'A' && styles.roleButtonSelected,
              ]}
              onPress={() => setRole('A')}
            >
              <Text style={styles.roleButtonText}>信眾</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'B' && styles.roleButtonSelected,
              ]}
              onPress={() => setRole('B')}
            >
              <Text style={styles.roleButtonText}>宮廟</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'C' && styles.roleButtonSelected,
              ]}
              onPress={() => setRole('C')}
            >
              <Text style={styles.roleButtonText}>社福</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    
    {/* 若角色為宮廟或社福機構，儲存上方資料後隱藏上方部分，然後顯示下半部讓使用者輸入 */}

    { role == 'A' && 
      <View style={styles.formContainer}>
        <PageTitle titleText={'歡迎加入'}/>
        <PageTitle titleText={name}/>
        <TextInputBox
          inputType='text'
          placeholder="輸入住家區域"
          textValue={address}
          onChangeText={(text) => {
            setAddress(text);
            validateAddress(text);
          }}
          validState={!addressError}
          invalidInput={addressError || ''}
        />
        {/* TODO: 營業時間 */}
      </View> 
    }

    { role == 'B' && 
      <View style={styles.formContainer}>
        <PageTitle titleText={'歡迎加入'}/>
        <PageTitle titleText={name}/>
        <TextInputBox
          inputType='text'
          placeholder="輸入宮廟地址"
          textValue={address}
          onChangeText={(text) => {
            setAddress(text);
            validateAddress(text);
          }}
          validState={!addressError}
          invalidInput={addressError || ''}
        />
        {/* TODO: 營業時間 */}
      </View> 
    }

    { role == 'C' && 
      <View style={styles.formContainer}>
        <PageTitle titleText={`歡迎加入 ! ${name}`} />

        <TextInputBox
          inputType='text'
          placeholder="輸入社福機構地址"
          textValue={address}
          onChangeText={(text) => {
            setAddress(text);
            validateAddress(text);
          }}
          validState={!addressError}
          invalidInput={addressError || ''}
        />

        <View style={{width:width*0.75}}>
          <DropDown 
            open={dropDownOpen} 
            setOpen={setDropDownOpen}
            value={preferences}
            setValue={setPreferences}
          />
        </View>
        {/* TODO: 營業時間 */}
      </View>
    }
    <Pressable style={styles.button} onPress={handleRegister}>
      <Text style={styles.buttonText}>確認送出</Text>
    </Pressable>
    {/* 警告訊息 */}
    {renderAlertDialog()}
    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  btncontainer:{
    position: 'absolute',
    top: 60,
  },
  pageTitleContainer:{
    justifyContent: 'center',
    alignItems: 'center',

  },
  formContainer: {
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    gap: 10,
    marginBottom: 25

  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 15,
  },
  roleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFA500',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  roleButtonSelected: {
    backgroundColor: '#FF8500',
  },
  roleButtonText: {
    color: '#FCFCFC',
    fontSize: 16,
  },
  button: {
    width: '35%',
    height: 50,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 20,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {

    color : '#FCFCFC',

    fontSize: 18, 
    fontWeight:'500'
  },
  debugContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',

    color: '#FCFCFC',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SignUp;