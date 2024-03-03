import { Textmodel } from "@/app/model";
import React, { useState } from "react";
import { Animated, Pressable, ScrollView, TextInput, Text, View, StyleSheet } from "react-native";

export const TextInputScreen = () => {
    const [textInput, setTextInput] = useState("");
    const [textOutput, setTextOutput] = useState("");
    const [animation] = useState(new Animated.Value(0));

    const handleTextOutput = async (prompt: string) => {
        setTextOutput("Loading ....");
        try {
            const result = await Textmodel.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
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
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Ask me Anything</Text>
                <TextInput
                    style={styles.input}
                    value={textInput}
                    onChangeText={(e) => setTextInput(e)}
                    multiline={true}
                />
                <Pressable
                    onPress={() => {
                        handleTextOutput(textInput);
                        startAnimation();
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Generate</Text>
                </Pressable>
                <Animated.View style={[styles.outputContainer, animatedStyles]}>
                    <Text style={styles.outputText}>{textOutput}</Text>
                </Animated.View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#fff",
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 120,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: "#fff",
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    outputContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: "#EAEAEA",
        borderRadius: 10,
    },
    outputText: {
        fontSize: 16,
        color: "#333",
    },
});
