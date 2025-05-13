// Expo and React imports 
import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Platform, Modal, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
// Tamagui imports
import { ListItem, useListItem, TabLayout, TabsTabProps, StackProps, Button, Text, H4 } from 'tamagui';
import { View, YStack, XStack, ScrollView} from 'tamagui';
//import { Toast, useToastController, useToastState, ToastViewport } from '@tamagui/toast'
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
import { deleteMultipleSessions, getAllSession, updateSession } from '@/database/db';
import { Session } from '@/models/session';

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
  const [logs, setLogs] = useState<Session[]>([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  
  const [logToRename, setLogToRename] = useState<number | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [newSessionName, setNewSessionName] = useState<string>('');
  const { bottom } = useSafeAreaInsets();
  const {
    data,
    loading,
    error,
    connectionStatus: status,
  } = useESP32Data();

  useEffect(() => {
  if (toastVisible) {
    const timer = setTimeout(() => setToastVisible(false), 3000); // Hide after 3 seconds
    return () => clearTimeout(timer); // Cleanup the timer
  }
}, [toastVisible]);
  useEffect(() => {
    // Logs is equivalent
    async function loadLogs(){
      try {
        const logsRequest = await getAllSession(db);
        const logsData = JSON.parse(logsRequest);
        
        // Convert each plain object to a Session instance
        const sessionInstances = logsData.map((logData: any) => new Session(
          logData.timestamp_start,
          logData.timestamp_end,
          logData.location,
          logData.device_id,
          logData.session_id,
          logData.session_name
        ));

        setLogs(sessionInstances);
        //console.log("Loading logs from local database", logs, logsRequest, logsData);
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
  const [sortOrder, setSortOrder] = useState<'new-old' | 'old-new'>('new-old');
  const [downloadConfirmVisible, setDownloadConfirmVisible] = useState(false);
  const { selectionMode, selectedLogs, toggleSelectionMode, toggleLogSelection } = useSelectionMode();
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

  const navigateToLog = (id: string | number) => {
    const stringId = String(id);
    navigation.navigate('log/[id]', { id: stringId });
  }
  const sortedDeviceData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      const aTime = new Date(a.timestamp).getTime();
      const bTime = new Date(b.timestamp).getTime();
      return sortOrder === 'new-old' ? bTime - aTime : aTime - bTime;
    });
  }, [data, sortOrder]);

  const SortModal: React.FC = () => {
    const [localSortOrder, setLocalSortOrder] = useState<'new-old' | 'old-new'>(sortOrder);

    const handleApplySort = () => {
      // Only update the parent state when Apply is clicked
      setSortOrder(localSortOrder);
      setSortModalVisible(false);
    };

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

              <RadioGroup 
                aria-labelledby="Select one order"
                defaultValue={localSortOrder}
                name="form" 
                value={localSortOrder}
                onValueChange={(val) => setLocalSortOrder(val as 'new-old' | 'old-new')}>
                <YStack alignItems="center" justifyContent='space-evenly' height={100} padding={10}>
                  <XStack alignItems="center">
                    <RadioGroup.Item 
                      value="new-old" 
                      id="new-old-radio-item" 
                      size="$xl2">
                      <RadioGroup.Indicator scale={1.3} />
                    </RadioGroup.Item>

                    <Label fontSize={18} paddingHorizontal={10}>
                      New to oldest 
                    </Label>
                  </XStack>

                   <XStack alignItems="center">
                    <RadioGroup.Item 
                      value="old-new" 
                      id="old-new-radio-item" 
                      size="$xl2">
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
                  height={65}
                  backgroundColor={ isDarkMode ? "$color1" : "white"} 
                  onPress={() => setSortModalVisible(false)}
                  borderStartEndRadius={10}
                  borderColor="$accent2"
                  borderTopEndRadius={0}
                  borderTopStartRadius={0}
                  borderEndEndRadius={0}
                  borderWidth={0}
                  
                  borderTopWidth={1}
                  pressStyle={{ backgroundColor: "$color3", borderWidth: 0 }}
                  >
                    <Text fontSize={18} color="$accent2">Close</Text>
                </Button>

                <Button 
                  padding={20} 
                  width={"50%"}
                  height={65}
                  backgroundColor="$accent2"
                  borderTopEndRadius={0}
                  borderEndStartRadius={0}
                  borderStartEndRadius={0}
                  borderStartStartRadius={0}
                  onPress={handleApplySort}
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
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        // Select all
        const allLogIds = logs.map((log: any) => log);
        toggleLogSelection(allLogIds);
      } else {
        // Deselect all
        toggleLogSelection([]);
      }
    };

    const handleDelete = () => {
      setDeleteConfirmVisible(true);
    };

    const handleDownload = () => {
      // Logic to download selected logs
      setToastVisible(true);
    
    };    
    
    const handleRename = () => {
      if (selectedLogs.length === 1) {
        const logToEdit = selectedLogs[0];
        // Extract the session_id from the Session object
        const sessionId = logToEdit.session_id;
        if(sessionId){
          setLogToRename(sessionId);
          setNewSessionName(logToEdit.session_name);
        }

        setRenameModalVisible(true);
      }
    };

    const allSelected = logs.length > 0 && selectedLogs.length === logs.length;

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
            justifyContent='space-evenly'        
            opacity={logs.length === 0 ? 0.5 : 1}>
            <Checkbox 
              id={"checkbox-all"} 
              size="$xl2"
              borderRadius={16}
              borderColor="$color9"
              backgroundColor={allSelected ? "$color9" : "transparen  t"}
              borderWidth={logs.length === 0 ? 0.5 : 2}
              disabled={logs.length === 0}
              checked={allSelected}
              onCheckedChange={handleSelectAll}
            >
              <Checkbox.Indicator> 
                <CheckIcon color="$white" />
              </Checkbox.Indicator>
            </Checkbox>
            <Text color="$color9" fontSize={12}>
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
              <View alignItems='center'>
                <Trash2 size={20} color="$color9" />
                <Text color="$color9" fontSize={12} paddingTop={4}>
                  Delete
                </Text>
              </View>
        
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
              disabled={selectedLogs.length === 0 && selectedElements.length > 0 || currentTab !== "device"}
              opacity={selectedLogs.length === 0 || currentTab !== "device" ? 0.5 : 1}
              pressStyle={{ opacity: 0.7 }}
            >
              <View alignItems='center'>
                <Download size={20} color="$color9" />
                <Text color="$color9" fontSize={12} paddingTop={4} >
                  Download
                </Text>
              </View>
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
              <View alignItems='center'>
                <Edit3 size={20} color="$color9" />
                <Text color="$color9" fontSize={12} paddingTop={4}>
                  Rename
                </Text>
              </View>
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
            justifyContent='space-evenly' 
            alignItems='center'>
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
              disabled={selectionMode}
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
            height={40}
            padding={0}
            margin={0}
            > 
              {selectionMode ? <X size={25} /> : <Text fontSize={15} color="$accent1" padding={0} margin={0}>Select</Text>} 
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
                    {logs && logs.length > 0 ? (logs?.map((log: any, index: number) => { 
                      
                      const isSelected = selectedLogs.includes(log);
  
                      return (
                      <ListItem
                        key={log.session_id ?? index}
                        hoverTheme
                        pressTheme
                        title={log.session_name}
                        subTitle={log.timestamp_end ?? `Log ${index + 1} description`}
                        icon={ selectionMode ? (            
                          <Checkbox 
                            id={"checkbox-"+log.session_id} 
                            size="$xl4"
                            backgroundColor={isSelected ? "$color9" : "transparent"}
                            borderRadius={16}
                            borderColor="$color9"
                            borderWidth={2}
                            checked={isSelected}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                const updatedSelection = [...selectedLogs, log];
                                toggleLogSelection(updatedSelection);
                              } else {
                                const updatedSelection = selectedLogs.filter(logL => logL !== log);
                                toggleLogSelection(updatedSelection);
                              }
                           
                            }}
                          >
                            <Checkbox.Indicator>
                              <CheckIcon color="white" />
                            </Checkbox.Indicator>
                          </Checkbox>) : <FileText></FileText>}
                        iconAfter={<ChevronRight color="$color9"></ChevronRight>}
                        color="$color7"
                        scaleIcon={1.7}
                        padding={10}
                        size={16}
                        borderWidth={0}
                        borderBottomWidth={1}
                        borderColor="$color6"
                        backgroundColor="$color1"
                        onPress={() => {
                          if (!selectionMode)
                            navigateToLog(log.session_id)
                        }}
                      />
                    )})
                  ) : (
                    <View
                      height={500}
                      width="100%"
                      position="relative"
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Text
                        style={styles.noDeviceText}
                      >
                        No logs downloaded
                      </Text>
                    </View>
                    )}
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
                <DisplayDeviceData data={sortedDeviceData} error={error} status={status} />
              </YStack>
            </ScrollView>
          </Tabs.Content>
       
        
        </Tabs>
      </YStack>
      {selectionMode && <ToolBar />}
      <SortModal/>
      <Modal
        visible={renameModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRenameModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: isDarkMode ? colorScheme.color1?.get() : 'white',
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Rename Log</Text>
            <TextInput
              value={newSessionName}
              onChangeText={(text) => setNewSessionName(text)}
              placeholder="Enter new session name"
              style={{
                borderWidth: 1,
                borderColor: isDarkMode ? colorScheme.color5?.get() : 'gray',
                borderRadius: 5,
                padding: 10,
                marginBottom: 20,
              }}
            />
            <XStack justifyContent="space-between">
              <Button
                padding={20}
                width="50%"
                height={65}
                backgroundColor={isDarkMode ? "$color1" : "white"}
                marginRight={1}
                borderColor="$accent2"
                borderWidth={1}
                borderTopWidth={1}
                pressStyle={{ backgroundColor: "$color3", borderWidth: 0 }}
                onPress={() => setRenameModalVisible(false)}
              >
                <Text fontSize={18} color="$accent1">Cancel</Text>
              </Button>
              <Button
              padding={20}
            width="50%"
            height={65}
            backgroundColor="$accent2"
            borderTopEndRadius={0}
            borderEndStartRadius={0}
            borderStartEndRadius={0}
            borderStartStartRadius={0}
            borderEndEndRadius={10}
            pressStyle={{ backgroundColor: "$color1", borderWidth: 0 }}            onPress={async () => {
              if (logToRename) {
                try {
                  // Update in the database
                  await updateSession(db, logToRename, {
                    session_name: newSessionName
                  });
                  
                  // Update in local state
                const updatedLogs = logs.map((log) => {
                if (log.session_id === logToRename) {
                  return new Session(
                    log.timestamp_start,
                    log.timestamp_end,
                    log.location,
                    log.device_id,
                    log.session_id,
                    newSessionName
                  );
                }
                  return log;
                });

                  setLogs(updatedLogs); // Update the logs state
                  setRenameModalVisible(false); // Close the modal
                  toggleLogSelection([]); // Clear selection
                  setToastVisible(true); // Show success message
                } catch (error) {
                  console.error("Error updating session:", error);
                  // Could show an error toast here
                }
              }
            }}
          >
                <Text fontSize={18} color="white">Save</Text>
              </Button>
            </XStack>
          </View>
        </View>
      </Modal>

      <DeleteConfirmationModal
        visible={deleteConfirmVisible}
        onClose={() => setDeleteConfirmVisible(false)}
        isDarkMode={isDarkMode}
        setSortModalVisible={setSortModalVisible}
        setDeleteConfirmVisible={setDeleteConfirmVisible}
        onConfirm={async () => {
          try {
          
            const sessionIds = selectedLogs.map(log => log.session_id);
            
        
            const result = await deleteMultipleSessions(db, sessionIds.filter((id): id is number => id !== null));
            
            // If successful, update the UI
            if (result.success) {
              // Remove deleted logs from the local state
              const remainingLogs = logs.filter(log => !sessionIds.includes(log.session_id));
              setLogs(remainingLogs);
              
              toggleSelectionMode();
              setToastVisible(true);

              console.log(`Successfully deleted ${result.sessionsDeleted} sessions and ${result.sensorReadingsDeleted} readings`);
            }
          } catch (error) {
            console.error('Failed to delete sessions:', error);
          } finally {
            // Always close the modal
            setDeleteConfirmVisible(false);
          }


        }}
      />

      {/*<ToastViewport></ToastViewport>*/}      
      {toastVisible && (
      <View
        style={{
          position: 'absolute',
          bottom: 125,
          left: '50%',
          transform: [{ translateX: -150 }],
          width: 300,
          padding: 10,
          borderRadius: 10,
          alignItems: 'center',
        }}
        backgroundColor={isDarkMode ? "$color3" : '$accent1'}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Action completed successfully!</Text>
      </View>
    )}
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
  const { selectionMode } = useSelectionMode();
  
  // Ensure proper connection status handling
  if (!status || status !== 'connected') {
    return (
      <View
        height={500}
        width="100%"
        position="relative" // This is to make the text centered in the screen
        justifyContent='center'
        alignItems='center'
      >
        <Text style={styles.noDeviceText}>
          {status === 'error' ? 'Connection error' : 'Device not connected'}
        </Text>
        {error && (
          <Text fontSize={14} color="$color8" paddingTop={10}>
            {error.message || 'Check your device and try again'}
          </Text>
        )}
      </View>
    );
  }

  // Verify that data is valid and properly structured
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <View
        height={500}
        width="100%"
        position="relative"
        justifyContent='center'
        alignItems='center'
      >
        <Text style={styles.noDeviceText}>
          No logs in device
        </Text>
      </View>
    );
  }

  // Safe data mapping with React.Fragment as container
  return (
    <React.Fragment>
      {data.map((item, index) => {
        // Safely access properties with fallbacks
        const fileName = item?.name || item?.fileName || `Log ${index + 1}`;
        const fileDate = item?.date || 'No date information';
        
        return (
          <ListItem
            key={`device-log-${index}`}
            hoverTheme
            pressTheme
            title={fileName}
            subTitle={fileDate}
            icon={ selectionMode ? (            
                <Checkbox 
                  id={`checkbox-${index}`}
                  size="$xl3"
                  backgroundColor="$background"
                  borderRadius={16}
                  borderColor="$color9"
                  borderWidth={2}
                >
                  <Checkbox.Indicator>
                    <CheckIcon color="$color9" />
                  </Checkbox.Indicator>
                </Checkbox>
              ) : <FileText></FileText>}
            iconAfter={
              <Download color="$color9" />
            }
            color="$color7"
            scaleIcon={1.7}
            padding={10}
            size={16}
            borderWidth={0}
            borderBottomWidth={1}
            borderColor="$color6"
            backgroundColor="$color1"
            onPress={() => {
              // Handle download action
              if (!selectionMode) {
                console.log(`Downloading file: ${fileName}`);
                // Implement download logic here
              }
            }}
          />
        );
      })}
    </React.Fragment>
  );
};

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

