import { React, useEffect, useState, useContext } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import PageTitle from '../../components/Utility/PageTitle';
import MatchingCard from '../../components/Temple/MatchingCard';
import SetButton from '../../components/Utility/SetButton';
import MatchingInfoCard from '../../components/Temple/MatchingInfoCard'
import { FlatList } from 'react-native-gesture-handler';
import { UserContext } from '../../components/Context/UserContext';

const API = require('../config/DBconfig');
function MatchingStatus() {
    const insets = useSafeAreaInsets();
    const { userId } = useContext(UserContext);
    const [matchData, setMatchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // Replace with your API endpoint
        axios.get(`${API}/match/${userId}`)
            .then(response => {
                setMatchData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);
    if(loading) return (<View><Text>Loading...</Text></View>);
    if(error) return (<View><Text>Error: {error}</Text></View>);
    return (
        <SafeAreaProvider>
            <View style={[styles.container, {
                paddingTop: insets.top - 30,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }]}>
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={matchData}
                        renderItem={({ item }) => <MatchingInfoCard infos={item}/>}
                        keyExtractor={(item) => item.id}
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
    },
});

export default MatchingStatus;