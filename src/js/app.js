import GamePlay from './GamePlay';

const game = new GamePlay(4);
game.drawGameBoard();

const start = document.querySelector('.game__btn');
start.addEventListener('click', () => {
  game.stop();
  game.start();
});
