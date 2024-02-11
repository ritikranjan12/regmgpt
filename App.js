import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
  TextInput,
  Animated,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Textmodel, Chatmodel, Multimodel } from "./models";
import { ScrollView } from "react-native";

const Tab = createBottomTabNavigator();

const TextInputScreen = () => {
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [animation] = useState(new Animated.Value(0));

  const handleTextOutput = async (prompt, setTextInput, setTextOutput) => {
    setTextOutput("Loading ....");
    try {
      const result = await Textmodel.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setTextOutput(text);
      setTextInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyles = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Text Input Screen</Text>
        <TextInput
          style={styles.textInput}
          value={textInput}
          onChangeText={(e) => setTextInput(e)}
          placeholder="Enter prompt"
          multiline={true}
        />
        <Pressable
          onPress={() => {
            handleTextOutput(textInput, setTextInput, setTextOutput);
            startAnimation();
          }}
        >
          <Text style={styles.button}>Submit</Text>
        </Pressable>
        <Animated.View style={[styles.outputContainer, animatedStyles]}>
          <Text style={styles.outputText}>{textOutput}</Text>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon ...</Text>
    </View>
  );
};

const LongChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon ....</Text>
      {/* Add your long chat logic here */}
    </View>
  );
};

const App = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    // authenticate();
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
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: isDarkMode ? "#333" : "#fff",
          },
          tabBarActiveTintColor: isDarkMode ? "#fff" : "#000",
          tabBarInactiveTintColor: isDarkMode ? "#999" : "#666",
          headerStyle: {
            backgroundColor: isDarkMode ? "#333" : "#fff",
          },
          headerTintColor: isDarkMode ? "white" : "black",
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
            width: "33.33%", // Divide the navigation bar into three parts
            textAlign: "center", // Center align the tab labels
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#ff0000",
            height: 3,
          },
          tabBarIconStyle: {
            marginBottom: -3,
            width: "100%", // Set the tab bar icons to full width
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Text Input") {
              iconName = "text-outline";
            } else if (route.name === "Chat") {
              iconName = "aperture-outline";
            } else if (route.name === "Long Chat") {
              iconName = "chatbubbles-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: {
            display: "none",
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    flexGrow: 1, 
  },
  scrollContainer: { 
    flexGrow: 1, 
    backgroundColor: "black",
   },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white", // Set the default text color
  },
  textInput: {
    width: "60%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: "white",
  },
  button: {
    fontSize: 18,
    fontWeight: "medium",
    color: "white",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    opacity: 0.89,
    shadowColor: "red",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  },
  outputContainer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  outputText: {
    fontSize: 16,
    color: "white",
  },
});

export default App;
