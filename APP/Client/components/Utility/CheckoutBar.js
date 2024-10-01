// CheckoutBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

const CheckoutBar = ({ btnText, iconName , iconName_M, onPress }) => {
  return (
    <View style={styles.barContainer}>
     
      <TouchableOpacity style={styles.cartButton} onPress={onPress}>
        <Ionicons name={ iconName } size={24} color="white" />
        <MaterialCommunityIcons name={ iconName_M } size={24} color="white" />

        <Text style={styles.cartText}>{ btnText }</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'flex-end',
    backgroundColor: 'orange', 
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange', 
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  cartText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight:'bold',
  },
});

export default CheckoutBar;
