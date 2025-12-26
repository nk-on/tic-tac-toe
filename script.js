const cross = document.getElementById('cross');
const oval = document.getElementById('oval');
const gridSquares = document.querySelectorAll('.grid-square');
const playerSign = document.querySelectorAll('.sign');
const movesHistory = Array(16).fill(' ');
const currentPlayerSign = document.getElementById('current-player-icon')
const signData = [
    {
        playerName:'Player 1',
        signTitle: 'X',
        signImage: 'assets/cross green.svg'
    },
    {
        playerName:'Player 2',
        signTitle: 'O',
        signImage: 'assets/Oval orange.svg'
    }
];
const overlay = document.querySelector('.overlay');
const overlaySubtitle = document.querySelector('.subtitle')
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
            return a;
        }
    }

}
function chooseSign(e) {
    const clickedSquare = e.currentTarget;
    const id = clickedSquare.getAttribute('id');
    console.log(id)
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
    sign.addEventListener('click', chooseSign);
});
gridSquares.forEach((square) => {
    square.addEventListener('click', insertSign);
})