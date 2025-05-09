// Expo and React imports 
import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
// Tamagui imports
import { ListItem, useListItem, TabLayout, TabsTabProps, StackProps, Button, Text, H4 } from 'tamagui';
import { View, YStack, XStack, ScrollView} from 'tamagui';
import { Toast, useToastController, useToastState, ToastViewport } from '@tamagui/toast'
import { AnimatePresence, Separator, SizableText, Tabs, styled, useTheme, Checkbox, RadioGroup, Label } from 'tamagui';
import { FileText, ChevronRight, Download, Filter, ListFilter} from '@tamagui/lucide-icons';  
import { 
        CheckCircle,
        Trash2,
        Edit3,
        X,
        Check as CheckIcon
 } from '@tamagui/lucide-icons';
import type { CheckboxProps } from 'tamagui'
// Custom Utils, Components and Providers 
import { useTheme as isDarkProvider } from '@/context/ThemeProvider';
import { useESP32Data } from '@/utils/esp_http_request';
import { useSelectionMode } from '@/context/SelectionModeProvider';
// Database queries
import { getAllSession } from '@/database/db';

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
  const db = useSQLiteContext();
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logs, setLogs] = useState([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { bottom } = useSafeAreaInsets();
  const {
    data,
    loading,
    error,
    connectionStatus: status,
  } = useESP32Data();

  useEffect(() => {
    // Logs is equivalent
    async function loadLogs(){
      try {
        const logsRequest = await getAllSession(db);
        setLogs(JSON.parse(logsRequest));
        console.log("Loading logs from local database", logs, logsRequest, JSON.parse(logsRequest));
      }catch (error) {
        console.error("Error loading logs: ", error);

      } finally {
        setLoadingLogs(false);
      }
    }
    loadLogs();
  }, [db])

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
  const colorScheme = useTheme();
  const { isDarkMode } = isDarkProvider();
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [downloadConfirmVisible, setDownloadConfirmVisible] = useState(false);
  const { selectionMode, selectedLogs, toggleSelectionMode } = useSelectionMode();
  const setCurrentTab = (currentTab: string) => setTabState({ ...tabState, currentTab })
  const setIntentIndicator = (intentAt: any) => setTabState({ ...tabState, intentAt })
  const setActiveIndicator = (activeAt: any) => setTabState({ ...tabState, activeAt })
  const { activeAt, intentAt, currentTab } = tabState
  const selectedElements = [];
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

  const SortModal: React.FC = () => {

    return (
      <Modal
        visible={sortModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
        style={{ backgroundColor: isDarkMode ? "$color1" : "white" }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          backgroundColor="rgba(0, 0, 0, 0.5)" // Semi-transparent background
        >
          <View borderWidth={isDarkMode ? 1 : 0} borderColor={ isDarkMode ? "$color5" : "white"}  style={{ width: 250, height: 225, backgroundColor: isDarkMode ? "$color1" : "white", borderRadius: 10 }}>
            
            
            <H4 fontSize={24} paddingHorizontal={20} color="$accent2">Sort by:</H4>
            <Separator></Separator>
            
            <View style={{ flex: 1 }}>

              <RadioGroup aria-labelledby="Select one order" defaultValue="new-old" name="form">
                <YStack alignItems="center" justifyContent='space-evenly' height={100} padding={10}>
                  <XStack alignItems="center">
                    <RadioGroup.Item value="new-old" id="new-old-radio-item" size="$xl2">
                      <RadioGroup.Indicator scale={1.3} />
                    </RadioGroup.Item>

                    <Label fontSize={18} paddingHorizontal={10}>
                      New to oldest 
                    </Label>
                  </XStack>

                   <XStack alignItems="center">
                    <RadioGroup.Item value="old-new" id="old-new-radio-item" size="$xl2">
                      <RadioGroup.Indicator scale={1.3} />
                    </RadioGroup.Item>

                    <Label fontSize={18} paddingHorizontal={10}>
                      Oldest to new 
                    </Label>
                  </XStack>
                </YStack>
              </RadioGroup>

              <View style={{ flex: 1, alignItems: 'flex-end' }} flexDirection='row'>        
                <Button 
                  padding={20} 
                  width={"50%"}
                  backgroundColor={ isDarkMode ? "$color1" : "white"} 
                  onPress={() => setSortModalVisible(false)}
                  borderStartEndRadius={10}
                  borderColor="$accent2"
                  borderWidth={0}
                  borderTopWidth={1}
                  pressStyle={{ backgroundColor: "$color3", borderWidth: 0 }}
                  >
                    <Text fontSize={18} color="$accent2">Close</Text>
                </Button>

                <Button 
                  padding={20} 
                  width={"50%"}
                  backgroundColor="$accent2"
                  onPress={() => setSortModalVisible(false)}
                  borderEndEndRadius={10}
                  pressStyle={{ backgroundColor: "$accent1", borderWidth: 0 }}
                  >
                    <Text fontSize={18} color="white">Apply</Text>
                </Button>
              </View>
            </View>

           
    
          </View>
        </View>
      </Modal>
    );
  }

  const ToolBar: React.FC = () => {
    // Selection mode action handlers
    const handleSelectAll = () => {
      // Logic to select all logs
    };

    const handleDelete = () => {
      // Logic to delete selected logs
    };

    const handleDownload = () => {
      // Logic to download selected logs
    };

    const handleRename = () => {
      // Logic to rename selected log
    };
    return (
    <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: isDarkMode ? colorScheme.color3?.get() : colorScheme.background?.get(),
          ...Platform.select({
            android: {
              elevation: 4,
              marginBottom: 10,
            },
            ios: {
              position: 'absolute',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              bottom: bottom,
            },
            default: {
              // Default fallback styles if needed
              elevation: 1, 
            }
          }),

          marginHorizontal: 10,
          borderRadius: 10,
          height: 70,
          paddingVertical: 10,
          borderColor: isDarkMode ? colorScheme.accent10?.get() : colorScheme.color9?.get(),
          borderWidth: isDarkMode ? 1 : .5,
          borderTopWidth: .2,
          zIndex: 1000,
        }}
      >
          <XStack justifyContent="space-around" alignItems="center" height="100%">
            {/* Selection All Button */}

          <YStack 
            alignItems='center' 
            height="100%" 
            justifyContent='space-between'        
            opacity={logs.length === 0 ? 0.5 : 1}>
            <Checkbox 
              id={"checkbox-all"} 
              size="$xl3"
              backgroundColor="$background"
              borderRadius={16}
              borderColor="$color9"
              borderWidth={logs.length === 0 ? 0.5 : 2}
              disabled={logs.length === 0}
            >
              <Checkbox.Indicator > 
                <CheckIcon color="$color9" />
              </Checkbox.Indicator>
            </Checkbox>
            <Text color="$color9" >
              All
            </Text>
          </YStack>
    
            {/* Eliminate Button */}
            <Button
              unstyled
              onPress={handleDelete}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
              padding={0}
              disabled={selectedLogs.length === 0 && selectedElements.length > 0}
              opacity={selectedLogs.length === 0 ? 0.5 : 1}
              pressStyle={{ opacity: 0.7 }}
            >
              <Trash2 size={24} color="$color9" />
              <Text color="$color9" >
                Eliminate
              </Text>
            </Button>
            
            {/* Download Button */}
            <Button
              unstyled
              onPress={handleDownload}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
              padding={0}
              disabled={selectedLogs.length === 0 && selectedElements.length > 0}
              opacity={selectedLogs.length === 0 ? 0.5 : 1}
              pressStyle={{ opacity: 0.7 }}
            >
              <Download size={24} color="$color9" />
              <Text color="$color9" >
                Download
              </Text>
            </Button>
            
            {/* Rename Button */}
            <Button
              unstyled
              onPress={handleRename}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
              padding={0}
              disabled={selectedLogs.length !== 1}
              opacity={selectedLogs.length !== 1 ? 0.5 : 1}
              pressStyle={{ opacity: 0.7 }}
            >
              <Edit3 size={24} color="$color9" />
              <Text color="$color9" >
                Rename
              </Text>
            </Button>
          </XStack>
        </View>
      );
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
         
          <XStack 
            width="100%" 
            justifyContent='space-evenly' >
               {/* 
              TODO: Implementent different sorts, this button is going to open a pop up, 
              preferably a modal, with the different options to sort the logs, 
              try to copy the dialog from the figma prototype the best you can
            */}
            <Button 
              icon={<ListFilter color="$color10" size={25} />} 
              width={60}
              paddingLeft={10}
              backgroundColor="transparent" 
              pressStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
              onPress={() => setSortModalVisible(true)}
              ></Button>
            <Tabs.List
              disablePassBorderRadius
              loop={false}
              marginVertical={20}
              backgroundColor="transparent"
              alignItems='center'
            >
            <AnimatePresence>
            {intentAt && (
              <TabsRovingIndicator
                borderRadius={4}
                theme="accent"
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
                theme="accent"
                width={activeAt.width}
                height={activeAt.height}
                x={activeAt.x}
                y={activeAt.y}
              />
            )}
            </AnimatePresence>
              <StyledTab
                value="phone"
                height={40}
                width={100}
                unstyled
                justifyContent='center'
                alignItems='center'
                borderColor={selectionMode ? "grey" : "$accent4"}
                backgroundColor={selectionMode ? "grey" : "transparent"}
                borderWidth={2}
                active={currentTab !== "phone" /* This is breaking the background tab, this is intended */} 
                borderTopLeftRadius={4}
                borderBottomLeftRadius={4}
                onInteraction={handleOnInteraction}
                disabled={selectionMode ? true : false}
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
                borderColor={selectionMode ? "grey" : "$accent4"} 
                backgroundColor={selectionMode ? "grey" : "transparent"}
                borderWidth={2}
                active={currentTab !== "device"}
                borderTopRightRadius={4}
                borderBottomRightRadius={4}
                onInteraction={handleOnInteraction}
                disabled={selectionMode ? true : false}
              >
                <SizableText 
                  fontWeight={currentTab !== "device" ? 500 : 600}
                >Device</SizableText>
              </StyledTab>
        
            </Tabs.List>
            <Button 
            backgroundColor="transparent" 
            color="$accent4"
            pressStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
            onPress={toggleSelectionMode}
            width={60}
            > 
              {selectionMode ? <X size={25} /> : <Text fontSize={15} color="$accent1" paddingRight={10}>Select</Text>} 
            </Button>
          </XStack>
          </YStack>
          <Separator />
    
          <Tabs.Content value="phone" backgroundColor="$color1" borderColor="$color1" height={"100%"}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 120, // Add extra padding at the bottom for the tab bar
              }}>
                <YStack margin={20}>
                    {/*This is the ListItem for the Mobile tab*/}
                    {logs?.map((log: any, index: number) => (
                      <ListItem
                        key={log.session_id ?? index}
                        hoverTheme
                        pressTheme
                        title={log.title ?? `Log ${index + 1}`}
                        subTitle={log.description ?? `Log ${index + 1} description`}
                        icon={ selectionMode ? (            
                          <Checkbox 
                            id={"checkbox-"+log.session_id} 
                            size="$xl3"
                            backgroundColor="$background"
                            borderRadius={16}
                            borderColor="$color9"
                            borderWidth={2}
                          >
                            <Checkbox.Indicator > 
                              <CheckIcon color="$color9" />
                            </Checkbox.Indicator>
                          </Checkbox>) : FileText}
                        iconAfter={<ChevronRight color="$color9"></ChevronRight>}
                        color="$color7"
                        scaleIcon={1.7}
                        padding={10}
                        size={16}
                        borderWidth={0}
                        borderBottomWidth={1}
                        borderColor="$color6"
                        backgroundColor="$color1"
                        onPress={() => navigateToLog(log.session_id?.toString() ?? `${index + 1}`)}
                      />
                    ))}
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
      {selectionMode && <ToolBar />}
      <SortModal/>
      {/*<ToastViewport></ToastViewport>*/}
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
        title={data[index].fileName}
        subTitle={data[index].fileName}
        icon={FileText}
        iconAfter={<Download color="$color9"></Download>}
        color="$color7"
        scaleIcon={1.7}
        padding={10}
        size={16}
        borderWidth={0}
        borderBottomWidth={1}
        borderColor="$color6"
        backgroundColor="$color1"
        onPress={() => null /* TODO: Implement Download action, remember to take in account that there can be a selection of logs to download, see Figma prototype for more information */}
      ></ListItem>
    )
  }

  return logList;

}

