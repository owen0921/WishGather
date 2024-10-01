// CheckoutBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For cart icon

const CheckoutBar = ({ btnText, iconName ,onPress }) => {
  return (
    <View style={styles.barContainer}>
      {/* Removed total amount text */}
      <TouchableOpacity style={styles.cartButton} onPress={onPress}>
        <Ionicons name={ iconName } size={24} color="white" />
        <Text style={styles.cartText}>{ btnText }</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-end', // Center the button horizontally
    alignItems: 'flex-end',
    backgroundColor: 'orange', // Green color from the image
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange', // A slightly different green for button contrast
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
