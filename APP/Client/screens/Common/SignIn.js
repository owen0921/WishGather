import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, SafeAreaView, Alert ,Pressable} from 'react-native';

//儲存空間用來放token(類似php session那種感覺)
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//連線axios

import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import TempleTab from '../../components/NavTab/TempleTab';
import NavigateBack from '../../components/Utility/NavigateBack';
import TextInputBox from '../../components/Utility/TextInputBox';
import { useAlertDialog } from '../../components/CustomHook/useAlertDialog';
import { useValidation } from '../../components/CustomHook/useValidateInput';
import { UserContext } from '../../components/Context/UserContext';
// 把API抓進來-都固定用專案教室IP
const API = require('../config/DBconfig');

function SignIn() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [role, setRole] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const { setUserId,setUserRole ,setUserToken} = useContext(UserContext);
  const { showAlertDialog, renderAlertDialog } = useAlertDialog();
  const {
    validateUserEmail,
    validateUserPassword,
    userEmailError,
    userPasswordError,
  } = useValidation();

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(value => {
      if (value) setToken(value);
    }).catch(error => {
      console.error('Error reading userToken from AsyncStorage', error);
    });
  }, []);

  useEffect(() => {
    if (token) {
      // 根據token獲取用戶角色
      axios.get(`${API}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const { userId, role } = response.data;
        setRole(role);
        setUserId(userId); // 設定global userId (會員table)
        setUserRole(role); // 設定global userRole (會員table)
        setUserToken(token);// 設定global token
        // 根據角色導航
        if (role === '信眾') {
          navigation.replace('BelieverTab');
        } else if (role === '社福') {
          navigation.replace('WelfareTab');
        } else if (role === '宮廟') {
          navigation.replace('TempleTab');
        } else {
          console.error('Unknown role:', role);
        }
      })
      .catch(error => { 
        console.log(error);
      });
    }
  }, [token, navigation]);
  
// Function to refresh token
  const refreshTokens = async () => {
    const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
    try {
    const response = await axios.post(`${API}/refreshtoken`, { refreshToken: storedRefreshToken });
    const { token } = response.data;

    // Save new access token
    await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  // Handle 403 errors to trigger token refresh
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 403) {
        await refreshTokens();
      }
      return Promise.reject(error);
    }
  );


  const handleSignIn = async () => {
    const isEmailValid = validateUserEmail(email.trim());
    const isPasswordValid = validateUserPassword(password);
    const signInApi = `${API}/signin`;
    
    if(isEmailValid && isPasswordValid){
      setIsLoading(true);
      const userData = {
        EMAIL: email,
        PASSWORD: password,
      };
      // 登入Server 
      try {
        const response = await axios.post(`${API}/signin`, userData, { // Ensure correct variable names
          headers: {'Content-Type': 'application/json'},
        });
        const { token, refreshToken } = response.data;
        if (token && refreshToken) {
          setToken(token);
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('refreshToken', refreshToken);
          setIsLoading(false);
        } else {
          console.log("no token here...");
          showAlertDialog('登入失敗', '請重新試');
        }
      } catch (error) {
        console.error('Sign-in failed:', error);
        showAlertDialog('登入失敗', '請重新嘗試');
      } 
    }
  };


  // 登出設定
  const handleSignOut = async () => {
    setToken(null);
    setRole(null);
    await AsyncStorage.removeItem('userToken');
  };

  if (token && role) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>登入成功！正在跳轉...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['#EA7500', '#FFFAF4']}
        style={styles.container}
      >
        <View style={styles.btncontainer}>
          <NavigateBack />
        </View>
        
        <Text style={{ color: "#4F4F4F", fontSize: 35, marginBottom: 10, fontWeight: '500'}}>登入</Text>
        <Text style={{ color: "#4F4F4F", fontSize: 25, fontFamily:"Roboto", marginBottom: 50}}>Login</Text>

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

      {/* <View style={styles.rememberme}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#FFA500' : undefined}
          />
          <Text style={styles.paragraph}>記住我</Text>
      </View> */}

      <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>登入</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.buttonText}>前往註冊</Text>
      </Pressable>
      
      {renderAlertDialog()}
      </LinearGradient>
    </SafeAreaProvider>
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
  input: {
    width: '90%',
    height: 50,
    backgroundColor: "#FFFAF4",
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  rememberme: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 18,
  },
  checkbox: {
    margin: 8,
  },
  button: {
    width: '35%',
    height: 50,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FCFCFC',
    fontSize: 18, 
    fontWeight:'500'
  },
  debugContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default SignIn;