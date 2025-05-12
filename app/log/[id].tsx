// Tamagui imports
import { View, ScrollView, YStack, Card, Separator } from 'tamagui';
import { H1, H2, H3, H4, H5 } from 'tamagui';
import { useTheme } from 'tamagui';
//React and Expo
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect, useState } from 'react';

// Components, hooks, providers imports
import ChartCard from '@/components/ChartCard';
import BackButton from '@/components/BackButton';
import { useTheme as isDarkProvider } from '../../context/ThemeProvider';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
// Icons for the status of the chart 
import { ArrowBigDownDash, ArrowBigUpDash, Equal } from '@tamagui/lucide-icons';
import { Text } from 'tamagui';
import { useSQLiteContext } from 'expo-sqlite';
import { getCompleteSession, getSensorDataBySessionId } from '@/database/db';

export default function Log() {
  const db = useSQLiteContext();
  const navigation = useNavigation<any>();
  const { id } = useLocalSearchParams();
  const sessionId = parseInt(id as string, 10);
  const { isDarkMode } = isDarkProvider();
  const theme = useTheme();

  const [sessionData, setSessionData] = useState<any>(null);
  const [sensorReadings, setSensorReadings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',  
      headerLeft: () => <BackButton />,
      headerTintColor: isDarkMode ?  '#222' : '$color1',
      headerStyle: {
        backgroundColor: isDarkMode ?  "black":  '#fff',
      },
    });
  }, [navigation]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchSessionData();
        await fetchSensorData();
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [sessionId]);

  const fetchSessionData = async () => {
    try {
      const sessionDataJson = await getCompleteSession(db, sessionId);
      const sessionData = JSON.parse(sessionDataJson);
      console.log("Session data:", sessionData);
      
      // You can now use this data for display, charts, etc.
      setSessionData(sessionData);
    } catch (error) {
      console.error("Error loading session data:", error);
    }
  };

