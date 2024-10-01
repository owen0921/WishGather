import React, {useState, useEffect, useRef, useContext } from 'react';
import {Button, Text, SafeAreaView, View, StyleSheet, TouchableOpacity} from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import PageTitle from '../../components/Utility/PageTitle';

import Loading from '../../components/Utility/Loading';
import { UserContext } from '../../components/Context/UserContext';

const API = require('../config/DBconfig')

// TempleHomePage Screen 

function OfferingHome() {
    const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	const { userId } = useContext(UserContext);
	const [templeData, setTempleData] = useState([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	var response;
	const fetchData = async () => {
		try { 
			response = await axios.get(`${API}/temples_info/${userId}`);
			setTempleData(response.data[0]);


			setLoading(false);
		} catch (err) {
			setLoading(false); 
			setError(err); 
		} 
	};

    useEffect(() => {
		// Get pId from db 
        fetchData();
    }, []); // Add templeID as a dependency
  
	if (loading) return <Loading />;
	if (error) return <Text>Error: {error.message}</Text>;

    return (
      <SafeAreaProvider>
        <View style={[styles.container,
          // Paddings to handle safe area
          {paddingTop: insets.top + 30,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 30,
          paddingRight: insets.right + 30} 
        ]}>  

			<View style={styles.btncontainer}><GoBackButton1 /></View>
			<PageTitle iconName="outbox" titleText="功能選擇" />
			
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('OfferingUpload')}
			>
				<AntDesign name="caretright" size={24} color="white" />
				<Text style={styles.buttonText}>供品上架</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('OfferingUpload')}
			>
				<AntDesign name="caretright" size={24} color="white" />
				<Text style={styles.buttonText}>供品編輯</Text>
			</TouchableOpacity>
			
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('FoodScanningPage')}
			>
				<AntDesign name="caretright" size={24} color="white" />
				<Text style={styles.buttonText}>供品辨識</Text>
			</TouchableOpacity>
        </View>
      </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
	btncontainer:{
		position: 'absolute',
		top: 60,
		left: 10,
	  },
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 30,  
		backgroundColor: '#f2f2f2',
	},
	button: {
		width: '90%',
		height: 180,
		paddingVertical: 15,
		backgroundColor: '#FFA500',  // 橘色背景
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection:'row',

		// Shadow for iOS
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	
		// Elevation for Android
		elevation: 5,
	},
	buttonText: {
		color: 'white',
		fontSize: 25,
		fontWeight: 'bold',
		marginLeft: 10,
	},
})

export default OfferingHome;