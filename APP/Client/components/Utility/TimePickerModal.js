import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const TimePickerModal = ({ isVisible, onClose, onConfirm, initialTime }) => {
  const [selectedTime, setSelectedTime] = useState(initialTime);

  const handleTimeChange = (hour, minute) => {
    setSelectedTime({ hour, minute });
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropColor={"#d0d0d0"}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>選擇時間</Text>
        <View style={styles.timePickerContainer}>
          <Picker
            selectedValue={selectedTime.hour}
            style={styles.picker}
            onValueChange={(itemValue) => handleTimeChange(itemValue, selectedTime.minute)}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <Picker.Item key={i} label={`${i < 10 ? `0${i}` : i}`} value={`${i < 10 ? `0${i}` : i}`} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedTime.minute}
            style={styles.picker}
            onValueChange={(itemValue) => handleTimeChange(selectedTime.hour, itemValue)}
          >
            {['00', '10', '20', '30', '40', '50'].map(minute => (
              <Picker.Item key={minute} label={minute} value={minute} />
            ))}
          </Picker>
        </View>
        <Pressable style={styles.modalButton} onPress={() => onConfirm(selectedTime.hour, selectedTime.minute)}>
          <Text style={styles.modalButtonText}>完成</Text>
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
  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    height: 150,
    width: 100,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",

    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TimePickerModal;
