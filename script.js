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
const winnerContainer = document.querySelector('.winner-container');
const subTitle = document.querySelector('.subtitle');
const quitBtn = document.querySelector('.btn.quit');
const nextBtn = document.querySelector('.btn.next');
const gameResult = document.querySelector('.game-result');
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
const playerScoreEl = document.querySelector('.player-score h2');
const totalTiesEl = document.querySelector('.total-ties h2');
const computerScoreEl = document.querySelector('.computer-score h2');
let currentSign = signData[0];
function clear() {
    gridSquares.forEach((square) => {
        square.replaceChildren();
    });
    movesHistory.fill(' ')
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
function addColor(winnerSymbol) {
    if (winnerSymbol === 'O') {
        gameResult.classList.add('oval-icon')
    } else if (winnerSymbol === 'X') {
        gameResult.classList.remove('oval-icon')
    }
}
function emptyContainer() {
    if (gameResult.innerHTML.length >= 1) {
        const imgEl = document.querySelector('.winner-container img');
        imgEl.remove();
    }
}
function displayWinnerData(winnerSymbol) {
    emptyContainer();
    overlay.id = "visible";
    const winner = signData.find(element => element.signTitle === winnerSymbol);
    subTitle.textContent = winner.playerName;
    const img = document.createElement('img')
    img.src = winner.signImage;
    winnerContainer.prepend(img);
    gameResult.textContent = 'TAKES THE ROUND';
    addColor(winner.signTitle);
}
function declareTie() {
    overlay.id = "visible";
    gameResult.textContent = 'ROUND TIED';
    gameResult.classList.add('tie')
}
function checkWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        const winCondition = winningCombos[i];
        const a = movesHistory[winCondition[0]];
        const b = movesHistory[winCondition[1]];
        const c = movesHistory[winCondition[2]];
        const d = movesHistory[winCondition[3]];
        if ((a === b && b === c && d === c) && (a !== ' ' && b !== ' ' && c !== ' ' && d !== ' '
        )) {
            displayWinnerData(a);
            return a;
        }
        if (!movesHistory.includes(' ')) {
            declareTie();
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
nextBtn.addEventListener('click', startNextRound)