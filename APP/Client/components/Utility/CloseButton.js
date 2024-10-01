import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CloseButton = ({ style }) => {
  const navigation = useNavigation();

  return (
    <Pressable style={[styles.closeButton, style]} onPress={() => navigation.goBack()}>
      <Ionicons name="close" size={28} color="white" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 45,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
  },
});

export default CloseButton;
