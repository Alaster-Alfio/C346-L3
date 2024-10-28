import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ToastAndroid, Alert, Image } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function App() {
    const [userType, setUserType] = useState("");
    const [userName, setUserName] = useState("");
    const [showQuiz, setShowQuiz] = useState(false);
    
    // Quiz state
    const [answers, setAnswers] = useState(["", "", ""]);
    const questions = [
        { id: 1, image: require('./assets/dog.jpeg'), options: ["Dog", "Cat", "Elephant"], correct: "Dog" },
        { id: 2, image: require('./assets/cat.jpeg'), options: ["Dog", "Cat", "Elephant"], correct: "Cat" },
        { id: 3, image: require('./assets/elephant.jpg'), options: ["Dog", "Cat", "Elephant"], correct: "Elephant" },
    ];

    const handleLoginPress = () => {
        ToastAndroid.show(`Welcome ${userType} ${userName}`, ToastAndroid.SHORT);
        setShowQuiz(true);
    };

    const handleSubmit = () => {
        const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length;
        Alert.alert(`You got ${correctAnswers} out of ${questions.length} correct!`);
    };

    return (
        <View style={styles.container}>
            {!showQuiz ? (
                <>
                    <Text>User Type:</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setUserType(value)}
                        items={[
                            { label: "Admin", value: "Admin" },
                            { label: "Guest", value: "Guest" },
                        ]}
                    />
                    <Text>User Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        onChangeText={setUserName}
                    />
                    <Text>Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={handleLoginPress}>
                        <Text style={styles.loginText}>LOG IN</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View style={styles.quizContainer}>
                    <Text style={styles.quizTitle}>Animal Quiz</Text>
                    {questions.map((question, index) => (
                        <View key={question.id} style={styles.questionContainer}>
                            <Image source={question.image} style={styles.image} />
                            <RNPickerSelect
                                onValueChange={(value) => {
                                    const newAnswers = [...answers];
                                    newAnswers[index] = value;
                                    setAnswers(newAnswers);
                                }}
                                items={question.options.map(option => ({ label: option, value: option }))}
                            />
                        </View>
                    ))}
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit Answers</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        width: '80%',
        paddingHorizontal: 10,
    },
    loginText: {
        marginTop: 20,
        color: 'blue',
        fontSize: 18,
        textDecorationLine: 'underline',
    },
    quizContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
    },
    quizTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    questionContainer: {
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    submitText: {
        marginTop: 20,
        color: 'green',
        fontSize: 18,
        textDecorationLine: 'underline',
    },
});
