
// Tamagui imports
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig }  from '../tamagui.config'
import { PortalProvider } from 'tamagui';
// Expo imports
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SQLiteProvider } from 'expo-sqlite';
// React imports
import { useEffect, useState } from 'react';


// SQLite imports
import { 
  createEmptyDB,
  insertCSVData
} from '@/database/db';


// Prevent the splash screen from auto-hiding before asset loading is complete.
// Import our custom BootSplash implementation
import { ThemeProvider, useTheme as isDarkProvider } from '../context/ThemeProvider';
import { YStack } from 'tamagui';
import { SelectionModeProvider } from '@/context/SelectionModeProvider';
import { useTheme } from "tamagui";
import { ESPDataRefreshProvider } from '@/context/ESPDataRefreshContext';
import { Platform } from 'react-native';
import { BootSplashScreen } from '@/bootsplash';


export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [splashVisible, setSplashVisible] = useState(true);
  // Handle font loading and splash screen
  useEffect(() => {
    if (loaded) {
      // Fonts are loaded, we can hide the splash in a moment
      // We keep splash visible for a short moment to ensure smooth transition
    }
  }, [loaded]);
  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme='light'>
      <SQLiteProvider databaseName='sage.db' onInit={ async (db) => {
        await createEmptyDB(db);
      }}>
        <PortalProvider shouldAddRootHost>
        <ThemeProvider>
          <ESPDataRefreshProvider>
            <SelectionModeProvider>
              <StatusBarManager />
              <AppContent splashVisible={splashVisible} onSplashComplete={() => setSplashVisible(false)} />
            </SelectionModeProvider>
          </ESPDataRefreshProvider>
        </ThemeProvider>
        </PortalProvider>
      </SQLiteProvider>
    </TamaguiProvider>
  );
}

function AppContent({ splashVisible, onSplashComplete }: { splashVisible: boolean; onSplashComplete: () => void }) {
  // If you need Tamagui's theme, import it here
  const { isDarkMode } = isDarkProvider();
  const tamaguiTheme = useTheme(); 
  const backgroundColor = tamaguiTheme.background?.get();
  return (
    <YStack flex={1} backgroundColor="$background">
      <Stack
        screenOptions={{
          // contentStyle sets the background behind your screen component
          contentStyle: {
            backgroundColor: isDarkMode ? tamaguiTheme.background?.get() : tamaguiTheme.background?.get(),
          },
          // headerStyle sets the background of the native header bar
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}  />
        <Stack.Screen name="+not-found" />
      </Stack>

      {splashVisible && (
        <BootSplashScreen
          onAnimationComplete={onSplashComplete}
        />
      )}
        
    </YStack>
  )
}

function StatusBarManager() {
  const { isDarkMode } = isDarkProvider();
  
  // This will apply the status bar style app-wide
  return <StatusBar style={isDarkMode ? "light" : "dark"} animated={true} />;
}