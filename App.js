import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {

  const [ userNumber, setUserNumber ] = useState(),
  [guessRounds, setGuessRounds] = useState(0),
  [ dataLoaded, setDataLoaded ] = useState(false);

  if( !dataLoaded ){
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)} 
        onError={(err) => console.log(err)} 
      />
    );
  }

  const newGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={ startGameHandler } />;

  if( userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={ userNumber } onGameOver={ gameOverHandler } />;
  } else if( guessRounds > 0) {
    content = <GameOverScreen userChoice={ userNumber } roundsNumber={guessRounds} onRestart={newGameHandler} />
  }

  return (
    // Safearea used to avoid ios notification bar line overlapping content of gameover screen, so here it will add padding top and bottom auto
    <SafeAreaView style={ styles.screen } >
      <Header title='Guess a Number' />
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
