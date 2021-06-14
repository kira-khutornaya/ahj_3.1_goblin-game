import GameBoard from './GameBoard';

export default class GamePlay {
  constructor(boardSize = 4) {
    this.boardSize = boardSize;
    this.board = new GameBoard();
    this.game = false;
    this.dead = document.querySelector('.dead');
    this.lost = document.querySelector('.lost');
    this.count = 0;
  }

  drawGameBoard() {
    document.body.appendChild(this.board.createGameBoard(this.boardSize));
    document.querySelectorAll('.hole').forEach((el) => el.addEventListener('click', this.onClick.bind(this)));
    this.holes = [...document.querySelectorAll('.hole')];
  }

  activateHole(index) {
    this.holes[index].classList.add('hole_has-goblin');
  }

  deactivateHole(index) {
    this.holes[index].classList.remove('hole_has-goblin');
  }

  getRandomIndex() {
    return Math.floor(Math.random() * (this.boardSize ** 2));
  }

  getPosition() {
    let currentPosition;

    do {
      currentPosition = this.getRandomIndex();
    } while (this.activeHole === currentPosition);

    this.activeHole = currentPosition;
    this.activateHole(this.activeHole);
  }

  onClick(event) {
    if (!this.game) return;

    if (event.target.classList.contains('hole_has-goblin')) this.dead.textContent = Number(this.dead.textContent) + 1;

    clearTimeout(this.timeout);
    this.deactivateHole(this.activeHole);
    this.next();
  }

  showMessage() {
    const messageText = document.querySelector('.message-box__text');
    messageText.textContent = `You've scored ${this.dead.textContent} points.`;
    messageText.closest('.message-box').classList.remove('message-box_hidden');
  }

  removeMessage() {
    this.messageClose.closest('.message-box').classList.add('message-box_hidden');
  }

  start() {
    this.messageClose = document.querySelector('.message-box_close');
    this.game = true;
    this.next();
  }

  next() {
    this.count += 1;
    this.lost.textContent = this.count - Number(this.dead.textContent) - 1;

    if (Number(this.lost.textContent) === 5) {
      this.game = false;
      this.showMessage();
      this.stop();
      this.messageClose.addEventListener('click', this.removeMessage.bind(this));
      return;
    }

    this.getPosition();

    this.timeout = setTimeout(() => {
      this.deactivateHole(this.activeHole);
      this.next();
    }, 1000);
  }

  stop() {
    clearTimeout(this.timeout);
    if (this.activeHole) this.deactivateHole(this.activeHole);
    this.resetScore();
  }

  resetScore() {
    this.dead.textContent = '0';
    this.lost.textContent = '0';
    this.count = 0;
  }
}
