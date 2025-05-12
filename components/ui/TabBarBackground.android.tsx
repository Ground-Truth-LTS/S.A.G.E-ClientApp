import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';
import { useTheme as isDarkProvider } from '@/context/ThemeProvider';
import { useTheme } from 'tamagui';

export default function AndroidTabBarBackground() {
  const {isDarkMode} = isDarkProvider();
  const colorScheme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { width } = Dimensions.get('window');

  return (
    <View style={[
      {
        position: 'absolute',
        left: 0, // Full width
        right: 0, // Full width
        bottom: 0, // Start from bottom of screen
        height: 65, // Make tall enough to cover the entire area
        // No border radius on the outer container
      },
    ]}>
      {/* This is the background that should cover everything */}
      <View
        position="absolute"
        backgroundColor="red" // Use solid colors instead of red for production
        style={[StyleSheet.absoluteFill, {
          width: 800, // Full screen width
          height: 150, // Extra height to ensure coverage
          left: -50,
          bottom: 0,
          zIndex: -10, // Make sure it's behind everything
        }]}
      />
      {/* This is the actual navbar styling */}
      <View
        style={{
          backgroundColor: isDarkMode ? colorScheme.color3?.get() : colorScheme.background?.get(),
          elevation: 2,
          marginBottom: 25,
          marginHorizontal: 10,
          borderRadius: 10,
          height: 70,
          paddingBottom: 10, 
          paddingTop: 10,
          borderColor: isDarkMode ? colorScheme.accent10?.get() : 'rgba(0, 0, 0, 0.1)',
          borderWidth: isDarkMode ? 1 : 1.25,
          borderTopWidth: isDarkMode ? 0 : 1.25,
          zIndex: 1, // Ensure it's above the background
        }}
      />
    </View>
  );
}

// Share the same utility function across both platforms
export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}