import React, { createContext, useState, useContext, useEffect } from 'react';
import { Theme } from 'tamagui';
// Uncomment when you're ready to use storage
// import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        // Uncomment when you're ready to use storage
        // const savedTheme = await AsyncStorage.getItem('theme');
        // setIsDarkMode(savedTheme === 'dark');
      } catch (error) {
        console.log('Error loading theme preference', error);
      }
    };
    
    loadTheme();
  }, []);

  const toggleTheme = () => {
    const newThemeValue = !isDarkMode;
    setIsDarkMode(newThemeValue);
    
    // Save preference (uncomment when ready)
    // AsyncStorage.setItem('theme', newThemeValue ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <Theme name={isDarkMode ? 'dark' : 'light'}>
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};


export default ThemeProvider;