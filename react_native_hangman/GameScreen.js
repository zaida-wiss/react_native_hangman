import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { WORDS } from './words';

// Huvudkomponenten för spelet
export default function GameScreen() {
  // State för det valda ordet
  const [selectedWord, setSelectedWord] = useState('');
  // State för bokstäverna i ordet
  const [letters, setLetters] = useState([]);
  // State för valda bokstäver
  const [chosenLetters, setChosenLetters] = useState([]);

  // Svenska alfabetet (inklusive Å, Ä, Ö)
  const ALPHABET = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Å','Ä','Ö'
  ];

  useEffect(() => {
    // Slumpa fram ett ord från arrayen när komponenten mountas
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setSelectedWord(randomWord);
    // Splitta ordet till en array av bokstäver
    setLetters(randomWord.split(''));
  }, []);

  // Hantera när en bokstav väljs
  const handleLetterPress = (letter) => {
    if (!chosenLetters.includes(letter)) {
      setChosenLetters([...chosenLetters, letter]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Titel för spelet */}
      <Text style={styles.title}>Hänga Gubbe</Text>
      {/* Visar bokstäver eller understreck för varje bokstav i ordet */}
      <View style={styles.wordContainer}>
        {letters.map((letter, idx) => {
          // Visa bokstaven om den är vald, annars understreck
          const isGuessed = chosenLetters.includes(letter.toUpperCase());
          return (
            <Text key={idx} style={styles.letter}>
              {isGuessed ? letter.toUpperCase() : '_'}
            </Text>
          );
        })}
      </View>
      {/* Alfabetet i flera rader */}
      <View style={styles.alphabetContainer}>
        {/* Dela alfabetet i tre rader */}
        {Array.from({ length: 3 }).map((_, rowIdx) => (
          <View key={rowIdx} style={styles.alphabetRow}>
            {ALPHABET.slice(rowIdx * 10, (rowIdx + 1) * 10).map((letter) => {
              const isChosen = chosenLetters.includes(letter);
              return (
                <TouchableOpacity
                  key={letter}
                  onPress={() => handleLetterPress(letter)}
                  disabled={isChosen}
                  style={[styles.alphabetButton, isChosen ? styles.alphabetButtonDisabled : styles.alphabetButtonActive]}
                >
                  <Text style={[styles.alphabetText, isChosen ? styles.alphabetTextDisabled : styles.alphabetTextActive]}>
                    {letter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  wordContainer: {
    flexDirection: 'row',
    marginBottom: 60,
  },
  letter: {
    fontSize: 28,
    marginHorizontal: 4,
  },
  alphabetContainer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  alphabetRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  alphabetButton: {
    borderRadius: 6,
    marginHorizontal: 3,
    paddingVertical: 6,
    paddingHorizontal: 6,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  alphabetButtonActive: {
    backgroundColor: '#fff200', // Gul för att "poppa"
    borderWidth: 2,
    borderColor: '#222',
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  alphabetButtonDisabled: {
    backgroundColor: '#ccc', // Grå för "slocknad"
    borderWidth: 1,
    borderColor: '#aaa',
  },
  alphabetText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  alphabetTextActive: {
    color: '#222',
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  alphabetTextDisabled: {
    color: '#888',
  },
});
