import * as Speech from "expo-speech";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const words = [
  { french: "Bonjour", english: "Hello", image: "https://cdn-icons-png.flaticon.com/512/5821/5821940.png" },
  { french: "Merci", english: "Thank you", image: "https://cdn-icons-png.flaticon.com/512/1207/1207759.png" },
  { french: "Chaud", english: "Hot", image: "https://cdn-icons-png.flaticon.com/512/3275/3275168.png" },
  { french: "Froid", english: "Cold", image: "https://cdn-icons-png.flaticon.com/512/642/642000.png" },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const nextWord = () => {
    setShowTranslation(false); // Hide translation when moving to next word
    setIndex((prevIndex) => (prevIndex + 1) % words.length); // Loop back after last word
  };

  // ✅ Function to Play Pronunciation
  const speakWord = () => {
    Speech.speak(words[index].french, { language: "fr" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>French Flashcards</Text>

      <TouchableOpacity onPress={() => setShowTranslation(!showTranslation)} style={styles.flashcard}>
        <Image source={{ uri: words[index].image }} style={styles.image} />
        <Text style={styles.word}>{words[index].french}</Text>
        {showTranslation && <Text style={styles.translation}>{words[index].english}</Text>}
      </TouchableOpacity>

      {/* ✅ New Pronunciation Button with Gray Background */}
      <TouchableOpacity onPress={speakWord} style={styles.speakerButton}>
        <Text style={styles.speakerText}>🔊</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={nextWord} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  flashcard: { 
    width: 250, 
    height: 200, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "white", 
    borderRadius: 10, 
    elevation: 5, 
    shadowColor: "#000", 
    shadowOpacity: 0.2, 
    marginBottom: 20 
  },
  image: { width: 100, height: 100, marginBottom: 10 },
  word: { fontSize: 32, fontWeight: "bold" },
  translation: { fontSize: 24, color: "gray", marginTop: 10 },

  // ✅ Style for the New Speaker Button (Gray Background)
  speakerButton: {
    backgroundColor: "#f5f5f5", // ✅ Same as app background
    padding: 15,
    borderRadius: 50, // Circular button
    borderWidth: 1, // Light border for better visibility
    borderColor: "#ccc", // Light gray border
    marginBottom: 10,
  },
  speakerText: { fontSize: 24 },

  button: { backgroundColor: "blue", padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: "white", fontSize: 18 },
});
