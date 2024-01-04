import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { useState } from 'react';

function deriveActivePlayer(state) {
  let currentPlayer = 'X';
    if (!!state.length && state[0].player === 'X') {
      currentPlayer = 'O';
    }
    return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(row, column) {
    setGameTurns(prevTurns => {
      /**
       * Not optimal: Merging two states ( activePlayer and gameTurns)
       * const updatedTurns = [{ square: { row, column }, player: activePlayer },  ...prevTurns];  
       */

      /**
       * Best practice:
       * Create a new variable instead : currentPlayer
       * let currentPlayer = 'X';
       * if (!!state.length && state[0].player === 'X') {
       *   currentPlayer = 'O';
       * }
       */
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row, column }, player: currentPlayer },
        ...prevTurns
      ];
       
      return updatedTurns;
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
      </ol>
      <GameBoard turns={gameTurns} onSelectSquare={handleSelectSquare} />
    </div>
    <Log  turns={gameTurns}/>
  </main>
}

export default App
