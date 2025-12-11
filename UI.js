const gameStartButton = document.querySelectorAll('.btn');
const startMenu = document.querySelector('.start-menu');
const gameMenu = document.querySelector('.game-menu');
function gameStart(e) {
    startMenu.classList.toggle('visible');
    startMenu.classList.toggle('hidden');
    gameMenu.classList.toggle('visible')
    gameMenu.classList.toggle('hidden')
}
gameStartButton.forEach((button) => {
    button.addEventListener('click', gameStart);
})