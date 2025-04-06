
// Tamagui imports
import { TamaguiProvider } from '@tamagui/core';
import { config } from '../tamagui.config'

// Expo imports
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

// React imports
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme='light'>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}  />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </TamaguiProvider>
  );
}
