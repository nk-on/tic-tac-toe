import { gameMenu, startMenu } from "./UI.js";
const gridSquares = document.querySelectorAll('.grid-square');
const playerSign = document.querySelectorAll('.sign');
const movesHistory = Array(16).fill(' ');
const currentPlayerSign = document.getElementById('current-player-icon')
const signData = [
    {
        playerName: 'Player 1',
        signTitle: 'X',
        signImage: 'assets/cross green.svg'
    },
    {
        playerName: 'Player 2',
        signTitle: 'O',
        signImage: 'assets/Oval orange.svg'
    }
];
const overlay = document.querySelector('.overlay');
const winnerContainer = document.querySelector('.winning-player-image');
const subTitle = document.querySelector('.subtitle');
const quitBtn = document.querySelector('.btn.quit');
const nextBtn = document.querySelector('.btn.next');
const winningCombos = [

    // Rows
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],

    // Columns
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],

    // Diagonals
    [0, 5, 10, 15],
    [3, 6, 9, 12]

];

let currentSign = signData[0];
function clear() {
    gridSquares.forEach((square) => {
        square.replaceChildren();
    });
    movesHistory.fill('')
}
function startNextRound() {
    clear();
    overlay.id = 'hidden';
}
function quitGame() {
    clear();
    currentSign = signData[0];
    overlay.id = 'hidden';
    gameMenu.id = 'hidden';
    startMenu.id = 'visible';
}
function displayWinnerData(winnerSymbol) {
    const winner = signData.find(element => element.signTitle === winnerSymbol);
    subTitle.textContent = winner.playerName;
    winnerContainer.setAttribute('src', winner.signImage)
}
function checkWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        const winCondition = winningCombos[i];
        let a = movesHistory[winCondition[0]];
        let b = movesHistory[winCondition[1]];
        let c = movesHistory[winCondition[2]];
        let d = movesHistory[winCondition[3]];
        if ((a === b && b === c && d === c) && (a !== ' ' && b !== ' ' && c !== ' ' && d !== ' '
        )) {
            overlay.id = "visible";
            displayWinnerData(a);
            return a;
        }
    }

}
function choosePlayer(e) {
    const clickedSquare = e.currentTarget;
    const id = clickedSquare.getAttribute('id');
    currentSign = signData.find(data => data.signTitle === id);

}
function insertCurrentPlayerSign() {
    currentPlayerSign.setAttribute('src', currentSign.signImage);
}
function switchSign() {
    currentSign = currentSign === signData[0] ? signData[1] : signData[0];
    insertCurrentPlayerSign();
}
function saveMove(id, signTitle) {
    movesHistory[id] = signTitle;
}
function insertSign(e) {
    e.preventDefault();
    const square = e.currentTarget;
    const id = square.getAttribute('id');
    if (square.innerHTML.length >= 1) return;
    const { signTitle, signImage } = currentSign;
    square.innerHTML += `<img src="${signImage}" />`;
    switchSign();
    saveMove(id, signTitle);
    checkWinner();
}
playerSign.forEach((sign) => {
    sign.addEventListener('click', choosePlayer);
});
gridSquares.forEach((square) => {
    square.addEventListener('click', insertSign);
});
quitBtn.addEventListener('click', quitGame);
nextBtn.addEventListener('click',startNextRound)