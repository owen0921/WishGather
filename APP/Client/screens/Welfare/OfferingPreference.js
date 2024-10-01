import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import PageTitle from '../../components/Utility/PageTitle';
import CheckoutBar from '../../components/Believer/CheckoutBar';
import GoBackButton1 from '../../components/Utility/GoBackButton1';

const { width } = Dimensions.get('window');

const OfferingPreference = () => {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const items = [
    { label: '水果', value: 'A' },
    { label: '飲料', value: 'B' },
    { label: '零食', value: 'C' },
    { label: '糕點', value: 'D' },
    { label: '罐頭', value: 'E' },
    { label: '乾貨', value: 'F' },
  ];

  const handleSavePreferences = () => {
    // Handle saving preferences (e.g., sending to API)
    console.log('Selected offerings:', selectedItems);
  };

  return (
    <SafeAreaProvider>
        <View style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom -40,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }}>
            <View style={{position:'absolute', top:50, left:10}}><GoBackButton1/></View>
            <PageTitle iconName={'add-circle-outline'} titleText="偏好選擇" />
            <DropDownPicker
                open={open}
                value={selectedItems}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedItems}
                multiple={true}
                mode="BADGE"
                placeholder="選擇供品"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                schema={{
                label: 'label',
                value: 'value',
                }}
            />
            <View style={styles.buttonContainer}><CheckoutBar btnText="儲存偏好" iconName={'arrow-forward-circle-outline'} onPress={handleSavePreferences} /></View>
        </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  dropdown: {
    width: width*0.9,
    justifyContent:'center',
    alignSelf:'center',
    marginTop: 20,
    borderColor: '#ccc',
  },
  dropdownContainer: {
    width: width*0.9,
    alignSelf:'center',
    marginTop: 20,
    borderColor: '#ccc',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 9999,
  },
});

export default OfferingPreference;