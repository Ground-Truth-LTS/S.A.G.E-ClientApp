import { Text, YStack, XStack, ScrollView, Dialog, Button, Separator } from 'tamagui';
import { X } from '@tamagui/lucide-icons';


export default function Instructions() {

    return (
      <Dialog.Content
      bordered
      elevate
      key="content"
      animateOnly={['transform', 'opacity']}
      animation={[
        'slow',
        {
          opacity: {
            overshootClamping: true,
          },
        },
      ]}
      enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
      exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
      gap={4}
      width="90%"
      maxWidth={500}
    >
      <Dialog.Title fontSize={20}>Instructions</Dialog.Title>
      <Dialog.Description fontSize={14} color="$color10" marginBottom={5}>
        Last updated: April 18, 2025
      </Dialog.Description>
      
      <ScrollView height={400} showsVerticalScrollIndicator={true} paddingRight={10}>
        <YStack gap={12} paddingTop={10}>
          
        </YStack>
      </ScrollView>
      <Separator paddingVertical={3}/>
      <XStack alignSelf="flex-end" gap={4}>
       
        <Dialog.Close padding={10} marginBottom={20} marginTop={4} displayWhenAdapted asChild>
          <Button backgroundColor="$accent1" borderRadius="$md" aria-label="Close" icon={X}>
            Close 
          </Button>
        </Dialog.Close>
      </XStack>
  
    </Dialog.Content>
    );
}