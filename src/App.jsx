import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

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
  
  let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player;
  }

  /**
   * Not needed to check if there is a winner (or create a state for that) since 
   * the app will be triggered everytime a button is clicked,(because of the gameTurns state triggerer)
   * that's why the logic of checking a winner can be outside the handleSelectSquare
   */
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol  && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

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
      {winner && <p>You won, { winner} !!!</p>}
      <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} />
    </div>
    <Log  turns={gameTurns}/>
  </main>
}

export default App
