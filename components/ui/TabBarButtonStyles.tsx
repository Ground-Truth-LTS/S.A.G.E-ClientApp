import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { View, useTheme} from 'tamagui';
 
export function CircularTabBarButton({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, { backgroundColor: theme.accent1?.get()  }]}
      activeOpacity={0.8}
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