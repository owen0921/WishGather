import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const TempleDistance = ({ imageSource, date1, date2, temple, event, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            contentFit="cover"
            source={imageSource}
          />
          <LinearGradient
            colors={['#FF9224', 'rgba(255, 255, 255, 0.1)']}
            start={[0, 0]} // 漸層起點
            end={[1, 0]}   // 漸層終點
            style={styles.linearGradient}
          />
          <View style={styles.textContainer}>
            <Text style={styles.temple}>{temple}</Text>
            <Text style={styles.event}>{event}</Text>
          </View>
        </View>
        {/* <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date1} | {date2}</Text>
        </View> */}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 200,
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
  },
  imageContainer: {
    height: 160,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
    opacity: 0.7,
  },
  linearGradient: {
    position: 'absolute',
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  textContainer: {
    position: 'absolute',
    top: 70,
    left: 10,
  },
  temple: {
    color: "white",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 5,
  },
  event: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  dateContainer: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  dateText: {
    color: "#4F4F4F",
    fontWeight:'bold',
    fontSize: 16,
  },
});

export default TempleDistance;