const fetchSensorData = async () => {
  try {
    const dataJson = await getSensorDataBySessionId(db, sessionId);
    const data = JSON.parse(dataJson);
    console.log("Sensor readings:", data.sensorData);
    
    // Use this data for charts or display
    setSensorReadings(data.sensorData);
  } catch (error) {
    console.error("Error loading sensor readings:", error);
  }
};

  const formatDate = (timestamp: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} - ${date.toLocaleDateString()}`;
  };

  const chartConfig = {
    backgroundColor: theme.background.get(),
    backgroundGradientFrom: theme.color1.get(),
    backgroundGradientTo: theme.color1.get(),
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => theme.accent1.get(),
    labelColor: (opacity = 1) => theme.accent1.get(),
    style: {
      borderRadius: 34
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: theme.accent1.get()
    },
    propsForBackgroundLines: {
      strokeDasharray: "", // Empty string means solid line (no dashes)
      strokeWidth: 1,      // Line thickness
      stroke: theme.accent4.get() // Line color
    }
  };
  return (
    <ScrollView flex={1} backgroundColor="$background">
    <StatusBar  style={isDarkMode ? "light" : "dark"}  />
    <YStack 
      flex={1}
    >
      {/* Charts components */}
      {/* This chart can be moved to another file if it turns out to big */}
      <PHChart 
        chartConfig={chartConfig} 
        sensorData={sensorReadings}
        sessionDates={sessionData ? formatDate(sessionData.timestamp_start) : ''}
      />
      <NPKChart
        chartConfig={chartConfig} 
        sensorData={sensorReadings}
        sessionDates={sessionData ? formatDate(sessionData.timestamp_start) : ''}
      />
      <MoistureHumidityChart
        chartConfig={chartConfig}
        sensorData={sensorReadings}
        sessionDates={sessionData ? formatDate(sessionData.timestamp_start) : ''}
      />

      <TemperatureChart
        chartConfig={chartConfig}
        sensorData={sensorReadings}
        sessionDates={sessionData ? formatDate(sessionData.timestamp_start) : ''}
      />
    </YStack>

    </ScrollView>
  );
}
// Add this below your existing chart components
function NPKChart({chartConfig, sensorData, sessionDates}: {
  chartConfig: any,
  sensorData: any[],
  sessionDates?: string
}) {
  const [chartParentWidth, setChartParentWidth] = useState(0);
  
  // Process NPK data for the chart with timestamps
  const processNPKData = () => {
    if (!sensorData || sensorData.length === 0) {
      // Return dummy data if no sensor data available
      return {
        labels: ["No Data"],
        datasets: [
          { data: [0], color: () => 'rgba(0, 128, 0, 1)', legend: ["N"] }, 
          { data: [0], color: () => 'rgba(255, 165, 0, 1)', legend: ["P"] },
          { data: [0], color: () => 'rgba(128, 0, 128, 1)', legend: ["K"] }
        ],
        legend: ["Nitrogen", "Phosphorus", "Potassium"]
      };
    }
    
    // Extract NPK values with validation
    const nitrogenValues = sensorData
      .map(reading => reading?.nitrogen)
      .filter(value => value !== undefined && value !== null && !isNaN(value));
      
    const phosphorusValues = sensorData
      .map(reading => reading?.phosphorus)
      .filter(value => value !== undefined && value !== null && !isNaN(value));
      
    const potassiumValues = sensorData
      .map(reading => reading?.potassium)
      .filter(value => value !== undefined && value !== null && !isNaN(value));
    
    if (nitrogenValues.length === 0 && phosphorusValues.length === 0 && potassiumValues.length === 0) {
      // If no valid NPK values, return dummy data
      return {
        labels: ["No Valid NPK Data"],
        datasets: [
          { data: [0], color: () => 'rgba(0, 128, 0, 1)' },
          { data: [0], color: () => 'rgba(255, 165, 0, 1)' },
          { data: [0], color: () => 'rgba(128, 0, 128, 1)' }
        ],
        legend: ["Nitrogen", "Phosphorus", "Potassium"]
      };
    }
    
    // Create time labels for X-axis
    const labels: string[] = [];
    const dataLength = Math.max(nitrogenValues.length, phosphorusValues.length, potassiumValues.length);
    
    // Create evenly distributed timestamps from session start/end
    const numLabels = Math.min(6, dataLength);
    const step = Math.max(1, Math.floor(dataLength / numLabels));
    
    // Try to extract actual timestamps from session data
    let startTime: Date | null = null;
    let endTime: Date | null = null;
    
    if (sensorData[0]?.session_id) {
      try {
        // Get session info from the first reading
        const session = sensorData[0].session;
        if (session?.timestamp_start && session?.timestamp_end) {
          startTime = new Date(session.timestamp_start);
          endTime = new Date(session.timestamp_end);
        }
      } catch (e) {
        console.log("Could not parse session timestamps:", e);
      }
    }
    
    // If we have valid start/end times, use them to create timestamp labels
    if (startTime && endTime && startTime instanceof Date && endTime instanceof Date) {
      const totalDuration = endTime.getTime() - startTime.getTime();
      
      for (let i = 0; i < dataLength; i += step) {
        if (labels.length < numLabels) {
          // Calculate position in time based on position in data array
          const progress = i / (dataLength - 1);
          const timestamp = new Date(startTime.getTime() + (totalDuration * progress));
          
          // Format as hour:minute
          const timeStr = timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          });
          labels.push(timeStr);
        }
      }
    } else {
      // Fallback to simple numbered labels if timestamps aren't available
      for (let i = 0; i < dataLength; i += step) {
        if (labels.length < numLabels) {
          labels.push(`#${i+1}`);
        }
      }
    }
    
    // Ensure we have enough labels
    while (labels.length < numLabels && labels.length < dataLength) {
      labels.push(`#${labels.length+1}`);
    }
    
    // Calculate averages for display
    const avgNitrogen = nitrogenValues.reduce((sum, val) => sum + val, 0) / nitrogenValues.length;
    const avgPhosphorus = phosphorusValues.reduce((sum, val) => sum + val, 0) / phosphorusValues.length;
    const avgPotassium = potassiumValues.reduce((sum, val) => sum + val, 0) / potassiumValues.length;
    
    // Take samples at equal intervals to avoid overcrowding
    const sampledNitrogen = [];
    const sampledPhosphorus = [];
    const sampledPotassium = [];
    
    for (let i = 0; i < dataLength; i += step) {
      if (sampledNitrogen.length < numLabels) {
        sampledNitrogen.push(nitrogenValues[i] || 0);
        sampledPhosphorus.push(phosphorusValues[i] || 0);
        sampledPotassium.push(potassiumValues[i] || 0);
      }
    }
    
    return {
      labels,
      datasets: [
        { 
          data: sampledNitrogen, 
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,  // Green for Nitrogen
          strokeWidth: 2
        },
        { 
          data: sampledPhosphorus, 
          color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,  // Orange for Phosphorus
          strokeWidth: 2
        },
        { 
          data: sampledPotassium, 
          color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,  // Purple for Potassium
          strokeWidth: 2
        }
      ],
    };
  };
  
  // Get NPK nutrient status for the trend indicator
  const getNPKTrend = (): "down" | "up" | "equal" | undefined => {
    if (!sensorData || sensorData.length === 0) return undefined;
    
    // Calculate average nutrient values
    const nitrogenValues = sensorData.map(reading => reading?.nitrogen).filter(Boolean);
    const phosphorusValues = sensorData.map(reading => reading?.phosphorus).filter(Boolean);
    const potassiumValues = sensorData.map(reading => reading?.potassium).filter(Boolean);
    
    if (nitrogenValues.length === 0 && phosphorusValues.length === 0 && potassiumValues.length === 0) {
      return undefined;
    }
    
    const avgNitrogen = nitrogenValues.reduce((sum, val) => sum + val, 0) / nitrogenValues.length;
    const avgPhosphorus = phosphorusValues.reduce((sum, val) => sum + val, 0) / phosphorusValues.length;
    const avgPotassium = potassiumValues.reduce((sum, val) => sum + val, 0) / potassiumValues.length;
    
    // Optimal NPK ranges (approximate values, adjust based on your needs)
    const optimalN = 45;
    const optimalP = 35;
    const optimalK = 45;
    
    // Calculate average deviation from optimal values
    const nDeviation = avgNitrogen - optimalN;
    const pDeviation = avgPhosphorus - optimalP;
    const kDeviation = avgPotassium - optimalK;
    
    const avgDeviation = (nDeviation + pDeviation + kDeviation) / 3;
    
    // If the average deviation is significantly negative, nutrients are low
    if (avgDeviation < -5) return "down";
    // If the average deviation is significantly positive, nutrients are high
    if (avgDeviation > 5) return "up";
    // Otherwise, nutrients are within acceptable range
    return "equal";
  };
  
  // Get average NPK values for display
  const getAverageNPKValue = () => {
    if (!sensorData || sensorData.length === 0) return "N/A";
    
    const nitrogenValues = sensorData.map(reading => reading?.nitrogen).filter(Boolean);
    const phosphorusValues = sensorData.map(reading => reading?.phosphorus).filter(Boolean);
    const potassiumValues = sensorData.map(reading => reading?.potassium).filter(Boolean);
    
    if (nitrogenValues.length === 0 && phosphorusValues.length === 0 && potassiumValues.length === 0) {
      return "N/A";
    }
    
    const avgNitrogen = nitrogenValues.reduce((sum, val) => sum + val, 0) / nitrogenValues.length;
    const avgPhosphorus = phosphorusValues.reduce((sum, val) => sum + val, 0) / phosphorusValues.length;
    const avgPotassium = potassiumValues.reduce((sum, val) => sum + val, 0) / potassiumValues.length;
    
    // Average of all three nutrients
    const overallAvg = ((avgNitrogen + avgPhosphorus + avgPotassium) / 3).toFixed(1);
    return overallAvg;
  };

  const content = (
    <View padding={10} flex={1} gap={6} justifyContent='center'>
      <Text>
        <Text fontWeight="bold" color="$green9">N: </Text>
        <Text>{sensorData?.length ? (sensorData.reduce((sum, item) => sum + item.nitrogen, 0) / sensorData.length).toFixed(1) : "N/A"}</Text>
      </Text>
      <Text>
        <Text fontWeight="bold" color="$orange9">P: </Text>
        <Text>{sensorData?.length ? (sensorData.reduce((sum, item) => sum + item.phosphorus, 0) / sensorData.length).toFixed(1) : "N/A"}</Text>
      </Text>
      <Text>
        <Text fontWeight="bold" color="$purple9">K: </Text>
        <Text>{sensorData?.length ? (sensorData.reduce((sum, item) => sum + item.potassium, 0) / sensorData.length).toFixed(1) : "N/A"}</Text>
      </Text>
    </View>
  );
  
  return (
    <View 
      onLayout={({ nativeEvent }) => setChartParentWidth(nativeEvent.layout.width)}
      backgroundColor="$background"
      paddingTop={24}
      paddingBottom={24}
      marginHorizontal={24}
      borderRadius={16}
      marginTop={24}
    >
      <H4
        fontWeight={500}
        fontSize={24} 
        paddingLeft={10}>
        NPK Nutrients
      </H4>
      <H5
        fontWeight={400}
        color="$color8"
        fontSize={16} 
        marginBottom={15}
        paddingLeft={10}>
        {sessionDates || 'No date information'}
      </H5>
      
      {sensorData && sensorData.length > 0 ? (
        <LineChart
          data={processNPKData()}
          width={chartParentWidth || 300}
          height={256}
          verticalLabelRotation={30}
          chartConfig={{
            ...chartConfig,
            formatYLabel: (value) => parseFloat(value).toFixed(0),
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          withVerticalLines={false}
          withHorizontalLines={true}
          withInnerLines={true}
          bezier
          withDots={false}
          withShadow={false}
          yAxisSuffix=""
          yAxisLabel=""
          renderDotContent={({x, y, index, indexData}) => (
            <Text 
              style={{
                position: 'absolute',
                fontSize: 10,
                fontWeight: 'bold',
                left: x - 10,
                top: y - 15
              }}
            >
              {indexData}
            </Text>
          )}
        />
      ) : (
        <View height={256} justifyContent="center" alignItems="center">
          <Text>No NPK data available</Text>
        </View>
      )}
      
      <ChartCard 
        value={getAverageNPKValue()} 
        trend={getNPKTrend()} 
        content={content}
      />
      
      <View flexDirection="row" paddingHorizontal={15} paddingTop={10} justifyContent="center">
        <Legend colors={['rgba(0, 128, 0, 1)', 'rgba(255, 165, 0, 1)', 'rgba(128, 0, 128, 1)']} 
                labels={['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)']} />
      </View>
    </View>
  );
}

// Add this helper component for the legend
function Legend({ colors, labels }: { colors: string[], labels: string[] }) {
  return (
    <View flexDirection="row" flexWrap="wrap" justifyContent="center" gap={10} paddingVertical={5}>
      {colors.map((color, index) => (
        <View key={index} flexDirection="row" alignItems="center" gap={5}>
          <View width={12} height={12} backgroundColor={color} borderRadius={6} />
          <Text fontSize={12}>{labels[index]}</Text>
        </View>
      ))}
    </View>
  );
}

function NPKLineChart({chartConfig} :  { chartConfig: any }) {
  const [chartParentWidth, setChartParentWidth] = useState(0);

  // Add legend 
}

function NPKPieChart({chartConfig} :  { chartConfig: any }) {
  const [chartParentWidth, setChartParentWidth] = useState(0);
  const content = (
    <View padding={10} flex={1} gap={6} justifyContent='center'>

    </View>
  )
  // Add legend 

}

function FertilityChart({chartConfig} :  { chartConfig: any }) {
  const [chartParentWidth, setChartParentWidth] = useState(0);
  const content = (
    <View padding={10} flex={1} gap={6} justifyContent='center'>

    </View>
  )
  return (
    <View 
    onLayout={({ nativeEvent }) => setChartParentWidth(nativeEvent.layout.width)}
    height="100%"
    backgroundColor="$background"
    paddingTop={24}
    paddingBottom={24}
    marginHorizontal={24}
    borderRadius={16}
    >
    <H3
      fontWeight={500}
      fontSize={24} 
      marginBottom={15}
      paddingLeft={10}>Fertility</H3>
    <H4
      fontWeight={400}
      color="$color8"
      fontSize={16} 
      marginBottom={15}
      paddingLeft={10}>May 12, 2025 - Jun 12, 2025</H4> 

    {/* Here goes the Chart */}
    <ChartCard value={"##"} content={content} ></ChartCard>
  </View>
  );
}

function PHChart({chartConfig, sensorData, sessionDates}: {
  chartConfig: any,
  sensorData: any[],
  sessionDates?: string
}) {
  const [chartParentWidth, setChartParentWidth] = useState(0);
  
  // Process pH data for the chart with proper timestamps
  const processPhData = () => {
    if (!sensorData || sensorData.length === 0) {
      // Return dummy data if no sensor data available
      return {
        labels: ["No Data"],
        datasets: [{data: [0]}]
      };
    }
    
    // Extract pH values
    const phValues = sensorData.map(reading => reading.pH);
    
    // Create time labels from session timestamps
    // Since your database might not have individual timestamps for each reading,
    // we'll create evenly distributed time labels based on session start and end time
    let labels: string[] = [];
    
    // If we have session data with timestamps, use them to create time labels
    if (sensorData.length > 0) {
      // Create timestamps by evenly distributing readings across the session timespan
      // For display purposes, just show a few labels to avoid crowding
      const numLabels = Math.min(6, sensorData.length);
      const step = Math.floor(sensorData.length / numLabels);
      
      for (let i = 0; i < sensorData.length; i += step) {
        if (labels.length < numLabels) {
          const index = Math.min(i, sensorData.length - 1);
          // Format as hour:minute
          labels.push(`#${index+1}`);
        }
      }
    }
    
    // Calculate average pH for display
    const avgPh = phValues.reduce((sum, val) => sum + val, 0) / phValues.length;
    
    return {
      labels,
      datasets: [{
        data: phValues,
        strokeWidth: 2
      }],
    
    };
  };
  
  const getPhTrend = (): "down" | "up" | "equal" | undefined => {
    if (!sensorData || sensorData.length === 0) return undefined;
    
    const phValues = sensorData.map(reading => reading.pH);
    const avgPh = phValues.reduce((sum, val) => sum + val, 0) / phValues.length;
    
    // pH ranges: <6.5 is acidic, 6.5-7.5 is neutral, >7.5 is alkaline
    if (avgPh < 6.5) return "down";  // Acidic
    if (avgPh > 7.5) return "up";    // Alkaline
    return "equal";                  // Neutral (using "equal" instead of "neutral")
  };
  
  // Get average pH value for display
  const getAveragePhValue = () => {
    if (!sensorData || sensorData.length === 0) return "N/A";
    
    const phValues = sensorData.map(reading => reading.pH);
    const avgPh = phValues.reduce((sum, val) => sum + val, 0) / phValues.length;
    
    return avgPh.toFixed(1);
  };

  const content = (
    <View padding={10} flex={1} gap={6} justifyContent='center'>
      <Text>
        {"pH < 6.5: Acidic"}
      </Text>
      <Text>
        {"pH 6.5-7.5: Neutral (Optimal)"}
      </Text>
      <Text>
        {"pH > 7.5: Alkaline"}
      </Text>
    </View>
  );
  
return (
    <View 
      onLayout={({ nativeEvent }) => setChartParentWidth(nativeEvent.layout.width)}
      backgroundColor="$background"
      paddingTop={24}
      paddingBottom={24}
      marginHorizontal={24}
      borderRadius={16}
    >
      <H4
        fontWeight={500}
        fontSize={24} 
        paddingLeft={10}>
        pH Levels
      </H4>
      <H5
        fontWeight={400}
        color="$color8"
        fontSize={16} 
        marginBottom={15}
        paddingLeft={10}>
        {sessionDates || 'No date information'}
      </H5>
      
      {sensorData && sensorData.length > 0 ? (
        <LineChart
          data={processPhData()}
          width={chartParentWidth || 300}
          height={256}
          verticalLabelRotation={0}
          chartConfig={{
            ...chartConfig,
            // Improve Y-axis display
            formatYLabel: (value) => parseFloat(value).toFixed(1),
          }}
          withVerticalLines={false}
          withHorizontalLines={true}
          withInnerLines={true}
          bezier
          // Remove fromZero to let Y axis scale naturally based on data
          yAxisSuffix=""
          yAxisLabel=""
        />
      ) : (
        <View height={256} justifyContent="center" alignItems="center">
          <Text>No pH data available</Text>
        </View>
      )}
      
      <ChartCard 
        value={getAveragePhValue()} 
        trend={getPhTrend()} 
        content={content}
      />
    </View>
  );
}

function TemperatureChart({chartConfig, sensorData, sessionDates}: { 
  chartConfig: any, 
  sensorData: any[],
  sessionDates?: string
}) {
  const [chartParentWidth, setChartParentWidth] = useState(0);
  
  // Process temperature data for the chart with timestamps
  const processTemperatureData = () => {
    if (!sensorData || sensorData.length === 0) {
      console.log("No sensor data found for temperature chart");
      // Return dummy data if no sensor data available
      return {
        labels: ["No Data"],
        datasets: [
          { data: [0], color: () => 'rgba(255, 99, 71, 1)' },  
          { data: [0], color: () => 'rgba(139, 69, 19, 1)' }   
        ],
        legend: ["Air Temp", "Soil Temp"]
      };
    }
    
    // Look for various possible property names in the data
    const soilTempValues = sensorData
      .map(reading => {
        // Try different possible property names
        return reading?.soilTemp || reading?.SoilTemp || reading?.soil_temp || 
               reading?.soil_temperature || reading?.soiltemp;
      })
      .filter(value => value !== undefined && value !== null && !isNaN(value));
      
    const airTempValues = sensorData
      .map(reading => {
        // Try different possible property names
        return reading?.airTemp || reading?.AirTemp || reading?.air_temp || 
               reading?.air_temperature || reading?.airtemp;
      })
      .filter(value => value !== undefined && value !== null && !isNaN(value));
    
    console.log("Temperature data found:", {
      soilTempCount: soilTempValues.length,
      airTempCount: airTempValues.length,
      sampleSoil: soilTempValues.slice(0, 3),
      sampleAir: airTempValues.slice(0, 3),
      firstReading: sensorData[0]
    });
    
    if (soilTempValues.length === 0 && airTempValues.length === 0) {
      console.log("No valid temperature values found in data");
      // If no valid temperature values, return dummy data
      return {
        labels: ["No Valid Temp Data"],
        datasets: [
          { data: [0], color: () => 'rgba(255, 99, 71, 1)' },
          { data: [0], color: () => 'rgba(139, 69, 19, 1)' }
        ],
        legend: ["Air Temp", "Soil Temp"]
      };
    }
    
    // Create time labels for X-axis
    const dataLength = Math.max(soilTempValues.length, airTempValues.length);
    const numLabels = Math.min(6, dataLength);
    const step = Math.max(1, Math.floor(dataLength / numLabels));
    
    // Create timestamp labels for X-axis
    const labels: string[] = [];
    
    // Try to use session data to calculate timestamps
    const startDate = new Date(1747015860 * 1000); // Unix timestamp from CSV data
    const endDate = new Date(1747018800 * 1000);   // Unix timestamp from CSV data
    
    if (startDate && endDate) {
      const totalDuration = endDate.getTime() - startDate.getTime();
      
      for (let i = 0; i < dataLength; i += step) {
        if (labels.length < numLabels) {
          // Calculate position in time based on position in data array
          const progress = i / (dataLength - 1);
          const timestamp = new Date(startDate.getTime() + (totalDuration * progress));
          
          // Format as hour:minute
          const timeStr = timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          });
          labels.push(timeStr);
        }
      }
    } else {
      // Fallback to numbered labels
      for (let i = 0; i < dataLength; i += step) {
        if (labels.length < numLabels) {
          labels.push(`#${i+1}`);
        }
      }
    }
    
    // Sample data at regular intervals to match our labels
    const sampledSoilTemp = [];
    const sampledAirTemp = [];
    
    for (let i = 0; i < dataLength; i += step) {
      if (sampledSoilTemp.length < numLabels) {
        sampledSoilTemp.push(i < soilTempValues.length ? soilTempValues[i] : 0);
        sampledAirTemp.push(i < airTempValues.length ? airTempValues[i] : 0);
      }
    }
    
    // Ensure we have the same number of data points as labels
    while (sampledSoilTemp.length < labels.length) {
      sampledSoilTemp.push(0);
      sampledAirTemp.push(0);
    }
    
    console.log("Processed temperature chart data:", {
      labels,
      soilTemp: sampledSoilTemp,
      airTemp: sampledAirTemp
    });
    
    return {
      labels,
      datasets: [
        {
          data: sampledAirTemp,
          color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,  // Tomato red for air temp
          strokeWidth: 2
        },
        {
          data: sampledSoilTemp,
          color: (opacity = 1) => `rgba(139, 69, 19, ${opacity})`,  // Brown for soil temp
          strokeWidth: 2
        }
      ],
      legend: ["Air Temp", "Soil Temp"]
    };
  };

  // Get temperature status for the trend indicator
  const getTemperatureTrend = (): "down" | "up" | "equal" | undefined => {
    if (!sensorData || sensorData.length === 0) return undefined;
    
    const soilTempValues = sensorData
      .map(reading => reading?.soilTemp || reading?.SoilTemp)
      .filter(value => value !== undefined && value !== null && !isNaN(value));
      
    if (soilTempValues.length === 0) return undefined;
    
    const avgSoilTemp = soilTempValues.reduce((sum, val) => sum + val, 0) / soilTempValues.length;
    
    // Temperature ranges (adjust based on your specific plants/needs)
    if (avgSoilTemp < 15) return "down";     // Too cold
    if (avgSoilTemp > 30) return "up";       // Too hot
    return "equal";                          // Optimal temperature
  };
  
  // Get average temperature values for display
  const getAverageValues = () => {
    if (!sensorData || sensorData.length === 0) return { soil: "N/A", air: "N/A" };
    
    const soilTempValues = sensorData
      .map(reading => reading?.soilTemp || reading?.SoilTemp)
      .filter(value => value !== undefined && value !== null && !isNaN(value));
      
    const airTempValues = sensorData
      .map(reading => reading?.airTemp || reading?.AirTemp)
      .filter(value => value !== undefined && value !== null && !isNaN(value));
    
    const avgSoilTemp = soilTempValues.length ? 
      (soilTempValues.reduce((sum, val) => sum + val, 0) / soilTempValues.length).toFixed(1) : "N/A";
      
    const avgAirTemp = airTempValues.length ?
      (airTempValues.reduce((sum, val) => sum + val, 0) / airTempValues.length).toFixed(1) : "N/A";
    
    return { soil: `${avgSoilTemp}°C`, air: `${avgAirTemp}°C` };
  };

  const content = (
    <View padding={10} flex={1} gap={4} justifyContent='center'>
      <View flexDirection="row" flexWrap="wrap" gap={12}>
        <Text>
          <Text fontWeight="bold" color="$brown9">Soil: </Text>
          <Text>{getAverageValues().soil}</Text>
        </Text>
        <Text>
          <Text fontWeight="bold" color="$red9">Air: </Text>
          <Text>{getAverageValues().air}</Text>
        </Text>
      </View>
      <Separator marginVertical={4} />
      <Text fontSize={12}>{"< 15°C: Too Cold • 15-30°C: Optimal • > 30°C: Too Hot"}</Text>
    </View>
  );

  return (
    <View 
      onLayout={({ nativeEvent }) => setChartParentWidth(nativeEvent.layout.width)}
      backgroundColor="$background"
      paddingTop={24}
      paddingBottom={24}
      marginHorizontal={24}
      borderRadius={16}
      marginTop={24}
    >
      <H4
        fontWeight={500}
        fontSize={24} 
        paddingLeft={10}>
        Temperature
      </H4>
      <H5
        fontWeight={400}
        color="$color8"
        fontSize={16} 
        marginBottom={15}
        paddingLeft={10}>
        {sessionDates || 'No date information'}
      </H5>
      
      {sensorData && sensorData.length > 0 ? (
        <LineChart
          data={processTemperatureData()}
          width={chartParentWidth || 300}
          height={256}
          verticalLabelRotation={30}
          chartConfig={{
            ...chartConfig,
            formatYLabel: (value) => `${parseFloat(value).toFixed(1)}°`,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            decimalPlaces: 1,
          }}
          withVerticalLines={false}
          withHorizontalLines={true}
          withInnerLines={true}
          bezier
          yAxisSuffix="°"
          yAxisLabel=""
        />
      ) : (
        <View height={256} justifyContent="center" alignItems="center">
          <Text>No temperature data available</Text>
        </View>
      )}
      
      <ChartCard 
        value={getAverageValues().soil}
        trend={getTemperatureTrend()} 
        content={content}
      />
      
    </View>
  );
}

