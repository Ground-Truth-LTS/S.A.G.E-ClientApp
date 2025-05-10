// Tamagui imports
import { View, Text, Switch, YStack, TextArea, ListItem, ScrollView, Dialog, Button, Sheet, Adapt, Input, H4, H3, H5 } from 'tamagui';
import { ChevronRight} from '@tamagui/lucide-icons';
// React imports 
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { memo, useEffect, useState } from 'react';

// Custom imports
import { useTheme } from '../../context/ThemeProvider';
import PrivacyPolicy from '../content/privacypolicy';
import Instructions from '../content/instructions';

//import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
  const {isDarkMode, toggleTheme} = useTheme();
  const [updatesSwitchOn, setUpdatesSwitchOn] = useState(false);
  const [notificationSwitchOn, setNotificationSwitchOn] = useState(false);
  const [statisticsSwitchOn, setStatisticsSwitchOn] = useState(false);

  // Use for the Feedback sheet
  const [open, setOpen] = useState(false);

  const insets = useSafeAreaInsets();

  // Load theme preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      //const theme = await AsyncStorage.getItem('theme');
      //setIsDarkMode(theme === 'dark');
    };
    loadTheme();
  }, []);

  return (
  
    <ScrollView height="100%" 
      backgroundColor="$color1" 
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: insets.left + insets.right,
        flex: 1
      }}
      contentContainerStyle={{
        paddingBottom: 110, // Add extra padding at the bottom for the tab bar
      }}
    >    
    <View
      backgroundColor="$color1" 
      style={[styles.titleContainer]}
      >
      <Text fontSize={20} backgroundColor="$color1">Settings</Text>
      {/* This is the bottom shadow element */}
      <View style={styles.bottomShadow} pointerEvents="none" />
    </View>
  
    
      <YStack 
        flex={1} 
        backgroundColor="$color1" 
        height="100%"
        paddingHorizontal={24}
        paddingTop={24}
      >    
  
        <ListItem
    
          title="Share Statistics"
          subTitle="Your data will be used to create analytics and better the systems accuracy."
          iconAfter={
            <Switch 
            size="$xl"  
            defaultChecked={false} 
            backgroundColor={statisticsSwitchOn ? "$accent4" : "$color5"}
            onCheckedChange={ (toogle) => {
              setStatisticsSwitchOn(toogle);
            }}> 
                  <Switch.Thumb backgroundColor="white"  />
          </Switch> 
          }
          borderBottomWidth={1}
          borderColor="$color6"
          padding={24}
          scaleIcon={1.5}
          backgroundColor="$color1"
        ></ListItem>    

        <ListItem
        title=""

          iconAfter={
            <Switch 
            size="$xl"  
            defaultChecked={isDarkMode} 
            backgroundColor={isDarkMode ? "$accent4" : "$color5"}
            onCheckedChange={ () => {
              toggleTheme();
            }}> 
              <Switch.Thumb backgroundColor="white"  />
          </Switch> 
          }
          borderBottomWidth={1.1}
          borderColor="$color6"
          padding={24}
          scaleIcon={1.5}
          backgroundColor="$color1"
        >Dark Mode</ListItem>    

        <ListItem
          title="Notifications"
          subTitle="Let us notify you recent download time."
          iconAfter={
            <Switch 
            size="$xl"  
            defaultChecked={false} 
            backgroundColor={notificationSwitchOn ? "$accent4" : "$color5"}
            onCheckedChange={ (toogle) => {
              setNotificationSwitchOn(toogle);
            }}> 
                  <Switch.Thumb backgroundColor="white"  />
          </Switch> 
          }
          borderBottomWidth={1}
          padding={24}
          scaleIcon={1.5}
          backgroundColor="$color1"
        ></ListItem>    

        {/*
        <ListItem
          title="Automatic Updates"
          subTitle="Permissions for available updates to be automatic."
          iconAfter={              
          <Switch 
            size="$xl"  
            defaultChecked={false} 
            pressStyle={{backgroundColor: "$accent4"}}
            backgroundColor={updatesSwitchOn ? "$accent4" : "$color5"}
            onCheckedChange={ (toogle) => {
              setUpdatesSwitchOn(toogle);
            }}> 
              <Switch.Thumb backgroundColor="white" />
          </Switch>
          }
          borderBottomWidth={1}
          padding={24}
          scaleIcon={1.5}
          backgroundColor="$color1"
        ></ListItem>    
        */}
    



        <ListItem
          hoverTheme
          pressTheme
          title="Submit Feedback"
          subTitle="Your data will be used to create analytics and better the systems accuracy."
          iconAfter={ChevronRight}
          color="$accent1"
          borderBottomWidth={1}
          padding={24}
          scaleIcon={1.5}
          backgroundColor="$color1"
          onPress={() => setOpen(true)}
        ></ListItem>    

        <SubmitFeedbackSheet open={open} setOpen={setOpen}/>

 
        <Dialog modal>
          <Dialog.Trigger asChild>     
          <ListItem
              hoverTheme
              pressTheme
              title="Connect to device"
              subTitle="How to connect to Device PDF."
              iconAfter={ChevronRight}
              color="$accent1"
              borderBottomWidth={1}
              padding={24}
              scaleIcon={1.5}
              backgroundColor="$color1"
            ></ListItem>    

          </Dialog.Trigger>
          
          <Adapt when="sm" platform="touch">
            <Sheet animation="medium" disableDrag zIndex={200000} modal dismissOnSnapToBottom>
              <Sheet.Frame  padding={8} gap={4}>
                <Adapt.Contents />
              </Sheet.Frame>
              <Sheet.Overlay   
                backgroundColor="$shadow6"
                animation="slow"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>
          
          <Dialog.Portal>
            <Dialog.Overlay
              
              key="overlay"
              backgroundColor="$shadow6"
              animation="slow"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />          
            <Instructions/>
          </Dialog.Portal>
        </Dialog>


        <Dialog modal>
          <Dialog.Trigger asChild>     
            <ListItem
              hoverTheme
              pressTheme
              title="Privacy Policy"
              subTitle="See terms and Privacy Policy."
              iconAfter={ChevronRight}
              color="$accent1"
              borderBottomWidth={1}
              padding={24}
              scaleIcon={1.5}
              backgroundColor="$color1"
            ></ListItem>
          </Dialog.Trigger>
          
          <Adapt when="sm" platform="touch">
            <Sheet animation="medium" disableDrag zIndex={200000} modal dismissOnSnapToBottom>
              <Sheet.Frame  padding={8} gap={4}>
                <Adapt.Contents />
              </Sheet.Frame>
              <Sheet.Overlay   
                backgroundColor="$shadow6"
                animation="slow"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>
          
          <Dialog.Portal>
            <Dialog.Overlay
              
              key="overlay"
              backgroundColor="$shadow6"
              animation="slow"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />          
            <PrivacyPolicy/>
          </Dialog.Portal>
        </Dialog>

        <View 
          width="100%" 
          alignItems='center' 
          justifyContent='center'
          paddingVertical={20}
          style={[{backgroundColor: "$color1"}]}>
          <Text style={[styles.subtitles]}>version 0.0.1</Text>
        </View>
        
      </YStack>

    </ScrollView>

  );
}


