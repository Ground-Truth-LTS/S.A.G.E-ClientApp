import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View, XStack } from 'tamagui';
import { useTheme } from '@/context/ThemeProvider';

const BackButton = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  return (    
    <XStack 
      alignItems="center" 
      zIndex={1}    
      backgroundColor = {isDarkMode ? "$color1" : "$color0"}
      paddingVertical={8}
      marginBottom={3}  
      style={{ 
        ...Platform.select({
          ios: {
            
          },
          android: {         
            width: '100%',
          },
        }),
      }}

    >
      <View 
        position="absolute" 
        left={0} 
        zIndex={10} // Higher z-index to ensure it's above other elements
        backgroundColor="$color0"
      >
        <Button 
          backgroundColor="$color0"
          pressStyle={{ backgroundColor: "$color0", borderWidth: 0 }} 
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft color="$accent1" />
          <Text color="$accent1" style={styles.text}>Back</Text>
        </Button>
      </View>
        {/* Title text centered on screen */}
      <View 
        flex={1} 
        justifyContent="center"
        alignItems="center"
        zIndex={1}
      >
        <Text 
          textAlign="center" 
          fontSize="$sm"
        >
          Log here-goes-name
        </Text>
      </View>
    </XStack>
  );
};

const styles = StyleSheet.create({

  text: {
    marginLeft: 2,
  },
  chevron: {
    width: 24,
    height: 24,
  }
});

export default BackButton;