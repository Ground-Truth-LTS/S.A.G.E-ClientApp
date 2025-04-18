// Tamagui imports
import { View, ScrollView, YStack, Card } from 'tamagui';
import { H1, H2, H3, H4, H5 } from 'tamagui';
import { useTheme } from 'tamagui';
//React and Expo
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect, useState } from 'react';

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
    <ScrollView flex={1} backgroundColor="$background">
    <StatusBar  style={isDarkMode ? "light" : "dark"}  />
    <YStack 
      flex={1}
    >
      {/* Charts components */}
      {/* This chart can be moved to another file if it turns out to big */}
      <PHChart chartConfig={chartConfig} />
      <MoistureChart chartConfig={chartConfig} />
    </YStack>
       
    </ScrollView>
  );
}

function NPKChart({chartConfig} :  { chartConfig: any }) {
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
      
    {/* Here goes the NPKLineChart */}
    {/* Here goes the NPKPieChart */}
    <ChartCard value={"##"} content={content} ></ChartCard>
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

function PHChart ({chartConfig} :  { chartConfig: any }) {
  const [chartParentWidth, setChartParentWidth] = useState(0);

  const content = (
    <View padding={10} flex={1} gap={6} justifyContent='center' >
    <Text>
      Good range 10%-60% Acid
    </Text>
    <Text>
      Good range 60%-70% Neutral
    </Text>
    <Text>
      Good range 70%-100% Alkaline
    </Text>
  </View>
  )
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
      paddingLeft={10}>PH Levels</H4>
    <H5
      fontWeight={400}
      color="$color8"
      fontSize={16} 
      marginBottom={15}
      paddingLeft={10}>May 12, 2025 - Jun 12, 2025</H5>
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
    <ChartCard value={"##"} trend='up' content={content}></ChartCard>
  </View>
  );
}

function TemperatureChart({chartConfig} :  { chartConfig: any }) {
  const [chartParentWidth, setChartParentWidth] = useState(0);
  /* Implement the legend, since there is ambient temperature and soil temperature */
  const content = (
    <View padding={10} flex={1} gap={6} justifyContent='center'>

    </View>
  )
  return (
    <View 
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
        paddingLeft={10}>Temperature</H3>
      <H4
        fontWeight={400}
        color="$color8"
        fontSize={16} 
        marginBottom={15}
        paddingLeft={10}>May 12, 2025 - Jun 12, 2025</H4>      

        {/* Here goes the Chart */}
        <ChartCard value={"##"} content={content} ></ChartCard>
    </View>
  )
}


function MoistureChart({chartConfig} :  { chartConfig: any }) {
  const [chartParentWidth, setChartParentWidth] = useState(0);
  /* Implement the legend, since there is ambient moisture and soil moisture */
  const content = (
    <View padding={10} flex={1} gap={6} justifyContent='center'>
      <Text>
        Good range ##%-##% 
      </Text>
      <Text>
        Good range ##%-##% 
      </Text>
      <Text>
        Good range ##%-##% 
      </Text>
    </View>
  )

  return (
    <View 
      backgroundColor="$background"
      paddingTop={24}
      paddingBottom={24}
      marginHorizontal={24}
      borderRadius={16}
    >
      <H3
        fontWeight={500}
        fontSize={24} 
        paddingLeft={10}>Moisture</H3>
      <H4
        fontWeight={400}
        color="$color8"
        fontSize={16} 
        marginBottom={15}
        paddingLeft={10}>{/* Pass Start and End Date as argument */}May 12, 2025 - Jun 12, 2025</H4>
      {/* Here goes the Chart */}
      <ChartCard value={"80%"} content={content}></ChartCard>
    </View>
  )
}