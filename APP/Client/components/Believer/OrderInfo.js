import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const OrderInfo = ({ iconName, iconType, title, value, onPress }) => {
  const IconComponent = iconType === 'MaterialIcons' ? MaterialIcons : Entypo;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
        <IconComponent name={iconName} size={24} color="#333" />
      </View>
      <Text style={styles.title}>{title}</Text>
      {value && <Text style={styles.value}>{value}</Text>}
      <View style={styles.arrowContainer}>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#A0A0A0" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    justifyContent: 'space-between', // Align items and arrow to ends
  },
  iconContainer: {
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  arrowContainer: {
    marginLeft: 15, // Add margin to separate the arrow from the value
  },
});

export default OrderInfo;
