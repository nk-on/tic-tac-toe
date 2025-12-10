const gameStartButton = document.querySelector('.btn');
const startMenu = document.querySelector('.start-menu');
gameStartButton.addEventListener('click',()=>{
    if(gameStartButton.classList.contains('hidden')){
        startMenu.classList.remove('hidden');
        startMenu.classList.add('visible')
        return;
    };
    startMenu.classList.remove('visible');
    startMenu.classList.add('hidden');
})
console.log('hello world')