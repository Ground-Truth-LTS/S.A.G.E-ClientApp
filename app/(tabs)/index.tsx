// React imports 
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Tamagui imports
import { View, ListItem, YStack, useListItem, ScrollView } from 'tamagui';
import { Button, H5, Separator, SizableText, Tabs, styled } from 'tamagui';
import { FileText, ChevronRight, Download} from '@tamagui/lucide-icons';  
import { useNavigation } from 'expo-router';



export default function LogsList() {
  const [active, setActive] = React.useState('phone');
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

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
          value={active}
          onValueChange={setActive}
          defaultValue="phone"
          orientation="horizontal"
          flexDirection="column"
          width="100%"
          height="100%"
          borderRadius={4}
          borderWidth={0.25}
          borderBlockWidth={0}
          overflow="hidden"
        >
          <Tabs.List
            separator={<Separator vertical />}
            disablePassBorderRadius="bottom"
            aria-label="Manage your account"
          >
            <Tabs.Tab
              flex={1}
              value="phone"
              height={50}
              backgroundColor={active === 'phone' ? '$color4' : '$color4'}
            >
              <SizableText >Phone</SizableText>
            </Tabs.Tab>
            <Tabs.Tab
              flex={1}
              value="device"
              height={50}    
              backgroundColor={active !== 'phone' ? '$color4' : '$color4'}
              
            >
              <SizableText >Device</SizableText>
            </Tabs.Tab>
          </Tabs.List>
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

          <Tabs.Content value="device" backgroundColor="$color1" height={"100%"}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 120, // Add extra padding at the bottom for the tab bar
              }}>
              <YStack margin={20}>
                {/*This is the ListItem for the Device tab*/}
                <ListItem
                  hoverTheme
                  pressTheme
                  title="Log 1"
                  subTitle="Log 1 description"
                  icon={FileText}
                  iconAfter={Download}
                  color="$color9"
                  scaleIcon={1.7}
                  padding={10}
                  size={16}
                  borderWidth={0}
                  borderBottomWidth={3}
                  backgroundColor="$color1"
                ></ListItem>
                
              </YStack>
            </ScrollView>
          </Tabs.Content>
        </Tabs>
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({

});
