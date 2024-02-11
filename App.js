import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, useColorScheme } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Textmodel, Chatmodel, Multimodel} from './models'
const Tab = createBottomTabNavigator();


const handleTextOutput = async() => {
  const prompt = "Write a story about a magic backpack."

  const result = await Textmodel.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

const TextInputScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Text Input Screen</Text>
      <Pressable onPress={handleTextOutput}></Pressable>
    </View>
  );
};

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat Screen</Text>
    </View>
  );
};

const LongChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Long Chat Screen</Text>
      {/* Add your long chat logic here */}
    </View>
  );
};

const App = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

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
          console.log('Biometric authentication successful');
        } else {
          authenticate()
        }
      } else {
        authenticate()
      }
    } else {
      console.log('Biometric hardware not available');
    }
  };
  

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#333' : '#fff',
          },
          tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
          tabBarInactiveTintColor: isDarkMode ? '#999' : '#666',
          headerStyle: {
            backgroundColor: isDarkMode ? '#333' : '#fff',
          },
          headerTintColor: isDarkMode ? 'gray' : '#000',
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            width: '33.33%', // Divide the navigation bar into three parts
            textAlign: 'center', // Center align the tab labels
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#ff0000',
            height: 3,
          },
          tabBarIconStyle: {
            marginBottom: -3,
            width: '100%', // Set the tab bar icons to full width
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Text Input') {
              iconName = 'text-outline';
            } else if (route.name === 'Chat') {
              iconName = 'aperture-outline';
            } else if (route.name === 'Long Chat') {
              iconName = 'chatbubbles-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        })}
      >
        <Tab.Screen name="Text Input" component={TextInputScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Long Chat" component={LongChatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Set the default text color
  },
  // Add additional styles for dark mode here
});

export default App;
