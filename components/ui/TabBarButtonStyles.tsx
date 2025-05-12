import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, useTheme, Button} from 'tamagui';
 
interface CircularTabBarButtonProps {
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

export function CircularTabBarButton({ 
  children, 
  active=false, 

 }: CircularTabBarButtonProps) {
  const theme = useTheme();
  const activeColor = theme.accent1?.get();
  const inactiveColor = "grey";

  return (
    <Button
      borderRadius={50}
      style={[styles.container, { backgroundColor: active ? activeColor : inactiveColor }]}
    >
      <View style={styles.iconWrapper}>{children}</View>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    height: 60,
    borderRadius: 30,
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