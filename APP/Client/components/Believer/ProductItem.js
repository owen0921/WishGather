import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({ destination, imageSource, title }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate(destination, { selectedTitle: title })}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.productImage}
          source={imageSource}
        />
      </View>

      {/* Title */}
      <View style={{ width: '100%' }}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 180,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 120,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4F4F4F',
    textAlign: 'center',
  },
});

export default ProductItem;
