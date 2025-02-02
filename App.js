import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const words = [
  { french: "Bonjour", english: "Hello", image: "https://cdn-icons-png.flaticon.com/512/1047/1047711.png" },
  { french: "Merci", english: "Thank you", image: "https://cdn-icons-png.flaticon.com/512/1047/1047710.png" },
  { french: "Pardon", english: "Excuse me", image: "https://cdn-icons-png.flaticon.com/512/1047/1047712.png" },
  { french: "Au revoir", english: "Goodbye", image: "https://cdn-icons-png.flaticon.com/512/1047/1047713.png" },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const nextWord = () => {
    setShowTranslation(false); // Hide translation when moving to next word
    setIndex((prevIndex) => (prevIndex + 1) % words.length); // Loop back after last word
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>French Flashcards</Text>
  
      <TouchableOpacity onPress={() => setShowTranslation(!showTranslation)} style={styles.flashcard}>
        {/* Image Added Here */}
        <Image source={{ uri: words[index].image }} style={styles.image} />
        <Text style={styles.word}>{words[index].french}</Text>
        {showTranslation && <Text style={styles.translation}>{words[index].english}</Text>}
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
  flashcard: { width: 250, height: 150, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 10, elevation: 5, shadowColor: "#000", shadowOpacity: 0.2, marginBottom: 20 },
  word: { fontSize: 32, fontWeight: "bold" },
  translation: { fontSize: 24, color: "gray", marginTop: 10 },
  button: { backgroundColor: "blue", padding: 10, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 18 },
});
