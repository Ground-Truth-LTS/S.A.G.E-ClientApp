// Add this to your imports
import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import * as Location from 'expo-location';

// NetInfo library doc: https://github.com/react-native-netinfo/react-native-netinfo

const BASE_URL = 'http://192.168.4.1';

export async function startESP32Logging(): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const resp = await fetch(`${BASE_URL}/start`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function stopESP32Logging(): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const resp = await fetch(`${BASE_URL}/end`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function checkESP32Connection(): Promise<boolean> {
  try {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          //console.log('Location permission denied - SSID access may be limited');
      }
      const netInfo = await NetInfo.fetch();
      //console.log('NetInfo state:', netInfo); // Keep this for debugging
      
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
 const [connectionStatus, setConnectionStatus] = useState('disconnected');


useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);
      setConnectionStatus('connecting');

      // Replace with your actual ESP32 webserver URL
      const response = await fetch('http://192.168.4.1/getAllLogs');
      console.log('Response from ESP32:', response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log('Parsed JSON data:', jsonData);

      // Extract the logs array from the response
      if (jsonData && typeof jsonData === 'object' && Array.isArray(jsonData.logs)) {
        console.log('Found logs array with length:', jsonData.logs.length);
        setData(jsonData.logs);
      } else {
        console.error('Expected object with logs array but got:', jsonData);
        setData([]);
      }

      setConnectionStatus('connected');
    } catch (err) {
      //console.error('Error fetching data from ESP32:', err);
      //setError(err instanceof Error ? { message: err.message, code: 'UNKNOWN_ERROR' } : { message: 'An unknown error occurred', code: 'UNKNOWN_ERROR' });
      setData([]);
      setConnectionStatus('error');
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, []);
  console.log("ESP32 data state:", 
  { 
      dataPresent: !!data, 
      dataLength: data?.length ?? 'N/A',
      loading, 
      error, 
      connectionStatus 
  });
  return { 
      data: Array.isArray(data) ? data : [], 
      loading, 
      error, 
      connectionStatus 
    };
}

export async function downloadLog(fileName: string) {
  const fileNameFormatted = fileName.split(".")[0];
  try {
    const response = await fetch(`http://192.168.4.1/getLogId/${fileNameFormatted}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return the data instead of using state
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error(`Failed to download file ${fileName}:`, error);
    return {
      success: false,
      error
    };
  }
}