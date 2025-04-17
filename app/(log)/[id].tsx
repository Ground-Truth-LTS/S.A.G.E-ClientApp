
import BackButton from '@/components/BackButton';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { View, Image } from 'tamagui';

export default function Log() {

  const navigation = useNavigation<any>();
  const { id } = useLocalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',  
      headerLeft: () => <BackButton />
    });
  }, [navigation]);

  return (
    <View></View>
  );
}

const styles = StyleSheet.create({

});
