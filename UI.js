const gameStartButton = document.querySelectorAll('.btn');
const startMenu = document.querySelector('.start-menu');
function gameStart(e) {
    const btn = e.currentTarget;
    if (btn.classList.contains('hidden')) {
        startMenu.classList.remove('hidden');
        startMenu.classList.add('visible')
        return;
    };
    startMenu.classList.remove('visible');
    startMenu.classList.add('hidden');

}
gameStartButton.forEach((button) => {
    button.addEventListener('click', gameStart);
})