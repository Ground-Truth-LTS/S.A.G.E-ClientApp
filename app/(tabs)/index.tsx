// React imports 
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Tamagui imports
import { View, ListItem, YStack, useListItem, ScrollView, TabLayout, TabsTabProps, StackProps, XStack, Button, Text } from 'tamagui';
import {  AnimatePresence, Separator, SizableText, Tabs, styled } from 'tamagui';
import { FileText, ChevronRight, Download, Filter, ListFilter} from '@tamagui/lucide-icons';  
import { useNavigation } from 'expo-router';
import { useESP32Data, downloadESP32CSVFile } from '@/utils/esp_http_request';


const StyledTab = styled(Tabs.Tab, {
  variants: {
    active: {
      true: {
        backgroundColor: "transparent",
        textEmphasis: "strong",
      },
    },
  },
});


export default function LogsList() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const {
    data,
    loading,
    error,
    connectionStatus: status,
  } = useESP32Data();
  // Refer to tamagui doc https://tamagui.dev/ui/tabs for more information about the Tabs component, the tabs animation were done from the tabs doc
  const [tabState, setTabState] = React.useState<{
    currentTab: string
    intentAt: TabLayout | null
    activeAt: TabLayout | null
  }>({
    activeAt: null,
    currentTab: 'phone',
    intentAt: null,
  })

  const setCurrentTab = (currentTab: string) => setTabState({ ...tabState, currentTab })
  const setIntentIndicator = (intentAt: any) => setTabState({ ...tabState, intentAt })
  const setActiveIndicator = (activeAt: any) => setTabState({ ...tabState, activeAt })
  const { activeAt, intentAt, currentTab } = tabState

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
    if (type === 'select') {
      setActiveIndicator(layout)
    } else {
      setIntentIndicator(layout)
    }
  }

  const navigateToLog = (id: string) => {
    navigation.navigate('log/[id]', { id });
  }

  return (
    <View 
      height="100%"
      backgroundColor="$background"
      style={{  
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: insets.left + insets.right,
        flex: 1,
      }}>
      <YStack>
        
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          defaultValue="phone"
          orientation="horizontal"
          flexDirection="column"
          width="100%"
          height="100%"
          borderRadius={4}
          borderWidth={0.25}
          borderBlockWidth={0}
          activationMode="manual"
          overflow="hidden"
        >
          <YStack>
          <AnimatePresence>
          {intentAt && (
            <TabsRovingIndicator
              borderRadius={4}
              marginVertical={10}
              marginHorizontal={10}
              width={intentAt.width}
              height={intentAt.height}
              x={intentAt.x}
              y={intentAt.y}
            />
          )}
          </AnimatePresence>
          <AnimatePresence>
          {activeAt && (
            <TabsRovingIndicator
              borderRadius={4}
              marginVertical={10}
              marginHorizontal={10}
              theme="accent"
              width={activeAt.width}
              height={activeAt.height}
              x={activeAt.x}
              y={activeAt.y}
            />
          )}
          </AnimatePresence>

          <Tabs.List
            disablePassBorderRadius
            loop={false}
            marginVertical={10}
            marginHorizontal={10}
            justifyContent='center'
            backgroundColor="transparent"
          >

            {/* 
              TODO: Implementent different sorts, this button is going to open a pop up, 
              preferably a modal, with the different options to sort the logs, 
              try to copy the dialog from the figma prototype the best you can
            */}
            <Button 
              marginHorizontal={10} 
              width={60}
              icon={<ListFilter size={25} />} 
              backgroundColor="transparent" 
              pressStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
              ></Button>

            <StyledTab
              value="phone"
              height={40}
              width={100}
              unstyled
              justifyContent='center'
              alignItems='center'
              borderColor="$accent4"
              borderWidth={2}
              active={currentTab !== "phone" /* This is breaking the background tab, this is intended */} 
              borderTopLeftRadius={4}
              borderBottomLeftRadius={4}
              onInteraction={handleOnInteraction}
            >
              <SizableText 
                fontWeight={currentTab !== "phone" ? 500 : 600}
              >Phone</SizableText>
            </StyledTab>
            <StyledTab
              value="device"
              height={40}    
              width={100}
              unstyled
              justifyContent='center'
              alignItems='center'
              borderColor="$accent4"
              borderWidth={2}
              active={currentTab !== "device"}
              borderTopRightRadius={4}
              borderBottomRightRadius={4}
              onInteraction={handleOnInteraction}
            >
              <SizableText 
                fontWeight={currentTab !== "device" ? 500 : 600}
              >Device</SizableText>
            </StyledTab>
            <Button 
              width={60}
              marginHorizontal={10} 
              backgroundColor="transparent" 
              color="$accent4"
              pressStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
              > Select </Button>
          </Tabs.List>
          </YStack>
          <Separator />
    
          <Tabs.Content value="phone" backgroundColor="$color1" borderColor="$color1" height={"100%"}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 120, // Add extra padding at the bottom for the tab bar
              }}>
                <YStack margin={20}>
                    {/*This is the ListItem for the Mobile tab*/}
                    <ListItem
                      hoverTheme
                      pressTheme
                      title="Log 2"
                      subTitle="Log 2 description"
                      icon={FileText}
                      iconAfter={ChevronRight}
                      color="$color9"
                      scaleIcon={1.7}
                      padding={10}
                      size={16}
                      borderWidth={0}
                      borderBottomWidth={3}
                      backgroundColor="$color1"
                      onPress={() => navigateToLog("2")}
                    ></ListItem>
                    
              </YStack>  
            </ScrollView>
          </Tabs.Content>

          <Tabs.Content value="device"  backgroundColor="$color1" height={"100%"}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 120, // Add extra padding at the bottom for the tab bar
              }}>
              <YStack margin={20}>
                {/*This is the ListItem for the Device tab*/}
                <DisplayDeviceData data={data} error={error} status={status} />
              </YStack>
            </ScrollView>
          </Tabs.Content>
       
        
        </Tabs>
      </YStack>
    </View>
  );
}

const TabsRovingIndicator = ({ active, ...props }: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$accent4"
      opacity={1}
      animation="fast"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: '$color8',
        opacity: 0.6,
      })}
      {...props}
    />
  )
}

const DisplayDeviceData: React.FC<{ data: any; error: any; status: any }> = ({ data, error, status }) => {
  const logList = [];

  if (!status.connected) {
    return (
      <View
        height={500}
        width="100%"
        position="relative" // This is to make the text centered in the screen
        justifyContent='center'
        alignItems='center'
      >
      <Text
        style={styles.noDeviceText}
        >Device not connected
        </Text>
      </View>
      );

  }

  if (!data || data == null || data.length === 0) {
    return (
      <View
        height={500}
        width="100%"
        position="relative" // Th
        justifyContent='center'
        alignItems='center'
      >
      <Text
        style={styles.noDeviceText}
        >No logs in device
        </Text>
      </View>
      );
  }

  for(let index = 0; index < data?.length; index++){
    logList.push(
      <ListItem
        key={index}
        hoverTheme
        pressTheme
        title={data[index].title}
        subTitle={data[index].description}
        icon={FileText}
        iconAfter={ChevronRight}
        color="$color9"
        scaleIcon={1.7}
        padding={10}
        size={16}
        borderWidth={0}
        borderBottomWidth={3}
        backgroundColor="$color1"
        onPress={ () => {
          downloadESP32CSVFile(data[index].fileName)
        }
        }
      ></ListItem>
    )
  }

  return logList;

}



const styles = StyleSheet.create({
  noDeviceText: {
    fontSize: 24,
    color: "grey", 
  }
});
