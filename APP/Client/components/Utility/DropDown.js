import { React, useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { getTranslations } from './translations';

function DropDown({ open, setOpen, value, setValue }){
    const [items, setItems] = useState([
      {label: '水果', value: 'A'},
      {label: '飲料', value: 'B'},
      {label: '零食', value: 'C'},
      {label: '糕點', value: 'D'},
      {label: '罐頭', value: 'E'},
      {label: '乾貨', value: 'F'}
    ]);
    
    return (
        <DropDownPicker
          placeholder='偏好供品類別'
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          multiple={true}
          mode="BADGE"
          badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
          onSelectItem={(item) => {
            if (value.includes(item.value)) {
              setValue(value.filter(v => v !== item.value));
            } else {
              setValue([...value, item.value]);
            }
          }}
        />
      );
    
}

export default DropDown;