import { React, useState, useRef, useContext } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated} from 'react-native';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import  Dialog  from "react-native-dialog";
import Lunar from '@tony801015/chinese-lunar';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { useAlertDialog } from '../CustomHook/useAlertDialog';
import { convertSolarDateToLunarDate } from '../Utility/DateUtils';


function getCardSize(shape){
    if(shape == 'square'){
        return styles.squareSize
    }
    else if (shape == 'rectangle'){
        return styles.rectangleSize
    }
}

function renderRightActions (progress, dragAnimatedValue, showDialog, goEdit, event){
    const opacity = dragAnimatedValue.interpolate({
        inputRange: [-80, 0],
        outputRange: [screenWidth - 300, 0],
        // extrapolate: 'clamp',
    });
    return (
        <View style={styles.swipedRow}>
          <Animated.View style={[styles.behindButton, { opacity }, styles.editBackgroundColor]}>
            <TouchableOpacity onPress={goEdit}>
              <Text style={styles.behindButtonText}>編輯</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.behindButton, { opacity }, styles.deleteBackgroundColor]}>
            <TouchableOpacity onPress={showDialog}>
              <Text style={styles.behindButtonText}>刪除</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      );
}


function EventCard ({ event, size }){
    const navigation = useNavigation();
    const [dialogVisible, setDialogVisible] = useState(false);
    const swipeableRef = useRef(null);
    const { userId } = useContext(UserContext);
    const { showAlertDialog, renderAlertDialog } = useAlertDialog();
    const API = require('../../screens/config/DBconfig');
    const deleteEventApi = `${API}/delete_event`;

    const showDialog = () => {
      setDialogVisible(true);
    };
  
    const handleCancel = () => {
      setDialogVisible(false);
    };
  
    const handleDelete = () => {
      setDialogVisible(false);
      swipeableRef.current?.close();
      let eID = event.eID;
      axios.post(deleteEventApi, { eID })
           .then((response) => {
                showAlertDialog('通知', '刪除成功');
                navigation.navigate('TempleEventPage', { refresh: true });
           })
           .catch((err) => {
                console.log(err);
           })
    };

    const goEdit = () => {
        swipeableRef.current?.close();
        navigation.navigate('EditTempleInfoPage', 
                            { 
                                event: event, 
                                forEdit: true
                            });
    }

    if(size == "square"){
        return (
                <View style={[styles.card, getCardSize(size)]}>
                   <Image 
                        source={event.IMAGE ? { uri: event.IMAGE } : require('../../assets/adaptive-icon.png')}
                        style={styles.image} 
                    />
                    <Text style={styles.overlayText}>{convertSolarDateToLunarDate(event.DATE)}</Text>
                </View>
        );
    }
    if(size == "rectangle"){
        return (
            <View>
                <Swipeable 
                    renderRightActions={(progress, dragAnimatedValue) => renderRightActions(progress, dragAnimatedValue, showDialog, goEdit)}
                    ref={swipeableRef}>
                    <View style={[styles.card, getCardSize(size)]}>
                        <Image 
                            source={event.IMAGE ? { uri: event.IMAGE } : require('../../assets/adaptive-icon.png')}
                            style={styles.image} 
                        />
                        <Text style={styles.overlayText}>{event.NAME} {convertSolarDateToLunarDate(event.DATE)}</Text>
                    </View>
                </Swipeable>  
                <Dialog.Container visible={dialogVisible}>
                    <Dialog.Title>刪除</Dialog.Title>
                    <Dialog.Description>
                    確定刪除此法會？
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={handleCancel}/>
                    <Dialog.Button label="Delete" onPress={handleDelete}/>
                </Dialog.Container>
            </View>
        )
    }  
};


let marginSpace = 30;
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
    },
    card: {
        flex: 1,
        position: 'relative',
        borderWidth: '1px',
        borderColor: '#e6e6e6',
        backgroundColor: 'white',
    },
    squareSize: {
        width: 120,
        height: 120,
        marginRight: marginSpace,
        borderRadius: 10
    },
    rectangleSize: {
        width: '100%', // Device depends?
        height: 120,
        // marginBottom: marginSpace,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlayText: {
        position: 'absolute',
        bottom: 10,
        left: 15,
        color: '#4F4F4F',
        fontSize: 18,
        fontWeight: 'bold',
    },
    swipedRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    behindButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
        zIndex: -1,
      },
    behindButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    deleteBackgroundColor: {
        backgroundColor: '#ff524f',
    },
    editBackgroundColor: {
        backgroundColor: '#66a6ff'
    }
});

export default EventCard;
