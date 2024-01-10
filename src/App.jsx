import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { useState } from 'react';
import GameOver from './components/GameOver.jsx';
import { deriveActivePlayer, deriveWinner, deriveBoard, PLAYERS} from './components/helpers.js';

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(row, column) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row, column }, player: currentPlayer },
        ...prevTurns
      ];
      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, name) {
    setPlayers(prevPlayers => ({ ...prevPlayers, [symbol]: name }));
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onSavePlayer={ handlePlayerNameChange}/>
        <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onSavePlayer={handlePlayerNameChange}/>
      </ol>
      {(winner || hasDraw) && <GameOver onResetGame={handleRematch} winner={ winner}/>}
      <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare}/>
    </div>
    <Log turns={gameTurns}/>
  </main>
}

export default App
