import React, { useState, useEffect, useContext } from 'react';
import {Text, View, StyleSheet, FlatList, Pressable, Dimensions} from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

import GoBackButton1 from "../../components/Utility/GoBackButton1";
import EventCard from '../../components/Temple/EventCard';
import PageTitle  from '../../components/Utility/PageTitle';
import Loading from '../../components/Utility/Loading';
import { UserContext } from '../../components/Context/UserContext';
import { useAlertDialog } from '../../components/CustomHook/useAlertDialog';


const API = require('../config/DBconfig')
function TempleEventPage({route}){
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);
    const [date, setDate] = useState(new Date());
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { showAlertDialog, renderAlertDialog } = useAlertDialog();
    
    useEffect(() => {
        // Replace with your API endpoint
        axios.get(`${API}/ceremony/${userId}`)
            .then(response => {
                setEventData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Fetch or reload your data here
            if (route.params?.refresh) {
                // Call your fetch function
                axios.get(`${API}/ceremony/${userId}`)
                .then(response => {
                    setEventData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
            }
        });
    
        return unsubscribe;
    }, [navigation, route.params]);

    if (loading) return <Loading />;
    if (error) return <Text>Error: {error.message}</Text>;
    return(
        <SafeAreaProvider>
            <View style={{
                flex: 1,
                backgroundColor: '#f2f2f2',
                justifyContent: 'start',
                alignItems: 'start',
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom + 150,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }}>
                <GoBackButton1 />

                <PageTitle titleText="法會資訊" iconName="event" /> 

                <View style={styles.flatListContainer}>
                    <FlatList
                        data={eventData}
                        renderItem={({ item }) => <EventCard event={ item } size="rectangle" />}
                        keyExtractor={(item) => item.eID}
                        vetical
                        contentContainerStyle={styles.scrollView}
                        style={styles.flatList}
                    />
                </View>

                <Pressable style={styles.addBtn} 
                           onPress={() => 
                                    navigation.navigate('EditTempleInfoPage', 
                                    { 
                                        event: { date: date.toISOString() },
                                        forEdit: false
                                    })}>
                                    {/* should get newest id from db? after or before add succeed*/}
                    <Ionicons name="add-outline" color={"white"} size={30}/>
                </Pressable>
                
            </View>
        </SafeAreaProvider>
    )
} 

let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    flatListContainer: {
        width: screenWidth,
        height: screenHeight * 0.7,
    },
    flatList:{
        flex: 1
    },
    addBtn:{
        backgroundColor: "orange",
        color: "white",
        borderRadius: 50,
        padding: 20,
        // Check device 
        position: "absolute",
        bottom: 30,
        right: 20,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,  
        elevation: 5
    }
})

export default TempleEventPage;