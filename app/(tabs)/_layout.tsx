// React imports
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

// Components imports
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { CircularTabBarButton } from '@/components/ui/TabBarButtonStyles';
// Tamagui
import { useTheme } from 'tamagui';
// Icons
import { Home as HomeIcon,
        Settings as SettingsIcon,
        Logs as LogsIcon,
        Plus as PlusIcon,
 } from '@tamagui/lucide-icons';

export default function TabLayout() {
  const colorScheme = useTheme();

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
            marginBottom: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            shadowOffset: { width: 0, height: 11 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
          },
          default: {
            elevation: 1,
            marginBottom: 10,
            marginHorizontal: 10,
            borderRadius: 10,
          },
        }),
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Logs',
          tabBarIcon: ({ color }) => <LogsIcon size={28} name="logs" color={color}/>,
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
          tabBarIcon: ({ color }) => <SettingsIcon size={28} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
