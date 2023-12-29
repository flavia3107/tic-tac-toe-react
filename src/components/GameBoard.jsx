import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(indexRow, indexColumn, symbolValue) {
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
            board[indexRow][indexColumn] = symbolValue;
            return board;
        });
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, index) => <li key={index}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => handleSelectSquare(index, colIndex, 'X')}>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    );
}