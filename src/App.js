import React from 'react';
import Home from './components/Home';
import Game from './components/Game';

export default function App(){

  const [newGame, setNewGame] = React.useState(false);

  function startNewGame() {
    setNewGame(prevNewGame => !prevNewGame);
  }

  return(
    <main>
          {/* Change the screen depends on game state */}
          {newGame? <Game startNewGame={startNewGame}/> : <Home startNewGame={startNewGame}/>}
    </main>

  )
}