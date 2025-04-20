import { Text, YStack, XStack, ScrollView, Dialog, Button, Separator } from 'tamagui';
import { X } from '@tamagui/lucide-icons';


export default function PrivacyPolicy() {

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
      <Dialog.Title fontSize={20}>S.A.G.E Privacy Policy</Dialog.Title>
      <Dialog.Description fontSize={14} color="$color10" marginBottom={5}>
        Last updated: April 18, 2025
      </Dialog.Description>
      
      <ScrollView height={400} showsVerticalScrollIndicator={true} paddingRight={10}>
        <YStack gap={12} paddingTop={10}>
          <YStack gap={4}>
            <Text fontWeight="bold">1. Introduction</Text>
            <Text fontSize={14}>
              Welcome to the S.A.G.E Autonomous Soil Health Management System ("SAGE", "we", "our", "us").
              Your privacy is important to us. This Privacy Policy describes how we collect, use, disclose, 
              and protect the information you provide when using our mobile and web applications (collectively, the "Service"). 
              By accessing or using SAGE, you agree to the collection and use of information as described in this policy.
            </Text>
          </YStack>
          
          <YStack gap={4}>
            <Text fontWeight="bold">2. Information We Collect</Text>
            <Text fontWeight="500">2.1 Sensor Data:</Text>
            <Text fontSize={14}>
              • Soil parameters (e.g., moisture, temperature, pH, nutrient levels) collected by IoT sensors and transmitted via ESP32.{'\n'}
              • Timestamps and device session identifiers associated with each reading.
            </Text>
            
            <Text fontWeight="500">2.2 Device and Connection Information:</Text>
            <Text fontSize={14}>
              • ESP32 access point identifiers, MAC addresses, and local IP addresses.{'\n'}
              • Logs of connections to the Service (e.g., start/end logging events).
            </Text>
            
            <Text fontWeight="500">2.3 App Usage Data:</Text>
            <Text fontSize={14}>
              • Interaction logs (screens viewed, actions taken).{'\n'}
              • Error and crash reports.
            </Text>
            
            <Text fontWeight="500">2.4 Optional User Information:</Text>
            <Text fontSize={14}>
              • User-provided contact details (e.g., email) for support and account management.{'\n'}
              • Device nicknames or labels assigned in the app.
            </Text>
          </YStack>
  
          <YStack gap={4}>
            <Text fontWeight="bold">3. How We Use Your Information</Text>
            <Text fontSize={14}>
              • Service Provision: To collect, process, and display soil health metrics within the dashboard and internal tool.{'\n'}
              • Performance & Improvement: To monitor app performance, diagnose technical issues, and enhance features.{'\n'}
              • Communications: To respond to support requests and send important Service updates or announcements.{'\n'}
              • Research & Development: To analyze anonymous usage patterns and improve algorithms (data is aggregated and de-identified).
            </Text>
          </YStack>
  
          <YStack gap={4}>
            <Text fontWeight="bold">4. Data Sharing and Disclosure</Text>
            <Text fontSize={14}>
              • Internal Team: Only authorized team members (Emmanuel Gonzalez, Eithan Capella, Bryan Vega) have access to raw sensor and usage data for development and support purposes.{'\n'}
              • Service Providers: We may share data with third-party hosting and analytics providers under confidentiality agreements.{'\n'}
              • Legal Requirements: We may disclose data to comply with legal obligations or protect rights and safety.{'\n'}
              • Business Transfers: In the event of a merger or sale, data may be transferred as part of the transaction (with notice to users).
            </Text>
          </YStack>
  
          <YStack gap={4}>
            <Text fontWeight="bold">5. Data Retention</Text>
            <Text fontSize={14}>
              • Sensor readings and logs are stored on the device's SD card until manually deleted by the user or until storage limits are reached.{'\n'}
              • Usage logs and anonymized analytics data are retained for up to 24 months, unless otherwise required by law.{'\n'}
              • Upon user request, personal contact information will be deleted within 30 days, except where retention is required for legal reasons.
            </Text>
          </YStack>
  
          <YStack gap={4}>
            <Text fontWeight="bold">6. Security</Text>
            <Text fontSize={14}>
              We implement reasonable administrative, technical, and physical safeguards to protect your information, including:{'\n'}
              • Encrypted local web server communications (HTTPS when supported).{'\n'}
              • Secure storage and access controls on the device and within the mobile app.{'\n'}
              • Regular software updates to address vulnerabilities.
            </Text>
          </YStack>
  
          <YStack gap={4}>
            <Text fontWeight="bold">7. Your Rights</Text>
            <Text fontSize={14}>
              • Access & Correction: You can view and update optional contact details and device labels within the app settings.{'\n'}
              • Data Deletion: You may delete sensor logs, usage history, and any personal information at any time via the app interface.{'\n'}
              • Opt-Out: You may opt-out of analytics data collection in app settings.
            </Text>
          </YStack>
  
          <YStack gap={4}>
            <Text fontWeight="bold">8. International Data Transfers</Text>
            <Text fontSize={14}>
              Data may be processed or stored in locations outside your country. We take steps to ensure data protection consistent with this policy.
            </Text>
          </YStack>
  
          <YStack gap={4}>
            <Text fontWeight="bold">9. Changes to This Policy</Text>
            <Text fontSize={14}>
              We may update this Privacy Policy to reflect changes in practices or legal requirements. We will notify users via in-app alerts. The "Last updated" date will be revised accordingly.
            </Text>
          </YStack>
  
          <YStack gap={4} marginBottom={10}>
            <Text fontWeight="bold">10. Contact Us</Text>
            <Text fontSize={14}>
              If you have questions or concerns about this Privacy Policy, please contact us at:{'\n\n'}
              • Emails located at: https://groundtruthlts.xyz/about/{'\n'}
              • Address: SAGE Project Team, University of Puerto Rico Mayagüez, PR{'\n\n'}
              Thank you for using SAGE. We are committed to protecting your privacy and delivering a secure, reliable soil health management experience.
            </Text>
          </YStack>
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