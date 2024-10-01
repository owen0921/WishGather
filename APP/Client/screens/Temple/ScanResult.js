import React, { useState, useCallback, useEffect,useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import CheckoutBar from '../../components/Utility/CheckoutBar';

import { UserContext } from '../../components/Context/UserContext';//for id
import {translateToChinese } from '../../components/Utility/translations';

const { width } = Dimensions.get('window');

const API = require('../config/DBconfig');

const ScanResult = ({ route }) => {

    const { userId } = useContext(UserContext);
    const { objectCounts } = route.params;
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemCount, setNewItemCount] = useState('');

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

    useEffect(() => {
        // Convert initialObjectCounts to array of objects
        const initialItems = Object.entries(objectCounts).map(([name, count]) => ({
            name: translateToChinese(name),// from tag to real name in tw-ZH
            count
          }));
        setItems(initialItems);
    }, [objectCounts]);

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

    const handleCountChange = (index, newCount) => {
        const updatedItems = [...items];
        updatedItems[index].count = Math.max(0, parseInt(newCount) || 0);
        setItems(updatedItems);
    };

    const handleAddItem = () => {
        if (newItemName && newItemCount) {
            setItems([...items, { name: newItemName, count: parseInt(newItemCount) || 0 }]);
            setNewItemName('');
            setNewItemCount('');
        }
    };

    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const handleSubmit = async () => {
        try {
            const submitData = {
                userId: userId,
                items: items.map(item => ({
                    name: item.name,
                    count: item.count
                }))
            };
    
            await axios.post(`${API}/submitScanResult`, submitData);
            Alert.alert('Success', '物品上傳成功!謝謝!');
            navigation.navigate('SubmissionResult', { items: submitData.items });
        } catch (error) {
            console.error('Error submitting data:', error);
            Alert.alert('Error', 'Failed to submit data. Please try again.');
        }
    };

    return (
        <SafeAreaProvider>
            <View style={[styles.container, {
                paddingTop: insets.top,
                paddingBottom: insets.bottom+20,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }]}>
                <View style={{width:'100%'}}>
                  <GoBackButton1 />
                </View>
                

                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>{profile ? profile.name || 'User' : 'Loading...'} 您的照片中共有:</Text>
                    {items.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <TextInput
                                style={styles.input}
                                value={item.count.toString()}
                                onChangeText={(newCount) => handleCountChange(index, newCount)}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(index)}>
                                <Text style={styles.buttonText}>刪除</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <View style={styles.itemContainer}>
                        <TextInput
                            style={[styles.input, { width: '50%', textAlign: 'center'}]}
                            value={newItemName}
                            onChangeText={setNewItemName}
                            placeholder="新品項名稱"
                        />
                        <TextInput
                            style={styles.input}
                            value={newItemCount}
                            onChangeText={setNewItemCount}
                            placeholder="數量"
                            keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                            <Text style={styles.buttonText}>新增</Text>
                        </TouchableOpacity>
                    </View>
                    

                    {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>送出</Text>
                    </TouchableOpacity>*/}

                    {/* <TouchableOpacity style={styles.rescanButton} onPress={() => navigation.navigate("FoodScanningPage")}>
                        <Text style={styles.buttonText}>重新掃描?</Text>
                    </TouchableOpacity> */}

                </ScrollView>

                <View style={styles.buttonContainer}>
                    <CheckoutBar btnText={"送出"} iconName={"checkbox-outline"} onPress={handleSubmit} />
                </View>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 90,
        // borderWidth:1,
    },
    title: {
        color:'#4F4F4F',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    itemName: {
        fontSize: 18,
        textAlign:'center',
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        width: 100,
        textAlign: 'center',
        marginRight: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    deleteButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    submitButton: {
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
    },
    rescanButton: {
        backgroundColor: 'orange',
        padding: 15,
        paddingTop:20,
        marginTop:20,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonContainer: {
        width: width,
        justifyContent: "center",
        alignItems: 'center',
        position: 'absolute',
        bottom: 25,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default ScanResult;