import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';

const BootSplashScreen = ({ onAnimationComplete }) => {
  const [opacity] = useState(new Animated.Value(1));
  const [spinValue] = useState(new Animated.Value(0));

  // Splash screen spinner rotation animation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    // Start spinner rotation animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Fade out after 3 seconds
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onAnimationComplete();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image
        source={require('./assets/images/SAGE_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Animated.Image
        source={require('./assets/images/spinner.png')}
        style={[styles.spinner, { transform: [{ rotate: spin }] }]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    //backgroundColor: '#232323',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'start', // If the logo doesn't fit in different screens, change to 'center' and remove padding
    paddingTop: 190, 
    zIndex: 999,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  spinner: {
    width: 50,
    height: 50,
  },
});

export default {
  BootSplashScreen,
};
