// Add this to your imports
import { useState, useEffect, useCallback } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import * as Location from 'expo-location';

// NetInfo library doc: https://github.com/react-native-netinfo/react-native-netinfo

const BASE_URL = 'http://192.168.4.1';

export async function startESP32Logging(): Promise<any> {
  try {
    const resp = await fetch(`${BASE_URL}/start_sensor`)
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.json();
  } finally {

  }
}

export async function stopESP32Logging(): Promise<any> {
  try {
    const resp = await fetch(`${BASE_URL}/end_sensor`);
    console.log(resp);

    if (!resp.ok) {
      console.error(`Stop logging request failed with status: ${resp.status}`);
      return { success: false, message: `Failed with status ${resp.status}` };
    }
    
// First, try to get the response as text
    const textResponse = await resp.text();
    console.log('Stop logging raw response:', textResponse);
    
    // Try to parse as JSON if possible
    let responseData;
    try {
      responseData = JSON.parse(textResponse);
      console.log('Parsed JSON response:', responseData);
    } catch (e) {
      // If not valid JSON, just use the text response
      console.log('Response is not JSON, using text:', textResponse);
      responseData = { 
        success: true, 
        message: textResponse,
        isTextResponse: true
      };
    }
    
    return responseData;
  } catch (error) {
    console.error('Error stopping ESP32 logging:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      isError: true
    };
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

  const fetchData = useCallback(async () => {
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
      //console.log('Parsed JSON data:', jsonData);

      // Extract the logs array from the response
      if (jsonData && typeof jsonData === 'object' && Array.isArray(jsonData.logs)) {
        //console.log('Found logs array with length:', jsonData.logs.length);
        setData(jsonData.logs);
      } else {
        //console.error('Expected object with logs array but got:', jsonData);
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
    }, []);

    useEffect(() => {
      fetchData();
    }, []);


// useEffect(() => {
//   async function fetchData() {
//     try {
//       setLoading(true);
//       setConnectionStatus('connecting');

//       // Replace with your actual ESP32 webserver URL
//       const response = await fetch('http://192.168.4.1/getAllLogs');
//       //console.log('Response from ESP32:', response);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const jsonData = await response.json();
//       //console.log('Parsed JSON data:', jsonData);

//       // Extract the logs array from the response
//       if (jsonData && typeof jsonData === 'object' && Array.isArray(jsonData.logs)) {
//         //console.log('Found logs array with length:', jsonData.logs.length);
//         setData(jsonData.logs);
//       } else {
//         //console.error('Expected object with logs array but got:', jsonData);
//         setData([]);
//       }

//       setConnectionStatus('connected');
//     } catch (err) {
//       //console.error('Error fetching data from ESP32:', err);
//       //setError(err instanceof Error ? { message: err.message, code: 'UNKNOWN_ERROR' } : { message: 'An unknown error occurred', code: 'UNKNOWN_ERROR' });
//       setData([]);
//       setConnectionStatus('error');
//     } finally {
//       setLoading(false);
//     }
//   }

//   fetchData();
//   }, []);

  return { 
      data: Array.isArray(data) ? data : [], 
      loading, 
      error, 
      connectionStatus,
      refreshData: fetchData,
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