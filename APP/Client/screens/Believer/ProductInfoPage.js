import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CloseButton from '../../components/Utility/CloseButton';
import CheckoutBar from '../../components/Utility/CheckoutBar';

const { width, height } = Dimensions.get('window');

const ProductInfoPage = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { imageSource, title, price, description, initialQuantity, onAddToCart } = route.params;
  const [quantity, setQuantity] = useState(initialQuantity);
  const [remark, setRemark] = useState('');

  const handleAddToCart = () => {
    onAddToCart(title, quantity, remark); 
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: "white",
          paddingTop: insets.top - 50,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right 
        }}> 

        <View style={styles.btnContainer}><CloseButton /></View>
        
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imageSource} />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>$ {price}</Text>
        {description && <Text style={styles.description}>備註 : {description}</Text>}
        
        <View style={styles.remarkContainer}>
            <Text style={styles.remark}>備註 : </Text>
            <TextInput
              style={styles.remarkInput}
              placeholder="請輸入備註..."
              value={remark}
              onChangeText={setRemark}
            />
        </View>

        {/* Counter */}
        <View style={styles.quantityContainer}>
          <Pressable onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 0)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{quantity}</Text>
          <Pressable onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>

        {/* Add To Cart Button */}

        <View style={styles.buttonContainer}>
           <CheckoutBar btnText={"加入購物車"} iconName_M={"cart"} onPress={handleAddToCart} />
        </View>

        {/* <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
          <MaterialCommunityIcons name="cart" size={24} color="white" />
          <Text style={styles.addToCartButtonText}>加入購物車</Text>
        </Pressable> */}

      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  btnContainer:{
    zIndex:9999,
    position:'absolute',
    top:10,
    right:8,

  },
  imageContainer: {
    width: width,
    height: height * 0.4,
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    color:'#4F4F4F',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: '500',
    color: "#4F4F4F",
    marginLeft: 20,
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    color: '#9D9D9D',
    marginLeft: 20,
    marginVertical: 5,
  },
  remarkContainer: {
    width: width,
    borderTopWidth: 1, 
    borderColor: "#ccc",
    marginTop: 20,
    alignSelf: 'center',
  },
  remark: {
    color:'#4F4F4F',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginVertical: 10,
  },
  remarkInput: {
    width: "90%",
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    alignSelf:'center',
    marginBottom: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  quantityButtonText: {
    fontSize: 26,
    fontWeight:'bold',
    color: 'orange', 
  },
  quantityText: {
    fontSize: 22,
    marginHorizontal: 20,
    color: '#4F4F4F',
  },
  buttonContainer: {
    width: width,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default ProductInfoPage;
