import React, {useState,useEffect} from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import * as LocalAuthentication from "expo-local-authentication";

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync();
    if (hasBiometricHardware) {
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
          console.log("Biometric authentication successful");
        } else {
          authenticate();
        }
      } else {
        authenticate();
      }
    } else {
      console.log("Biometric hardware not available");
    }
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ask me',
          tabBarIcon: ({ color }) => <TabBarIcon name="comment-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <TabBarIcon name="envelope" color={color} />,
        }}
      />
    </Tabs>
  );
}
