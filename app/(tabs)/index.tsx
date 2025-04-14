// React imports 
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Tamagui imports
import type { TabLayout, TabsContentProps, TabsTabProps } from 'tamagui';
import { View, ListItem, YStack, YGroup } from 'tamagui';
import { Button, H5, Separator, SizableText, Tabs, styled } from 'tamagui';
import { FileText, ChevronRight} from '@tamagui/lucide-icons';




export default function LogsList() {
  const [active, setActive] = React.useState('local');
  const insets = useSafeAreaInsets();


  return (
    <View style={{  
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: insets.left + insets.right,
        flex: 1
      }}>
      <YStack>
        <Tabs
          value={active}
          onValueChange={setActive}
          defaultValue="local"
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
              value="local"
              height={50}
              backgroundColor={active === 'local' ? '$color4' : '$color4'}
            >
              <SizableText >Local</SizableText>
            </Tabs.Tab>
            <Tabs.Tab
              flex={1}
              value="host"
              height={50}    
              backgroundColor={active !== 'local' ? '$color4' : '$color4'}
              
            >
              <SizableText >Host</SizableText>
            </Tabs.Tab>
          </Tabs.List>
          <Separator />
          <Tabs.Content value="local">
            <YStack margin={20}>
                <ListItem
                    hoverTheme
                    pressTheme
                    title="Log 1"
                    subTitle="Log 1 description"
                    icon={FileText}
                    iconAfter={ChevronRight}
                    size="$lg"
                    padding={10}
                    marginVertical={10}
                    borderWidth={0}
                    borderBottomWidth={1}
                  ></ListItem>
  
                <ListItem
                  hoverTheme
                  pressTheme
                  title="Log 2"
                  subTitle="Log 2 description"
                  icon={FileText}
                  iconAfter={ChevronRight}
                  size="$lg"
                  padding={10}
                  marginVertical={10}
                  borderWidth={0}
                  borderBottomWidth={1}
                ></ListItem>

                <ListItem
                  hoverTheme
                  pressTheme
                  title="Log 3"
                  subTitle="Log 3 description"
                  icon={FileText}
                  iconAfter={ChevronRight}
                  size="$lg"
                  padding={10}
                  marginVertical={10}
                  borderWidth={0}
                  borderBottomWidth={1}
                ></ListItem>
          </YStack>  
          </Tabs.Content>

          <Tabs.Content value="host">
            <H5>Device Logs</H5>
          </Tabs.Content>
        </Tabs>
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({

});
