import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

const PaymentMethodModal = ({ isVisible, onClose, onMethodSelect }) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropColor={"#d0d0d0"}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>付款方式</Text>
        <Pressable style={styles.modalOption} onPress={() => onMethodSelect('現場付款')}>
          <Text style={styles.modalOptionText}>現場付款</Text>
        </Pressable>
        <Pressable style={styles.modalOption} onPress={() => onMethodSelect('線上轉帳付款')}>
          <Text style={styles.modalOptionText}>線上轉帳付款</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOption: {
    marginVertical: 10,
    padding: 10,
    width: "80%",
    alignItems: "center",
    backgroundColor: "orange",
    borderRadius: 20,

    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default PaymentMethodModal;
