const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
import { useState } from 'react';

export default function GameBoard({ onSelectSquare, turns }) {
    /**
     * Gameboard is a computed value since is derivied from a state 
     * (in this case from GameTurns that is managed in the app component)
     */
    let gameBoard = initialGameBoard;
    /**
     * This is called deriving state, since it's not handling actual state
     */
    for (const turn of turns) {
        const { square, player } = turn;
        const { row, column } = square;

        gameBoard[row][column] = player;
    }

    /**
     * This is not needed anymore, since the logic has been moved to the app component.
     *  
     */
    const [gameBoardState, setGameBoard] = useState(initialGameBoard);
    function handleSelectSquare(indexRow, indexColumn) {
        /**
         * This approach is NOT Recommended: It would update the original address value immediately
         * setGameBoard(previousStateBoard => previousStateBoard[indexRow][indexColumn] = symbol);
         * 
         * Objects and arrays are reference values => Should NOT MUTATE THEM DIRECTLY,
         * Instead create a deep copy first
         */

        /**
         * This is Strongly recommended practice
         */
        setGameBoard(previousState => {
            const board = [...previousState.map(inner => [...inner])];
            board[indexRow][indexColumn] =  activePlayerSymbol;
            return board;
        });
        onSelectSquare();
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, index) => <li key={index}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => onSelectSquare(index, colIndex)} disabled={!!playerSymbol}>
                            {playerSymbol}
                        </button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    );
}