interface DeleteConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  setSortModalVisible: (visible: boolean) => void;
  setDeleteConfirmVisible: (visible: boolean) => void;
  onConfirm: () => void; // Add this new prop
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onClose,
  isDarkMode,
  setSortModalVisible,
  setDeleteConfirmVisible,
  onConfirm, // Add this parameter
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
      <View borderWidth={isDarkMode ? 1 : 0} borderColor={ isDarkMode ? "$color5" : "white"}  
        style={{ 
          width: 250, 
          backgroundColor: isDarkMode ? "$color1" : "white", 
          borderRadius: 10 }}>
        
        <Text padding={20} fontSize={18}>Do you want to <Text fontWeight={600}>delete</Text> the selected items?</Text>
        <View style={{ alignItems: 'flex-end' }} flexDirection='row'>        
          <Button 
           
            padding={20} 
            width={"50%"}
            height={65}
            backgroundColor={ isDarkMode ? "$color1" : "white"} 
            borderStartEndRadius={10}
            borderColor="$accent2"
            borderTopEndRadius={0}
            borderTopStartRadius={0}
            borderEndEndRadius={0}
            borderWidth={0}
            borderTopWidth={1}
            pressStyle={{ backgroundColor: "$color3", borderWidth: 0 }}
            onPress={() => setDeleteConfirmVisible(false)}
            >
              <Text fontSize={18} color="$accent2">Cancel</Text>
          </Button>

          <Button 
            padding={20} 
            width={"50%"}
            height={65}
            backgroundColor="$accent2"
            borderTopEndRadius={0}
            borderEndStartRadius={0}
            borderStartEndRadius={0}
            borderStartStartRadius={0}
            borderEndEndRadius={10}
            pressStyle={{ backgroundColor: "$accent1", borderWidth: 0 }}
            onPress={() => {
              setDeleteConfirmVisible(false);
              onConfirm(); // Call the onConfirm callback to perform the deletion
            }}
            >
              <Text fontSize={18} color="white">Confirm</Text>
          </Button>
        </View>
      </View>
    </View>
  </Modal>
  );
}

// TODO Complete and test after database is working
// const DisplayToast: React.FC = () => {
//   const currentToast = useToastState()
//   if (!currentToast) return null
//   return (
//     <Toast
//       key={currentToast.id}
//       duration={currentToast.duration}
//       enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
//       exitStyle={{ opacity: 0, scale: 1, y: -20 }}
//       y={0}
//       opacity={1}
//       scale={1}
//       animation="fast"
//       viewportName={currentToast.viewportName}
//     >
//       <YStack>
//         <Toast.Title>{currentToast.title}</Toast.Title>
//         {!!currentToast.message && (
//           <Toast.Description>{currentToast.message}</Toast.Description>
//         )}
//       </YStack>
//     </Toast>
//   );
// }


const styles = StyleSheet.create({
  noDeviceText: {
    fontSize: 24,
    color: "grey", 
  }
});
