import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
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
    // Räkna antalet felgissningar
    const incorrectGuesses = chosenLetters.filter(
      (letter) => !letters.map(l => l.toUpperCase()).includes(letter)
    ).length;

    // Max antal steg innan kollision (default 10)
    const MAX_STEPS = 10;

    // Emoji för gubbe och berg
    const GUY = '🚶';
    const WALL = '🗻';

    // Beräkna positionen för gubben (0 = längst till vänster, MAX_STEPS = vid väggen)
    const guyPosition = Math.min(incorrectGuesses, MAX_STEPS);

    // Skapa en rad med gubben som rör sig närmare väggen för varje fel
    const renderGuyRow = () => {
      const row = [];
      // Avståndet mellan gubben och väggen minskar för varje fel
      for (let i = 0; i < MAX_STEPS - guyPosition; i++) {
        row.push(<Text key={i} style={{fontSize: 32}}>{' '}</Text>);
      }
      row.push(<Text key="guy" style={{fontSize: 32}}>{GUY}</Text>);
      for (let i = 0; i < guyPosition; i++) {
        row.push(<Text key={MAX_STEPS + i} style={{fontSize: 32}}>{' '}</Text>);
      }
      row.push(<Text key="wall" style={{fontSize: 32}}>{WALL}</Text>);
      return <View style={{flexDirection: 'row', marginBottom: 16, marginTop: 8, justifyContent: 'center', minHeight: 40}}>{row}</View>;
    };


  // Funktion för att starta nytt spel
  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setSelectedWord(randomWord);
    setLetters(randomWord.split(''));
    setChosenLetters([]);
  };

  useEffect(() => {
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hantera när en bokstav väljs
  const handleLetterPress = (letter) => {
    if (!chosenLetters.includes(letter)) {
      setChosenLetters([...chosenLetters, letter]);
    }
  };

  // Kontrollera om spelet är slut (vinst eller förlust)
  const isWin = letters.length > 0 && letters.every(l => chosenLetters.includes(l.toUpperCase()));
  const isLose = incorrectGuesses >= MAX_STEPS;
  const isGameOver = isWin || isLose;

  return (
    <View style={styles.container}>
      {/* Titel för spelet */}
      <Text style={styles.title}>Hänga Gubbe</Text>
      {/* Gubbe som rör sig mot bergsvägg */}
      {renderGuyRow()}
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
      {/* Visa vinst- eller förlustmeddelande */}
      {isGameOver && (
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          {isWin && <Text style={{ fontSize: 22, color: 'green', marginBottom: 8 }}>Du vann! Grattis!! </Text>}
          {isLose && <Text style={{ fontSize: 22, color: 'red', marginBottom: 8 }}>Du förlorade! Ordet var: {selectedWord.toUpperCase()}</Text>}
          <Button title="Starta nytt spel" onPress={startNewGame} />
        </View>
      )}
      {/* Alfabetet i flera rader, inaktiverad om spelet är slut */}
      <View style={styles.alphabetContainer}>
        {Array.from({ length: 3 }).map((_, rowIdx) => (
          <View key={rowIdx} style={styles.alphabetRow}>
            {ALPHABET.slice(rowIdx * 10, (rowIdx + 1) * 10).map((letter) => {
              const isChosen = chosenLetters.includes(letter);
              return (
                <TouchableOpacity
                  key={letter}
                  onPress={() => handleLetterPress(letter)}
                  disabled={isChosen || isGameOver}
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
    position: 'fixed',
    bottom: 20,
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
