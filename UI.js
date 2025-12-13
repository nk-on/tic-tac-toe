const gameStartButton = document.querySelectorAll('.btn');
const startMenu = document.querySelector('.start-menu');
const gameMenu = document.querySelector('.game-menu');
const gameGrid = document.querySelector('.game-grid');
function gameStart(e) {
    startMenu.classList.toggle('visible');
    startMenu.classList.toggle('hidden');
    gameMenu.classList.toggle('visible')
    gameMenu.classList.toggle('hidden')
}
gameStartButton.forEach((button) => {
    button.addEventListener('click', gameStart);
})
for (let i = 0; i < 16; i++) {
    const square = `<div class="grid-square" id=${i}></div>`;
    gameGrid.innerHTML += square
}