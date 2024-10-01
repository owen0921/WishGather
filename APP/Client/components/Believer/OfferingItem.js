import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const OfferingItem = ({ imageSource, title, price, description, quantity, onAddToCart }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ProductInfoPage', {
      imageSource,
      title,
      price,
      description,
      initialQuantity: quantity || 1, // 傳遞初始數量
      onAddToCart,
    });
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price}</Text>
        {description && <Text style={styles.description}>備注 : {description}</Text>}
      </View>

      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
        {quantity > 0 && (
          <View style={styles.quantityBadge}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: width*0.95,
    height: 120,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA042',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#9D9D9D',
    marginTop: 5,
  },
  imageContainer: {
    position: 'relative', // To position the quantity badge
    alignItems: 'center',
  },
  image: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  quantityBadge: {
    position: 'absolute',
    top: -5, // Adjust this to position the badge at the top-right
    right: -5,
    backgroundColor: '#FFA042',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default OfferingItem;
