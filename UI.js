const gameStartButton = document.querySelectorAll('.btn');
const startMenu = document.querySelector('.start-menu');
function gameStart(e) {
    startMenu.classList.toggle('visible');
    startMenu.classList.toggle('hidden');
}
gameStartButton.forEach((button) => {
    button.addEventListener('click', gameStart);
})