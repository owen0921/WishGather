import React, {useState, useEffect, useRef, useContext } from 'react';
import {Button, Text, SafeAreaView, View, StyleSheet, FlatList, Dimensions} from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

import SectionHeader from '../../components/Utility/SectionHeader';
import EventCard from '../../components/Temple/EventCard';
import MatchingCard from '../../components/Temple/MatchingCard';
import MatchingInfoCard from '../../components/Temple/MatchingInfoCard';
import TempleEventPage from './TempleEventPage';
import Loading from '../../components/Utility/Loading';
import { UserContext } from '../../components/Context/UserContext';

const API = require('../config/DBconfig')

const { width, height } = Dimensions.get('window');

// TempleHomePage Screen 

function TempleHomePage() {
    const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	const { userId } = useContext(UserContext);
	const [templeData, setTempleData] = useState([]);
	const [eventData, setEventData] = useState([]);
	const [matchData, setMatchData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	var response;
	const fetchData = async () => {
		try { 
			response = await axios.get(`${API}/temples_info/${userId}`);
			setTempleData(response.data[0]);
			response = await axios.get(`${API}/ceremony/${userId}`);
			setEventData(response.data);
			response = await axios.get(`${API}/match/${userId}`);
			setMatchData(response.data);

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
			<View style={{width: width*0.95, flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'center', marginBottom: 35}}>
				<MaterialIcons name="temple-buddhist" size={30} color="orange" style={{marginRight: 8}} />
				<Text style={{fontSize: 24, fontWeight: 'bold', color: '#4F4F4F'}}>{'歡迎回來 ! '}{templeData.NAME}</Text>
			</View>

			<View style={styles.sectionContainer}>
				<SectionHeader title={'法會資訊'} onPress={() => navigation.navigate('TempleEventPage')}/>
				 <FlatList
					data={eventData} // The array of event objects
					renderItem={({ item }) => (
					<EventCard
						event={item} // Pass each event object to EventCard component
						size="square"
					/>
					)}
					keyExtractor={(item) => item.eID.toString()} // Ensure eID is a string for key
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.scrollView}
				/>
			</View>
			<View style={styles.sectionContainer}>
				<SectionHeader title="媒合訊息" onPress={() => navigation.navigate('MatchingPage')}/>
				<FlatList
						data={matchData}
						renderItem={({ item }) => <MatchingCard infos={item} />}
						keyExtractor={(item) => item.wID} // Ensure WELFARE_ID is unique and not undefined
				/>
			</View>
        </View>
      </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		gap: 30,
	},
	scrollView: {
		paddingLeft: 16,
	},
})

export default TempleHomePage;