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

          // if not on SAGE network, bail
      if (!isESP32) {
        if (!isCancelled) {
          setError({ message: 'Not connected to SAGE device network', code: 'NETWORK_ERROR' });
          setData(null);
          setLoading(false);
        }
        return;
      }

      // 3. fetch logs
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const resp = await fetch('http://192.168.4.1/getAllLogs', {
          method: 'GET',
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!resp.ok) {
          throw new Error(`HTTP error: ${resp.status}`);
        }

        const json = await resp.json();
        if (!isCancelled) setData(json);
      } catch (err: any) {
        if (!isCancelled) {
          setError({
            message: err.message ?? 'Unable to communicate with device',
            code: 'FETCH_ERROR',
          });
          setData(null);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
      } catch (err: any) {
          setError({
            message: err.message ?? 'Error with permission or network connection',
            code: 'FETCH_ERROR',
          });
          setData(null);
      }
    }
    fetchLogs();
    return () => {
      isCancelled = true;
    };
  }, []);

  return { data, loading, error, connectionStatus };
}
