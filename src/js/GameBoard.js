export default class GameBoard {
  constructor() {
    this.gameBoard = null;
  }

  createGameBoard(num) {
    const container = document.createElement('div');
    container.classList.add('hole-container');

    for (let i = 0; i < num ** 2; i += 1) {
      const hole = document.createElement('div');
      hole.classList.add('hole');

      container.appendChild(hole);
    }

    this.gameBoard = container;
    return this.gameBoard;
  }
}
