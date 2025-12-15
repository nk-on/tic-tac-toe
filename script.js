const cross = document.getElementById('cross');
const oval = document.getElementById('oval');
const gridSquares = document.querySelectorAll('.grid-square');
const playerSign = document.querySelectorAll('.sign');
const movesHistory = Array(16).fill(' ');
const currentPlayerSign = document.getElementById('current-player-icon')
const signData = [
    {
        signTitle: 'cross',
        signImage: 'assets/cross green.svg'
    },
    {
        signTitle: 'oval',
        signImage: 'assets/Oval orange.svg'
    }
];
let currentSign = signData[0];
function chooseSign(e) {
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
function saveMove() {
    movesHistory[id] = signTitle;
}
function insertSign(e) {
    const square = e.currentTarget;
    const id = square.getAttribute('id');
    if (square.innerHTML.length >= 1) return;
    const { signTitle, signImage } = currentSign;
    square.innerHTML += `<img src="${signImage}" />`;
    switchSign();
    saveMove();
}
playerSign.forEach((sign) => {
    sign.addEventListener('click', chooseSign);
});
gridSquares.forEach((square) => {
    square.addEventListener('click', insertSign);
})