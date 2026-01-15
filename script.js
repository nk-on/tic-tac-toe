import { gameMenu, startMenu } from "./UI.js";
const gridSquares = document.querySelectorAll('.grid-square');
const playerSign = document.querySelectorAll('.sign');
const movesHistory = Array(16).fill(' ');
const currentPlayerIcon = document.getElementById('current-player-icon')
const playerData = [
    {
        playerName: 'Player 1',
        playerSymbol: 'X',
        playerIcon: 'assets/cross green.svg'
    },
    {
        playerName: 'Player 2',
        playerSymbol: 'O',
        playerIcon: 'assets/Oval orange.svg'
    }
];
const overlay = document.querySelector('.overlay');
const subTitle = document.querySelector('.subtitle');
const quitBtn = document.querySelector('.btn.quit');
const nextBtn = document.querySelector('.btn.next');
const gameResult = document.querySelector('.result-title');
const restartButton = document.querySelector('.restart-button');
const playerScoreEl = document.querySelector('.player1-score h2');
const totalTiesEl = document.querySelector('.total-ties h2');
const computerScoreEl = document.querySelector('.player2-score h2');
const imgEl = document.querySelector('.game-result img');
const newGameVsCpuBtn = document.querySelector('.start-button.btn-yellow');
let currentPlayer = playerData[0];
let gameAgainstComputer = false;
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
    currentPlayer = playerData[0];
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
function score() {
    let [scorePlayer1, scoreTie, scorePlayer2] = [0, 0, 0];
    return (winnerSymbol) => {
        if (winnerSymbol === 'X') {
            scorePlayer1++;
            playerScoreEl.textContent = scorePlayer1
        } else if (winnerSymbol === 'O') {
            scorePlayer2++;
            computerScoreEl.textContent = scorePlayer2
        } else {
            scoreTie++;
            totalTiesEl.textContent = scoreTie;
        }
    }
}
function emptyContainer() {
    if (imgEl) {
        imgEl.remove();
    }
}
function displayWinnerData(winnerSymbol) {
    const increaseScore = score();
    imgEl.setAttribute('src', '')
    overlay.id = "visible";
    const winner = playerData.find(element => element.playerSymbol === winnerSymbol);
    subTitle.textContent = winner.playerName;
    imgEl.setAttribute('src', winner.playerIcon)
    gameResult.textContent = 'TAKES THE ROUND';
    addColor(winner.playerIcon);
    increaseScore(winnerSymbol);
}
function declareTie() {
    overlay.id = "visible";
    gameResult.textContent = 'ROUND TIED';
    gameResult.classList.add('tie');
    emptyContainer();
    const increaseScore = score();
    increaseScore();
}
function checkWinner() {
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
    currentPlayer = playerData.find(data => data.playerSymbol === id);
}
function switchSign() {
    currentPlayer = currentPlayer === playerData[0] ? playerData[1] : playerData[0];
    currentPlayerIcon.setAttribute('src', currentPlayer.playerIcon);
}
function computerMove() {
    let randIdx;
    while (true) {
        randIdx = Math.floor(Math.random() * movesHistory.length);
        const { playerIcon } = currentPlayer;
        if (gridSquares[randIdx].innerHTML.length === 0) {
            gridSquares[randIdx].innerHTML += `<img src="${playerIcon}" />`;
            switchSign();
            break
        }
    }
}
function makeMove(e) {
    e.preventDefault();
    const square = e.currentTarget;
    const id = square.getAttribute('id');
    if (square.innerHTML.length >= 1) return;
    const { playerSymbol, playerIcon } = currentPlayer;
    square.innerHTML += `<img src="${playerIcon}" />`;
    switchSign();
    if (gameAgainstComputer) {
        playerData.map((player) => {
            currentPlayer === player ? player.playerName = 'Computer' : 'You';
        });
        computerMove();
    }
    movesHistory[id] = playerSymbol;
    checkWinner();
}
newGameVsCpuBtn.addEventListener('click', () => {
    gameAgainstComputer = !gameAgainstComputer;
})
playerSign.forEach((sign) => {
    sign.addEventListener('click', choosePlayer);
});
gridSquares.forEach((square) => {
    square.addEventListener('click', makeMove);
});
quitBtn.addEventListener('click', quitGame);
nextBtn.addEventListener('click', startNextRound)
restartButton.addEventListener('click', clear);