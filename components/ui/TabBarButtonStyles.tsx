import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, useTheme, Button} from 'tamagui';
 
interface CircularTabBarButtonProps {
  active?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function CircularTabBarButton({ 
  children, 
  active=false,
  disabled=false,
  onPress
 }: CircularTabBarButtonProps) {
  const theme = useTheme();
  const activeColor = theme.accent1?.get();
  const inactiveColor = "grey";


  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: active ? activeColor : inactiveColor }]}
      onPress={() => {
        if (onPress) onPress();
      }}
    >
      <View style={styles.iconWrapper}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    height: 60,
    borderRadius: 50,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    alignContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});