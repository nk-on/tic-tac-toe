const cross = document.getElementById('cross');
const oval = document.getElementById('oval');
const gridSquares = document.querySelectorAll('.grid-square');
const playerSign = document.querySelectorAll('.sign');
const moves = Array(16).fill(' ');
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
function drawSquare(e) {
    const square = e.currentTarget;
    if (square.innerHTML.length >= 1) return;
    const {signImage} = currentSign;
    square.innerHTML += `<img src="${signImage}" />`;
}
function chooseSign(e) {
    currentSign = currentSign === signData[0] ? signData[1] : signData[0];
}
playerSign.forEach((sign) => {
    sign.addEventListener('click', chooseSign);
});
gridSquares.forEach((square) => {
    square.addEventListener('click', drawSquare);
})