function MoistureHumidityChart({chartConfig, sensorData, sessionDates}: { 
  chartConfig: any, 
  sensorData: any[],
  sessionDates?: string
}) {
  const [chartParentWidth, setChartParentWidth] = useState(0);
  
  // Process moisture and humidity data for the chart with timestamps
 const processMoistureData = () => {
    if (!sensorData || sensorData.length === 0) {
      // Return dummy data if no sensor data available
      return {
        labels: ["No Data"],
        datasets: [
          { data: [0], color: () => 'rgba(0, 128, 255, 1)' },
          { data: [0], color: () => 'rgba(128, 0, 255, 1)' }
        ],
        legend: ["Moisture", "Humidity"]
      };
    }
    
    // Extract moisture values with validation
    const moistureValues = sensorData
      .map(reading => reading?.moisture)
      .filter(value => value !== undefined && value !== null && !isNaN(value));
      
    // Handle humidity values (either use real ones or estimate)
    const humidityValues = sensorData
      .map(reading => {
        if (reading?.humidity !== undefined) return reading.humidity;
        // Estimate humidity as slightly higher than moisture
        return reading?.moisture ? Math.min(reading.moisture + 15, 100) : undefined;
      })
      .filter(value => value !== undefined && value !== null && !isNaN(value));
    
    // Create simple numeric labels if we can't get proper timestamps
    const dataLength = Math.max(moistureValues.length, humidityValues.length);
    const numLabels = Math.min(6, dataLength);
    const step = Math.max(1, Math.floor(dataLength / numLabels));
    
    // Create timestamp labels for X-axis
    const labels: string[] = [];
    
    // Try to use session data to calculate timestamps
    const startDate = new Date(1747015860 * 1000); // Unix timestamp from CSV data
    const endDate = new Date(1747018800 * 1000);   // Unix timestamp from CSV data
    
    if (startDate && endDate) {
      const totalDuration = endDate.getTime() - startDate.getTime();
      
      for (let i = 0; i < dataLength; i += step) {
        if (labels.length < numLabels) {
          // Calculate position in time based on position in data array
          const progress = i / (dataLength - 1);
          const timestamp = new Date(startDate.getTime() + (totalDuration * progress));
          
          // Format as hour:minute
          const timeStr = timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          });
          labels.push(timeStr);
        }
      }
    } else {
      // Fallback to numbered labels
      for (let i = 0; i < dataLength; i += step) {
        if (labels.length < numLabels) {
          labels.push(`#${i+1}`);
        }
      }
    }
    
    // Sample data at regular intervals to match our labels
    const sampledMoisture = [];
    const sampledHumidity = [];
    
    for (let i = 0; i < dataLength; i += step) {
      if (sampledMoisture.length < numLabels) {
        sampledMoisture.push(i < moistureValues.length ? moistureValues[i] : 0);
        sampledHumidity.push(i < humidityValues.length ? humidityValues[i] : 0);
      }
    }
    
    // Ensure we have the same number of data points as labels
    while (sampledMoisture.length < labels.length) {
      sampledMoisture.push(0);
      sampledHumidity.push(0);
    }
    
    console.log("MoistureChart data:", {
      labels,
      moisture: sampledMoisture,
      humidity: sampledHumidity
    });
    
    return {
      labels,
      datasets: [
        {
          data: sampledMoisture,
          color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,  // Blue for moisture
          strokeWidth: 2
        },
        {
          data: sampledHumidity,
          color: (opacity = 1) => `rgba(128, 0, 255, ${opacity})`,  // Purple for humidity
          strokeWidth: 2
        }
      ],
      legend: ["Moisture", "Humidity"]
    };
  };
  // Get moisture status for the trend indicator
  const getMoistureTrend = (): "down" | "up" | "equal" | undefined => {
    if (!sensorData || sensorData.length === 0) return undefined;
    
    const moistureValues = sensorData
      .map(reading => reading?.moisture)
      .filter(value => value !== undefined && value !== null && !isNaN(value));
      
    if (moistureValues.length === 0) return undefined;
    
    const avgMoisture = moistureValues.reduce((sum, val) => sum + val, 0) / moistureValues.length;
    
    // Moisture ranges (adjust these based on your specific needs)
    // Typically: <25% is dry, 25-35% is optimal, >35% is wet
    if (avgMoisture < 25) return "down";     // Too dry
    if (avgMoisture > 35) return "up";       // Too wet
    return "equal";                         // Optimal moisture
  };
  
  // Get average moisture and humidity values for display
  const getAverageValues = () => {
    if (!sensorData || sensorData.length === 0) return { moisture: "N/A", humidity: "N/A" };
    
    const moistureValues = sensorData
      .map(reading => reading?.moisture)
      .filter(value => value !== undefined && value !== null && !isNaN(value));
      
    const humidityValues = sensorData
      .map(reading => {
        // If you added humidity to your database schema, use that
        if (reading?.humidity !== undefined) return reading.humidity;
        
        // Otherwise, estimate humidity based on moisture (this is just for demonstration)
        // In a real app, you should use actual sensor data
        return reading?.moisture ? Math.min(reading.moisture + 15, 100) : undefined;
      })
      .filter(value => value !== undefined && value !== null && !isNaN(value));
    
    const avgMoisture = moistureValues.length ? 
      (moistureValues.reduce((sum, val) => sum + val, 0) / moistureValues.length).toFixed(1) : "N/A";
      
    const avgHumidity = humidityValues.length ?
      (humidityValues.reduce((sum, val) => sum + val, 0) / humidityValues.length).toFixed(1) : "N/A";
    
    return { moisture: `${avgMoisture}%`, humidity: `${avgHumidity}%` };
  };

  const content = (
  <View padding={10} flex={1} gap={4} justifyContent='center'>
    <View flexDirection="row" flexWrap="wrap" gap={12}>
      <Text>
        <Text fontWeight="bold" color="$blue9">Moisture: </Text>
        <Text>{getAverageValues().moisture}</Text>
      </Text>
      <Text>
        <Text fontWeight="bold" color="$purple9">Humidity: </Text>
        <Text>{getAverageValues().humidity}</Text>
      </Text>
    </View>
    <Separator borderColor="transparent" marginVertical={4} />
    <Text fontSize={12}>{"< 25%: Dry • 25-35%: Optimal • > 35%: Wet"}</Text>
  </View>
  );

  return (
    <View 
      onLayout={({ nativeEvent }) => setChartParentWidth(nativeEvent.layout.width)}
      backgroundColor="$background"
      paddingTop={24}
      paddingBottom={24}
      marginHorizontal={24}
      borderRadius={16}
      marginTop={24}
    >
      <H4
        fontWeight={500}
        fontSize={24} 
        paddingLeft={10}>
        Soil Moisture & Humidity
      </H4>
      <H5
        fontWeight={400}
        color="$color8"
        fontSize={16} 
        marginBottom={15}
        paddingLeft={10}>
        {sessionDates || 'No date information'}
      </H5>
      
      {sensorData && sensorData.length > 0 ? (
        <LineChart
          data={processMoistureData()}
          width={chartParentWidth || 300}
          height={256}
          verticalLabelRotation={30}
          chartConfig={{
            ...chartConfig,
            formatYLabel: (value) => `${parseFloat(value).toFixed(0)}%`,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Ensure this doesn't override dataset colors
            decimalPlaces: 0,
          }}
          withVerticalLines={false}
          withHorizontalLines={true}
          withInnerLines={true}
          bezier
          yAxisSuffix="%"
          yAxisLabel=""
        />
      ) : (
        <View height={256} justifyContent="center" alignItems="center">
          <Text>No moisture data available</Text>
        </View>
      )}
      
      <ChartCard 
        value={getAverageValues().moisture + " & " + getAverageValues().humidity}
        trend={getMoistureTrend()} 
        content={content}
      />
      
   
    </View>
  );
}