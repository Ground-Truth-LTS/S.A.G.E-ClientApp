// Add this to your imports
import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import * as Location from 'expo-location';

// NetInfo library doc: https://github.com/react-native-netinfo/react-native-netinfo

async function checkESP32Connection(): Promise<boolean> {
  try {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          console.log('Location permission denied - SSID access may be limited');
      }
      const netInfo = await NetInfo.fetch();
      console.log('NetInfo state:', netInfo); // Keep this for debugging
      
      if (netInfo.isConnected && netInfo.type === 'wifi' && netInfo.details) {
          const info = netInfo.details;
          return info !== null && 
                  'ssid' in info && 
                  info.ssid !== null && 
                  (info.ssid.includes('ESP32') || info.ssid.includes('SAGE') || info.ssid.includes('AndroidWifi'));
      }
      return false;
  } catch (error) {
      console.error('Error checking ESP32 connection:', error);
      return false;
  }
};

export function useESP32Data() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string; code: string } | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<{
    connected: boolean;
    networkName: string;
  }>({ connected: false, networkName: '' });

  useEffect(() => {
    let isCancelled = false;

    async function fetchLogs() {
      setLoading(true);
      setError(null);

       try {
        // Request location permission (needed for SSID access)
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (!isCancelled) {
            setError({ 
              message: 'Location permission required to detect device network', 
              code: 'PERMISSION_ERROR' 
            });
            setLoading(false);
            return;
          }
        }
        
        const netInfo = await NetInfo.fetch();
        const isESP32 = await checkESP32Connection();
        const networkName =
          netInfo.details && 'ssid' in netInfo.details
            ? ((netInfo.details as any).ssid as string) || 'Unknown'
            : 'Unknown';

        if (!isCancelled) {
          setConnectionStatus({ connected: isESP32, networkName });
        }

        // ...rest of your existing code...
      } catch (err: any) {
        // ...existing error handling...
      }
    }
    fetchLogs();
    return () => {
      isCancelled = true;
    };
  }, []);

  return { data, loading, error, connectionStatus };
}
