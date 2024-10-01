import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable} from 'react-native';
import { useNavigation} from '@react-navigation/native';

function getBtnStatus(status){
    // conditions
    if(status == "primary") return styles.primary
    else if (status == "danger") return styles.danger
    else if (status == "normal") return styles.normal
    else if (status == "cancel") return styles.cancel
}
function SetButton({btnText, btnStatus, onPress}){
    const navigation = useNavigation();
    // status 
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.card, getBtnStatus(btnStatus)]}>
                <Text style={styles.text}>{ btnText }</Text>
            </View>
        </Pressable>
    )
}
let screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 8,
        width: screenWidth * 0.9 ,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    primary: {
        backgroundColor: "#F6AB3A", 
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5

    },
    danger:{
        backgroundColor: 'red',
    },
    cancel: {
        backgroundColor: '#dbdbdb',
    },
    text: {
        fontSize: 25,
        fontWeight: '600',
        color: 'white',
    }
    

})
export default SetButton;