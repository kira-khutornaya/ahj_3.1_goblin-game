import GameBoard from './GameBoard';

export default class GamePlay {
  constructor(boardSize = 4) {
    this.boardSize = boardSize;
    this.board = new GameBoard();
    this.dead = document.querySelector('.dead');
    this.lost = document.querySelector('.lost');
    this.count = 0;
  }

  drawGameBoard() {
    document.body.appendChild(this.board.createGameBoard(this.boardSize));
    this.holes = [...document.querySelectorAll('.hole')];
  }

  getPosition() {
    return Math.floor(Math.random() * (this.boardSize ** 2));
  }

  activateHole(index) {
    this.holes[index].classList.add('hole_has-goblin');
  }

  deactivateHole(index) {
    this.holes[index].classList.remove('hole_has-goblin');
  }

  onClick(event) {
    if (event.target.classList.contains('hole_has-goblin')) {
      this.dead.textContent = Number(this.dead.textContent) + 1;
      event.target.classList.remove('hole_has-goblin');
    }
  }

  showMessage() {
    const messageText = document.querySelector('.message-box__text');
    messageText.textContent = `You've scored ${this.dead.textContent} points.`;
    document.querySelector('.message-box').classList.remove('message-box_hidden');
  }

  removeMessage() {
    this.messageClose.closest('.message-box').classList.add('message-box_hidden');
  }

  start() {
    this.activeHole = this.getPosition();
    this.messageClose = document.querySelector('.message-box_close');
    let currentPosition;

    document.querySelector('.hole-container').addEventListener('click', this.onClick.bind(this));

    this.int = setInterval(() => {
      this.deactivateHole(this.activeHole);

      do {
        currentPosition = this.getPosition();
      } while (this.activeHole === currentPosition);

      this.activeHole = currentPosition;
      this.activateHole(this.activeHole);

      this.lost.textContent = this.count - Number(this.dead.textContent);
      this.count += 1;

      if (Number(this.lost.textContent) === 5) {
        this.showMessage();
        this.stop();
        this.messageClose.addEventListener('click', this.removeMessage.bind(this));
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.int);
    if (this.activeHole) this.deactivateHole(this.activeHole);
    this.resetScore();
  }

  resetScore() {
    this.dead.textContent = '0';
    this.lost.textContent = '0';
    this.count = 0;
  }
}
