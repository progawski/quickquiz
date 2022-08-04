import React from 'react';
import Home from './components/Home';
import Game from './components/Game';

export default function App(){

  const [newGame, setNewGame] = React.useState(false);




  function startNewGame() {
    setNewGame(true);
  }

  return(
    <main>
          {newGame? <Game startNewGame={startNewGame} newGame={newGame}/> : <Home startNewGame={startNewGame}/>}
    </main>

  )
}