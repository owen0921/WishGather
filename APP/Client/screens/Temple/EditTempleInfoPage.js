import { React, useState, useEffect, useContext } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable, ScrollView } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../components/Context/UserContext';
import  Dialog  from "react-native-dialog";
import { formatDate, convertSolarDateToLunarDate } from '../../components/Utility/DateUtils';
import axios from 'axios';

import TextInputSet from '../../components/Utility/TextInputSet';
import GoBackButton1 from '../../components/Utility/GoBackButton1';
import PageTitle from '../../components/Utility/PageTitle';
import DatePicker from '../../components/Utility/DatePicker';
import CheckoutBar from '../../components/Utility/CheckoutBar';

const base = require('../config/DBconfig');
const insertEventApi = `${base}/temple_event`;

function EditTempleInfoPage(){
    const navigation = useNavigation();
    const route = useRoute();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [alertDialogVisible, setAlertDialogVisible] = useState(false);
    // 編輯頁傳入的資料
    const event = route.params.event;
    const forEdit = route.params.forEdit;
    const { userId } = useContext(UserContext);
   
    const insets = useSafeAreaInsets();
    const [selectedDate, setSelectedDate] = useState(event.DATE ? new Date(event.DATE) : new Date());
    const [eventDesc, setEventDesc] = useState(event.DESCRIPTION || '');
    const [eventName, setEventName] = useState(event.NAME || '');

    const insertTempleEvent = () => {
       // Ensure all necessary data is defined
        if (!userId || !eventName || !eventDesc || !selectedDate) {
            console.error('請確保所有必要的事件資訊都已填寫');
            return;
        }
        const eventData = {
            tID: userId,
            eID: event.eID,
            NAME: eventName,
            DESCRIPTION: eventDesc,
            DATE: new Date(selectedDate).toISOString().split('T')[0],
        };
        console.log(eventData);

        axios.post(insertEventApi, eventData)
            .then((response) => {
                if (response.status === 200) {
                    setAlertDialogVisible(true);
                }
            })
            .catch((error) => {
                console.error('儲存失敗:', error);
            });
    }
    const handleConfirmKeepAdding = () => {
        setEventDesc('');
        setEventName('');
        setSelectedDate(new Date());
        setTimeout(() => {
            setDialogVisible(false); // Show the second dialog after a delay
        }, 10); 
        console.log(selectedDate, eventDesc, eventName);
    }
    const handleAddSucceedAlert = () => {
        setAlertDialogVisible(false); 
        setTimeout(() => {
            setDialogVisible(true); 
        }, 600); 
    };
    
    const renderConfirmDialog = () => {
        return (
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>是否繼續新增法會？</Dialog.Title>
                <Dialog.Description>
                </Dialog.Description>
                <Dialog.Button label="取消新增" onPress={() => {
                    setEventDesc('');
                    setEventName('');
                    setSelectedDate(new Date());
                    setDialogVisible(false);
                    navigation.navigate('TempleEventPage', { refresh: true })}}/>
                <Dialog.Button label="繼續新增" onPress={handleConfirmKeepAdding}/>
            </Dialog.Container>
        )
    }
    const renderAlertDialog = () => {
        return (
            <Dialog.Container visible={alertDialogVisible}>
                <Dialog.Title>儲存成功!</Dialog.Title>
                <Dialog.Description>
                </Dialog.Description>
                <Dialog.Button label="確定" onPress={handleAddSucceedAlert}/>
            </Dialog.Container>
        )
    }
    return (
        <SafeAreaProvider>
            <View
                style={{
                    flex: 1,
                    backgroundColor:'#f2f2f2',
                    justifyContent: 'start',
                    alignItems: 'start',
                    paddingTop: insets.top+20,
                    paddingBottom: insets.bottom-40,
                    paddingLeft: insets.left ,
                    paddingRight: insets.right
                }}
            >
                <View style={styles.buttonContainer}>
                    <Pressable onPress={() => navigation.navigate('TempleEventPage', { refresh: true })}>
                        <Text style={styles.textDanger}>取消</Text>
                    </Pressable>
                    <Pressable onPress={insertTempleEvent}>
                        <Text style={styles.textSucceed}>完成</Text>
                    </Pressable>
                </View>
                
                <PageTitle  iconName ={forEdit ? "edit" : "add"} titleText={forEdit ? "編輯法會資訊" : "新增法會資訊"}></PageTitle>
                <ScrollView style={{alignSelf:'center'}}>
                <View style={styles.formContainer}>
                    <TextInputSet 
                        labelName={'法會名稱'} 
                        defaultValue={eventName} 
                        multiLine={false} 
                        placeholder={"請輸入法會名稱"}
                        onChange={(newName) => setEventName(newName)}/>
                    <DatePicker 
                        dateValue={selectedDate} 
                        isLunar={false} 
                        editable={true}
                        onChange={(newSolarDate) => setSelectedDate(newSolarDate)}
                    />
                    <TextInputSet 
                        labelName={'法會簡介'} 
                        defaultValue={eventDesc} 
                        multiLine={true} 
                        placeholder={"請輸入法會簡介"}
                        onChange={(newDescription) => setEventDesc(newDescription)}
                    />
                </View>
                </ScrollView>
                {renderConfirmDialog()}      
                {renderAlertDialog()}
                
            </View>
        </SafeAreaProvider>
    )
}   

const styles = StyleSheet.create({
    formContainer: {
        flex: 2,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignSelf:'center',
        gap: 15,
        marginTop: 20,
    },
    buttonPosition: {
        marginTop: 30,

    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    textDanger: {
        color: "red",
        fontWeight: "bold"
    },
    textSucceed: {
        color: "orange",
        fontWeight: "bold"
    }
   
})  

export default EditTempleInfoPage;