// React imports 
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native';
// Tamagui imports
import type { TabsContentProps } from 'tamagui';
import { View, Image, YStack } from 'tamagui';
import { Button, H5, Separator, SizableText, Tabs } from 'tamagui';


export default function LogsList() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack>
        <Tabs
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
            >
              <SizableText >Local</SizableText>
            </Tabs.Tab>
            <Tabs.Tab
              flex={1}
              value="host"
              height={50}
            >
              <SizableText >Host</SizableText>
            </Tabs.Tab>
          </Tabs.List>
          <Separator />
          <Tabs.Content value="local">
            <H5>List of Downloaded Logs</H5>
            <Button
              width={
                40
              }
              height={40}
          >dasd</Button>
          </Tabs.Content>

          <Tabs.Content value="host">
            <H5>Device Logs</H5>
          </Tabs.Content>
        </Tabs>
      </YStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
