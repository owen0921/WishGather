import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import loadingGIF from '../../assets/Animations/LoadingGIF.json'
function LoadingScreen() {
  useEffect(() => {
    // Add any logic like a timer, fetching data, or navigating away
    const timer = setTimeout(() => {
      console.log('Animation completed or timeout reached');
      // Navigate to another screen if necessary, e.g., navigation.replace('HomeScreen');
    }, 3000); // You can adjust the timeout duration

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={loadingGIF}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottie: {
    width: 200,
    height: 200
  }
});

export default LoadingScreen;
