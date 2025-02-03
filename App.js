import * as Speech from "expo-speech";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, Switch } from "react-native";

const words = [
  { french: "Bonjour", english: "Hello", image: "https://cdn-icons-png.flaticon.com/512/5821/5821940.png" },
  { french: "Merci", english: "Thank you", image: "https://cdn-icons-png.flaticon.com/512/1207/1207759.png" },
  { french: "Chaud", english: "Hot", image: "https://cdn-icons-png.flaticon.com/512/3275/3275168.png" },
  { french: "Froid", english: "Cold", image: "https://cdn-icons-png.flaticon.com/512/642/642000.png" },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchText, setSearchText] = useState("");

  const nextWord = () => {
    setShowTranslation(false);
    setIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  // ✅ Updated to speak any selected word
  const speakWord = (word) => {
    Speech.speak(word, { language: "fr" });
  };

  // Filter words based on user input
  const filteredWords = words.filter((word) =>
    word.french.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={styles.title}>French Flashcards</Text>

      {/* ✅ Switch for Dark Mode */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{darkMode ? "Dark Mode" : "Light Mode"}</Text>
        <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
      </View>

      {/* ✅ TextInput for Searching Words */}
      <TextInput
        style={styles.input}
        placeholder="Type a French word..."
        onChangeText={setSearchText}
        value={searchText}
      />

      {/* ✅ Scrollable List of Flashcards (Centered) */}
      <ScrollView contentContainerStyle={{ alignItems: "center" }} style={styles.scrollView}>
        {filteredWords.map((word, i) => (
          <View key={i} style={styles.flashcard}>
            <Image source={{ uri: word.image }} style={styles.image} />
            <Text style={styles.word}>{word.french}</Text>
            {showTranslation && <Text style={styles.translation}>{word.english}</Text>}

            {/* ✅ Play correct audio when clicking 🔊 */}
            <TouchableOpacity onPress={() => speakWord(word.french)} style={styles.speakerButton}>
              <Text style={styles.speakerText}>🔊</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* ✅ Show Translation Button */}
      <TouchableOpacity onPress={() => setShowTranslation(!showTranslation)} style={styles.button}>
        <Text style={styles.buttonText}>{showTranslation ? "Hide Translation" : "Show Translation"}</Text>
      </TouchableOpacity>

      {/* ✅ Next Word Button */}
      <TouchableOpacity onPress={nextWord} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  lightContainer: { backgroundColor: "#f5f5f5" },
  darkContainer: { backgroundColor: "#333" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },

  switchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  switchLabel: { fontSize: 16, marginRight: 10, color: "#555" },

  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, width: 250, marginBottom: 10, borderRadius: 5, backgroundColor: "white" },

  scrollView: { maxHeight: 300, width: "100%" },

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

  speakerButton: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  speakerText: { fontSize: 24 },

  button: { backgroundColor: "blue", padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: "white", fontSize: 18 },
});
