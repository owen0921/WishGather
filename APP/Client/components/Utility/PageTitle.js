import React, {useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import { MaterialIcons,MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';


const { width } = Dimensions.get('window');

function PageTitle({titleText, iconName, iconName1, iconName2}){
    return (
        <View style={styles.titleContainer}>
          <MaterialIcons name={iconName} size={32} color="orange" style={styles.icon} />
          <MaterialCommunityIcons name={iconName1} size={32} color="orange" style={styles.icon} />
          <AntDesign name={iconName2} size={24} color="orange" style={styles.icon} />
          <Text style={styles.pageTitle}>{ titleText }</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        width: width * 0.95,
        flexDirection:'row',
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
      },
    icon: {
        marginRight: 8, 
    },
    pageTitle: {
        fontSize: 26,
        color: "#4F4F4F",
        fontWeight: "bold",
        textAlign: 'left',
        marginBottom: 5,
    },
})

export default PageTitle;
