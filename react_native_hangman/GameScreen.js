import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WORDS } from './words';

// Huvudkomponenten för spelet
export default function GameScreen() {
  // State för det valda ordet
  const [selectedWord, setSelectedWord] = useState('');
  // State för bokstäverna i ordet
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    // Slumpa fram ett ord från arrayen när komponenten mountas
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setSelectedWord(randomWord);
    // Splitta ordet till en array av bokstäver
    setLetters(randomWord.split(''));
  }, []);

  return (
    <View style={styles.container}>
      {/* Titel för spelet */}
      <Text style={styles.title}>Hänga Gubbe</Text>
      {/* Visar understreck för varje bokstav i ordet */}
      <View style={styles.wordContainer}>
        {letters.map((_, idx) => (
          <Text key={idx} style={styles.letter}>_ </Text>
        ))}
      </View>
    </View>
  );
}

// Stilar för komponenten
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  wordContainer: {
    flexDirection: 'row',
  },
  letter: {
    fontSize: 28,
    marginHorizontal: 4,
  },
});
