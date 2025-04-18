// Tamagui imports
import { View, ScrollView, YStack } from 'tamagui';
import { H1, H2, H3, H4, H5 } from 'tamagui';
import { useTheme } from 'tamagui';
//React and Expo
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect, useState } from 'react';
// Components, hooks, providers imports
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


export default function Log() {

  const navigation = useNavigation<any>();
  const { id } = useLocalSearchParams();
  const { isDarkMode } = isDarkProvider();
  const theme = useTheme();

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
    <ScrollView height="100%" backgroundColor="$background">
    <StatusBar  style={isDarkMode ? "light" : "dark"}  />
    <YStack>
      <PHChart chartConfig={chartConfig} />
    </YStack>
       
    </ScrollView>
  );
}

function NPKChart({chartConfig} :  { chartConfig: any }) {
  const [chartParentWidth, setChartParentWidth] = useState(0);
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
  </View>
  ); 
}

function NPKLineChart({chartConfig} :  { chartConfig: any }) {

}

function NPKPieChart({chartConfig} :  { chartConfig: any }) {
  

}

function FertilityChart({chartConfig} :  { chartConfig: any }) {
  const [chartParentWidth, setChartParentWidth] = useState(0);
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
  </View>
  );
}

function PHChart ({chartConfig} :  { chartConfig: any }) {
  const [chartParentWidth, setChartParentWidth] = useState(0);
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
      paddingLeft={10}>PH Levels</H3>
    <H4
      fontWeight={400}
      color="$color8"
      fontSize={16} 
      marginBottom={15}
      paddingLeft={10}>May 12, 2025 - Jun 12, 2025</H4>
    <LineChart
      data={{
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ]
          }
        ]
      }}
      width={chartParentWidth}
      height={256}
      verticalLabelRotation={30}
      chartConfig={chartConfig}
      withVerticalLines={false}
      
    />
  </View>
  );
}

function TemperatureChart({chartConfig} :  { chartConfig: any }) {

}


function MoistureChart({chartConfig} :  { chartConfig: any }) {

}