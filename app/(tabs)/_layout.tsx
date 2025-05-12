// React imports
import { Tabs, Slot } from 'expo-router';
import React, { useState, useCallback } from 'react';
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

 import { 
  startESP32Logging,
  stopESP32Logging
} from '@/utils/esp_http_request';



export default function TabLayout() {
  const colorScheme = useTheme();
  const { isDarkMode } = isDarkProvider();
  const { selectionMode, selectedLogs } = useSelectionMode();
    const [isRecording, setIsRecording] = useState(false);
  // TODO: Add Alert when booting for the first time to show the instructions, you can use the Dialog Sheet from the System or using the React Native Alert Component, try do it as close as possible to the Figma model
  const handleRecordPress = useCallback(async () => {
    try {
      if (!isRecording) {
        await startESP32Logging();
      } else {
        await stopESP32Logging();
      }
      setIsRecording(r => !r);
    } catch (err) {
      console.error(err);
      // optionally show an Alert here
    }
  }, [isRecording]);
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
          marginBottom: 10,
        },
        default: {
          backgroundColor: isDarkMode ?  colorScheme.color3?.get() : colorScheme.background?.get(),
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
        // prevent normal navigation:
        listeners={{ tabPress: e => e.preventDefault() }}
        options={{
          title: '',
          tabBarButton: (props) => {
            // strip out the default onPress so we can override it
            const { onPress, ...rest } = props;
            return (
              <CircularTabBarButton
                {...rest}
                onPress={handleRecordPress}
              >
                {isRecording
                  ? <Square fill="white" size={24} />
                  : <Circle fill="white" size={24} />
                }
              </CircularTabBarButton>
            );
          },
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
