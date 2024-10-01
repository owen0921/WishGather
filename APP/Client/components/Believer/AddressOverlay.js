import * as React from "react";
import { View, StyleSheet, Text, TextInput, Pressable, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const AddressOverlay = ({ onClose, onSubmit }) => {
  const [address, setAddress] = React.useState("");

  return (
    <View style={styles.addressLayout}>
      {/* Header */}
      <Text style={styles.headerText}>修改地址</Text>

      {/* Location input */}
      <TextInput
        style={styles.addressInput} // 固定高度
        placeholder="請輸入地址..."
        value={address}
        onChangeText={setAddress}
      />

      {/* Confirm / Cancel Button */}
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.cancelButton]} onPress={onClose}>
          <Text style={[styles.buttonText, styles.cancelButtonText]}>取消</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.confirmButton]} onPress={() => onSubmit(address)}>
          <Text style={[styles.buttonText, styles.confirmButtonText]}>確認</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressLayout: {
    height: 180,
    width: 300,
    backgroundColor: "white",
    borderRadius: 15,
    paddingTop: 20,
    alignItems: "center",
    paddingHorizontal: 20,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Elevation for Android
    elevation: 5,
  },
  headerText: {
    color:'#4f4f4f',
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addressInput: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 16, // 調整字體大小
    marginBottom: 20,
    height: 55, // 固定高度
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    borderTopWidth: 0.3,
    borderColor: "#ccc",
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    borderRightWidth: 0.3,
    borderColor: "#ccc",
  },
  cancelButtonText: {
    color: 'red',
  },
  confirmButtonText: {
    color: '#007AFF',
  },
});

export default AddressOverlay;
