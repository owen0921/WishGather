import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';


const { width } = Dimensions.get('window');

const ConfirmItem = ({ title, price, quantity}) => {

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        
        <View style={styles.titleContainer}>
          <Text style={styles.quantity}>{quantity}</Text>  
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width*0.9,
    height: 60,
    flexDirection: 'row',
    justifyContent:"center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 5,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  quantity:{
    fontSize: 18,
    fontWeight: 'bold',
    color: "#4F4F4F",
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#4F4F4F",
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "orange",
  },
});

export default ConfirmItem;
