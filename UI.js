const gameStartButton = document.querySelectorAll('.start-button');
const startMenu = document.querySelector('.start-menu');
const gameMenu = document.querySelector('.game-menu');
const gameGrid = document.querySelector('.game-grid');
function gameStart(e) {
    startMenu.id = "hidden";
    gameMenu.id = "visible";
}
gameStartButton.forEach((button) => {
    button.addEventListener('click', gameStart);
})
for (let i = 0; i < 16; i++) {
    const square = `<div class="grid-square" id=${i}></div>`;
    gameGrid.innerHTML += square
}
export {gameMenu,startMenu}