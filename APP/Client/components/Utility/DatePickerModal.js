// components/DatePickerModal.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-ui-datepicker';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DatePickerModal = ({ isVisible, onClose, date, onChange }) => {
  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const parsedDate = new Date(selectedDate);
      const adjustedDate = new Date(parsedDate.setHours(12, 0, 0, 0));
      onChange(adjustedDate);
    }
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropColor={"#d0d0d0"}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <DateTimePicker
          mode="single"
          date={date}
          onChange={params => handleDateChange(params.date)}
          selectedItemColor={"#F6AB3A"}
          headerButtonColor="#F6AB3A"
        />
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
});

export default DatePickerModal;