/**
 * * DownloadConfirmationModal component
 * * This component is a modal that appears when the user tries to download logs from the device. This modal
 *  can be modified to pass the confirmation text as argument and be reused in other parts of the app that require a confirmation modal. 
 */

interface DownloadConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  setSortModalVisible: (visible: boolean) => void;
  setDownloadConfirmVisible: (visible: boolean) => void;
}
// TODO Complete and test after database is working
const DownloadConfirmationModal: React.FC<DownloadConfirmationModalProps> = ({
  visible,
  onClose,
  isDarkMode,
  setSortModalVisible,
  setDownloadConfirmVisible,
}) => {
  return (
  <Modal
    visible={visible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}
    style={{ backgroundColor: isDarkMode ? "$color1" : "white" }}
  >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      backgroundColor="rgba(0, 0, 0, 0.5)" // Semi-transparent background
    >
      <View borderWidth={isDarkMode ? 1 : 0} borderColor={ isDarkMode ? "$color5" : "white"}  style={{ width: 250, height: 300, backgroundColor: isDarkMode ? "$color1" : "white", borderRadius: 10 }}>
        
        <View style={{ flex: 1 }}>
          <Text>Do you want to <Text fontWeight={600}>download</Text> these items?</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }} flexDirection='row'>        
            <Button 
              padding={20} 
              width={"50%"}
              backgroundColor={ isDarkMode ? "$color1" : "white"} 
              onPress={() => setDownloadConfirmVisible(false)}
              borderStartEndRadius={10}
              borderColor="$accent2"
              borderWidth={0}
              borderTopWidth={1}
              pressStyle={{ backgroundColor: "$color3", borderWidth: 0 }}
              >
                <Text fontSize={18} color="$accent2">Cancel</Text>
            </Button>

            <Button 
              padding={20} 
              width={"50%"}
              backgroundColor="$accent2"
              onPress={() => {
                setDownloadConfirmVisible(false)
                // Add Toastwith message depending on the state if the download was successful or not
                /* Here is an example
                  toast.show('Successfully downloaded!', {
                    message: "Data is installed in device",
                    true, // This is required for React Native
                  })
                */
              }}
              borderEndEndRadius={10}
              pressStyle={{ backgroundColor: "$accent1", borderWidth: 0 }}
              >
                <Text fontSize={18} color="white">Confirm</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  </Modal>
  );
}
// TODO Complete and test after database is working
const DisplayToast: React.FC = () => {
  const currentToast = useToastState()
  if (!currentToast) return null
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  );
}


const styles = StyleSheet.create({
  noDeviceText: {
    fontSize: 24,
    color: "grey", 
  }
});
