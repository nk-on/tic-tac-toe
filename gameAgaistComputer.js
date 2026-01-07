import { checkWinner } from './script.js';
export function minimax(boardState, depth, computer) {
    const winner = checkWinner(boardState);
    if (checkWinner(boardState) === 'tie') {
        return { score: 0 }
    }
    if (winner && computer) {
        return { score: 1 }
    }
    if (winner && computer === false) {
        return { score: -1 }
    }
}