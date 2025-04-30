// React imports
import { Tabs, Slot } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

// Components imports
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { CircularTabBarButton } from '@/components/ui/TabBarButtonStyles';
import {useTheme as isDarkProvider} from '@/context/ThemeProvider';
import { useSelectionMode } from '@/context/SelectionModeProvider';
// Tamagui
import { Button, GetThemeValueForKey, useTheme, View, XStack, Text } from 'tamagui';
// Icons
import { 
        Settings as SettingsIcon,
        Logs as LogsIcon,
        Circle,
        Square,
 } from '@tamagui/lucide-icons';



export default function TabLayout() {
  const colorScheme = useTheme();
  const { isDarkMode } = isDarkProvider();
  const { selectionMode, selectedLogs } = useSelectionMode();
  // TODO: Add Alert when booting for the first time to show the instructions, you can use the Dialog Sheet from the System or using the React Native Alert Component, try do it as close as possible to the Figma model

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: colorScheme.accent1?.get(),
      headerShown: false,
      tabBarButton: HapticTab,
      tabBarBackground: TabBarBackground,
      tabBarStyle: selectionMode ? { display: 'none' } : Platform.select({
        ios: {
          // Use a transparent background on iOS to show the blur effect
          position: 'absolute',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          backgroundColor: isDarkMode ? colorScheme.background?.get() :  "$background" 
        },
        default: {
          backgroundColor: isDarkMode ?  colorScheme.color3?.get() : colorScheme.background?.get(),
          elevation: 2,
          marginBottom: 10,
          marginHorizontal: 10,
          borderRadius: 10,
          height: 70,
          paddingBottom: 10, // Try 0 or small value
          paddingTop: 10,
          borderColor: isDarkMode ? colorScheme.accent10?.get() : 'transparent',
          borderWidth: isDarkMode ? 1 : 0,
          borderTopWidth: isDarkMode ? 0 : 1,
        },
      }),
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Logs',
          tabBarIcon: ({ color }) => 
          (  
          <View style={{ display:'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <LogsIcon size={28} color={color as GetThemeValueForKey<"color">} />
          </View>),
      }}
      />

      <Tabs.Screen
        name="new-log"
        listeners={{
          tabPress: (e) => {
            // Prevent default navigation
            e.preventDefault();
          },
        }}
        options={{
          title: '',
          tabBarButton: (props) => (
            <CircularTabBarButton {...props}>
              {/*If not recording circle */}
              <Circle fill="white" size={24} color="white" />
              {/*If recording square */}
              {/*<Square fill="white" size={24} color="white" />*/}
              {/**TODO: Add timer of the amount timestamp recording for the device, that will probably go on the Navbar */}
            </CircularTabBarButton>
            
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => 
            (
              <View  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <SettingsIcon size={28} color={color as GetThemeValueForKey<"color">} />
              </View>
            ),
        }}
      />
  </Tabs>

  );
}