function SubmitFeedbackSheet({open, setOpen} :  { open: boolean, setOpen: (open: boolean) => void }) {

  const [position, setPosition] = useState(0);

  const snapPoints = [85, 50, 25];
 

  return (
      <Sheet
        forceRemoveScrollEnabled={open}
        modal={true}
        open={open}
        onOpenChange={setOpen}
        snapPoints={snapPoints}
        snapPointsMode='percent'
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium"
        disableDrag={true}
      >
        <Sheet.Overlay
          animation="slow"
          backgroundColor="$shadow6"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          
        />
        <Sheet.Frame padding={10} gap={5}>
          <SubmitFeedbackContent {...{ setOpen }} />
        </Sheet.Frame>
      </Sheet>
  )
}

const SubmitFeedbackContent = memo(
  ({ setOpen }: any) => {
  return (
    <>
        <H5 
          paddingTop={10}
          paddingBottom={20}
          paddingHorizontal={10}>Submit Feedback</H5>
        <View  alignItems='center' justifyContent="center" paddingHorizontal={20}>
          <TextArea 
            width="100%" 
            minHeight={100}
            maxHeight={300}
          /> 
        
        </View>
        <View
          alignItems="flex-end" padding={10}
          justifyContent='flex-end' flexDirection='row'>

            <Button 
              width={100} 
              height={40}
              aria-label="close" 
              borderRadius="$md"
              onPress={() => setOpen(false)}> Close </Button>
                   
            <Button 
              width={100} 
              height={40}
              aria-label="close" 
              borderRadius="$md"
              marginLeft={10}
              backgroundColor={"$accent5"}
              onPress={() => submitFeedBackForm()}> Submit </Button>
        </View>
      </>
    )
  }
);

function submitFeedBackForm() {
  console.log("Feedback submitted!");
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative', // This is needed for positioning the shadow
    paddingBottom: 0,
    paddingTop: 10
  },
  bottomShadow: {
    position: 'absolute',
    bottom: -3,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginVertical: 0,
    marginHorizontal: 0,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#C1C1C1'
  },

  textContainer: {
    flexDirection: 'column',
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  arrow: {
    fontSize: 20,
    padding: 3,
    color: 'green',
  },
  chevron: {
    color: 'red', 
    width: 24,
    height: 24,
  },
  subtitles: {
    fontSize: 10, // Smaller font size for subtitles
    color: '#888888', // Subtle gray color for secondary text
    marginBottom: -8,
  },
  toogleSwitch:{
    backgroundColor: '$color5',
  }
});

