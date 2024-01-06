import { WINNING_COMBINATIONS } from '../winning-combinations';

export const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export function deriveActivePlayer(state) {
    let currentPlayer = 'X';
    if (!!state.length && state[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

export function deriveWinner(gameBoard, players) {
    let winner = null;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }
    return winner;
}

export function deriveBoard(gameTurns) {
    let gameBoard = [...initialGameBoard.map(row => [...row])];
    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, column } = square;
        gameBoard[row][column] = player;
    }
    return gameBoard;
}