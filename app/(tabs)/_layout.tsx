// React imports
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

// Components imports
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { CircularTabBarButton } from '@/components/ui/TabBarButtonStyles';
import {useTheme as isDarkProvider} from '@/context/ThemeProvider';
// Tamagui
import { GetThemeValueForKey, useTheme, View } from 'tamagui';
// Icons
import { Home as HomeIcon,
        Settings as SettingsIcon,
        Logs as LogsIcon,
        Plus as PlusIcon,
 } from '@tamagui/lucide-icons';

export default function TabLayout() {
  const colorScheme = useTheme();
  const { isDarkMode } = isDarkProvider();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme.accent1?.get(),
       
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            backgroundColor: isDarkMode ? colorScheme.background?.get() : "$background"
          },
          default: {
            backgroundColor: colorScheme.background?.get(),
            elevation: 2,
            marginBottom: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            height: 70,
            paddingBottom: 10, // Try 0 or small value
            paddingTop: 10,
            borderColor: isDarkMode ? colorScheme.accent10?.get() : 'transparent',
            borderWidth: isDarkMode ? 1 : 0,
            borderTopWidth: 0
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
        options={{
          title: '',
          tabBarButton: (props) => (
            <CircularTabBarButton {...props}>
              <PlusIcon size={45} color="white" />
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
