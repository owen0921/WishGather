import React, { useState, useCallback, useEffect ,useContext} from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View, Text, Modal, SafeAreaView, TouchableOpacity, Alert, Dimensions } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';


import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 

import { UserContext } from '../../components/Context/UserContext';//for id
const Tab = createBottomTabNavigator();


import axios from 'axios';

//把API抓進來-都固定用專案教室IP
const API=require('../config/DBconfig')

const WelfareUserPage = () => {
  const [textVisible, setTextVisible] = useState(false);
  const navigation = useNavigation();
  const { userId, userRole} = useContext(UserContext);

  const [profileImage, setProfileImage] = useState(null);//大頭貼


  //token
  const [token, setToken] = useState(null);

  //toekn完會出現在profile這個變數
  const [profile, setProfile] = useState(null);

  //有沒有載入，我其實不清楚，都複製過去
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();

  const openText = useCallback(() => {
    setTextVisible(true);
  }, []);

  const closeText = useCallback(() => {
    setTextVisible(false);
  }, []);


  //這裡把token從儲存叫出來看是誰登入中，會搭配下一個函式一起
  useEffect(() => {
    const getTokenAndFetchProfile = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          await fetchProfile(storedToken);
        }
      } catch (error) {
        console.error('Error reading token or fetching profile:', error);
        Alert.alert('Error', 'Failed to load profile');
      }
    };

    getTokenAndFetchProfile();
  }, []);

  //把剛剛叫出來的toekn，拿去對應是誰，用已經寫號的後台get profile，user資料會在profile這個值
  const fetchProfile = async (userToken) => {
    if (!userToken) {
      Alert.alert('Error', 'No token available');
      return;
    }
    setIsLoading(true);
    console.log('token:', userToken);

    try {
      const response = await axios.get(`${API}/profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      console.log('Response headers:', response.headers);
      console.log('Profile data:', response.data);

      setProfile(response.data);
    } catch (error) {
      console.error('Fetch profile error', error);
      Alert.alert('Error', 'Failed to fetch profile. Please try again.');
    }
    setIsLoading(false);
  };

  //IMG-part-start
  useEffect(() => {
    fetchProfilePicture();
  }, []);



  const fetchProfilePicture = async () => {
    try {
      const response = await axios.get(`${API}/user/${userId}/profilePicture`);
      if (response.data && response.data.imageUrl) {
        setProfileImage(`${API}${response.data.imageUrl}`);
        // await clearImageCache();
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      Alert.alert('Error', 'Failed to fetch profile picture.');
    }
  };
 //IMG-part-send

  const handleSignOut = async () => {
    setToken(null);
    setProfile(null);
    await AsyncStorage.removeItem('userToken');
    Alert.alert('登出成功!', '歡迎再次使用');
    navigation.navigate('Main');
  };

  return (
    <>
      <SafeAreaProvider>
        <View style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom -40,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }}>
          
          <View style={{
            width: width * 0.95,
            alignItems: 'center',
            paddingVertical: 20,}}>
              
            {/* User Image */}
            <Image
              style={styles.userPageChild}
              contentFit="cover"
              source={profileImage ? { uri: profileImage } : `${API}/uploads/profilePictures/default.jpg`}
            />

            {/* User Name */}
            <Text style={styles.userInfo}>
              
                <Text style={styles.userName}>
                  {profile ? profile.name || profile.email || 'User' : 'Loading...'}
                </Text>
                <Text style={styles.userStatus}> 普通會員</Text>
              
            </Text> 
          </View>
            
          
          <View style={styles.actionsContainer}>
            <Pressable
              style={[styles.pressable, styles.pressablePosition]}
              onPress={() => navigation.navigate("ProfileManagement")}
            >
              <MaterialCommunityIcons name="account-edit" size={24} color="#4f4f4f" />
              <Text style={styles.buttonText}>個資維護</Text>
            </Pressable>

            <Pressable
              style={[styles.pressable, styles.pressablePosition]}
              onPress={() => navigation.navigate("OfferingPreference")}
            >
              <Ionicons name="gift" size={24} color="#4f4f4f" />
              <Text style={styles.buttonText}>喜好設定</Text>
            </Pressable>

            <Pressable
              style={[styles.pressable, styles.pressablePosition]}
              onPress={() => navigation.navigate("OfferingEditPage")}
            >
              <MaterialIcons name="edit" size={24} color="#4f4f4f" />
              <Text style={styles.buttonText}>供品編輯</Text>
            </Pressable>
            
            <Pressable
              style={[styles.pressable, styles.pressablePosition]}
              onPress={handleSignOut}
            >
              <MaterialCommunityIcons name="logout" size={24} color="#4f4f4f" />
              <Text style={styles.buttonText}>登出帳戶</Text>          
            </Pressable>
          </View>

        </View>
        

        {/* <Modal animationType="fade" transparent visible={textVisible}>
          <View style={styles.textOverlay}>
            <Pressable style={styles.textBg} onPress={closeText} />
            <LogoutOverlay onClose={closeText} />
          </View>
        </Modal> */}

      </SafeAreaProvider>
      
    </>
  );
};

// const UserPage = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="首頁"
//       screenOptions={{
//         tabBarLabelPosition: "below-icon",
//         tabBarShowLabel: true,
//         tabBarActiveTintColor: "#D97F30",
//         headerShown: false,
//       }}
//     >
//       <Tab.Screen
//         name="宮廟資訊"
//         component={HomePage}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="home-outline" size={30} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="訂購"
//         component={OfferingPage4}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <MaterialIcons name="temple-buddhist" size={30} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="購物車"
//         component={CartPage}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="cart-outline" size={30} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="首頁"
//         component={UserPageContent}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="person-outline" size={30} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

const styles = StyleSheet.create({
  userPageChild: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  userInfo: {
    marginTop: 25,
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  userStatus: {
    fontSize: 18,
    color: '#888',
  },
  actionsContainer: {
    width: width * 0.9,
    paddingVertical: 15,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Elevation for Android
    elevation: 5,
  },
  pressablePosition: {
    justifyContent:"center",
  },
  buttonText: {
    color: '#4f4f4f',
    fontSize: 18,
    fontWeight:'500',
    marginLeft: 8,
  },
  textOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  buttonContainer: {
    width: width,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: -40,
    zIndex: 9999,
  },
});

export default WelfareUserPage;