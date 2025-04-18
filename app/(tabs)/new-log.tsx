import { StyleSheet, Platform } from 'react-native';
import { View, Dialog } from 'tamagui';

export default function NewLogScreen() {
  return (
    <View></View>
  );
}

// Tries to connect to the ESP32 device and returns true if successful, false otherwise.
export function connectToESP32(): boolean {
  return false;
}

// Checks if the ESP32 device is connected and returns true if connected, false otherwise.
export function isDeviceConnected(): boolean {
  return false ;
}

export function startDevice() {

}

export function stopDevice() {


}

export function cancelDeviceConfirmation() {
  return (
    <Dialog>
      Cancel
    </Dialog>
  )
}

const styles = StyleSheet.create({

});
