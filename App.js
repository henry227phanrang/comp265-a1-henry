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

  const speakWord = (word) => {
    Speech.speak(word, { language: "fr" });
  };

  const filteredWords = words.filter((word) =>
    word.french.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={styles.title}>French Flashcards</Text>

      {/* ✅ Dark Mode Switch */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{darkMode ? "Dark Mode" : "Light Mode"}</Text>
        <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
      </View>

      {/* ✅ Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Type a French word..."
        onChangeText={setSearchText}
        value={searchText}
      />

      {/* ✅ Scrollable Flashcards (Centered Layout) */}
      <ScrollView contentContainerStyle={{ alignItems: "center" }} style={styles.scrollView}>
        {filteredWords.map((word, i) => (
          <View key={i} style={styles.flashcard}>
            {/* ✅ Wrap all flashcard content inside a View */}
            <View style={styles.flashcardContent}>
              <Image source={{ uri: word.image }} style={styles.image} />
              <Text style={styles.word}>{word.french}</Text>
              {showTranslation && <Text style={styles.translation}>{word.english}</Text>}
              {/* ✅ Play correct audio inside the flashcard */}
              <TouchableOpacity onPress={() => speakWord(word.french)} style={styles.speakerButton}>
                <Text style={styles.speakerText}>🔊</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* ✅ Buttons */}
      <TouchableOpacity onPress={() => setShowTranslation(!showTranslation)} style={styles.button}>
        <Text style={styles.buttonText}>{showTranslation ? "Hide Translation" : "Show Translation"}</Text>
      </TouchableOpacity>

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
    height: 250, /* ✅ Increased to fit everything */
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "white", 
    borderRadius: 10, 
    elevation: 5, 
    shadowColor: "#000", 
    shadowOpacity: 0.2, 
    marginBottom: 20,
    padding: 10, /* ✅ Added padding so content is well-spaced */
  },

  /* ✅ Ensure all flashcard content is centered properly */
  flashcardContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  image: { width: 80, height: 80, marginBottom: 10 }, /* ✅ Reduced size */
  word: { fontSize: 28, fontWeight: "bold" }, /* ✅ Slightly smaller */
  translation: { fontSize: 22, color: "gray", marginTop: 10 },

  /* ✅ Ensure the 🔊 button stays inside the flashcard */
  speakerButton: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10, /* ✅ Added margin to separate from text */
  },
  speakerText: { fontSize: 22 },

  button: { backgroundColor: "blue", padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: "white", fontSize: 18 },
});
