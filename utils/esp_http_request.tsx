// Add this to your imports
import { useState, useEffect } from 'react';

// Function to fetch data from ESP32
const fetchDataFromESP32 = async () => {
  try {
    // The IP address is typically 192.168.4.1 for ESP32 in Access Point mode
    const response = await fetch('http://192.168.4.1/getAllLogs', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Data from ESP32:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from ESP32:', error);
    throw error;
  }
};

// Use this function in your component to fetch ESP32 data
export const useESP32Data = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const refreshData = async () => {
    try {
      setLoading(true);
      const newData = await fetchDataFromESP32();
      setData(newData);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    refreshData();

    const intervalId = setInterval(refreshData, 5000); // Every 5 seconds
    
    return () => clearInterval(intervalId);
  }, []);
  
  return { data, loading, error, refreshData };
};