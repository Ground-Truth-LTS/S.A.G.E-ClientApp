// React imports
import { Tabs, Slot } from 'expo-router';
import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  checkESP32Connection,
  startESP32Logging,
  stopESP32Logging
} from '@/utils/esp_http_request';
import { useESPDataRefresh } from '@/context/ESPDataRefreshContext';



export default function TabLayout() {
  const colorScheme = useTheme();
  const { isDarkMode } = isDarkProvider();
  const [isConnected, setIsConnected] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { selectionMode, selectedLogs } = useSelectionMode();
  const [isRecording, setIsRecording] = useState(false);
  const { triggerRefresh } = useESPDataRefresh();

  useEffect(() => {
    const fetchConnectionStatus = async () => {
      const connectionStatus = await checkESP32Connection();
      setIsConnected(connectionStatus);
    };
    fetchConnectionStatus();

    if (isRecording) {
      // Reset timer when starting recording
      setElapsedTime(0);
      
      // Start timer
    timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000) as unknown as NodeJS.Timeout;
    } else {
      // Clear timer when stopping recording
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };

  }, [isRecording]);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  const handleRecordPress = useCallback(async () => {
    if (isConnected) {
      if (!isRecording) {
        // Start recording
        console.log('Starting recording...');
        setIsRecording(true);
        const response = await startESP32Logging();
        console.log("response start:", response)
      } else {
        const response = await stopESP32Logging();
        console.log("response stop:", response);
        setIsRecording(false);
        setTimeout(() => {
          triggerRefresh(); 
        }, 4000);
      }
    }
  }, [isConnected, isRecording, triggerRefresh]);

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: colorScheme.accent1?.get(),
      headerShown: false,
      tabBarButton: HapticTab,
    
      tabBarBackground: TabBarBackground,
      tabBarStyle: selectionMode ? { display: 'none' } : Platform.select({
        ios: {
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
          tabBarButton: () => {
            return (
            <>
          <CircularTabBarButton
            active={isConnected} 
            onPress={handleRecordPress}
          >
            {isRecording
              ? <Square fill="white" size={24} color="white"/>
              : <Circle fill="white" size={24} color="white"/>
            }
          </CircularTabBarButton>
          
          {isRecording && (
            <View style={{
              position: 'absolute',
              bottom: Platform.OS === 'ios' ? 95 : -10,
              alignSelf: 'center',
              zIndex: 100,
            }}>
              <Text style={{
                color: '$color1',
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center',
              }}>
                {formatTime(elapsedTime)}
              </Text>
            </View>
          )}
        </>
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
