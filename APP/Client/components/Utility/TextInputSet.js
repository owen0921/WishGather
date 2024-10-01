import { React, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

const {width} = Dimensions.get('window');

function TextInputSet({ labelName, defaultValue, multiLine, placeholder, onChange}){
    // const [text, onChangeText] =  useState(defaultValue);

    const handleTextChange = (newText) => {
        // onChangeText(newText);  // Update internal state
        if (onChange) {
            onChange(newText);  // Call parent's handler if provided
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{labelName}</Text>
            <TextInput style={[styles.input, multiLine ? styles.multiLine : null]} 
                       placeholder={placeholder}
                       value={defaultValue} 
                       onChangeText={handleTextChange}  
                       multiline={multiLine ? true : false}/>
        </View>
    )

}
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container:{
        marginBottom: '5px',
        width:width*0.9,
    },
    label:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4F4F4F',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    multiLine: {
        height: 150,
        paddingVertical: 20
    },
    icon:{
        position: 'fixed',
        right: 0,
    }
    
})

export default TextInputSet;