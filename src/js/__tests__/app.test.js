import GameBoard from '../GameBoard';
import GamePlay from '../GamePlay';

describe('GameBoard:', () => {
  test('should return the markup of a new field', () => {
    const board = new GameBoard().createGameBoard(4);
    const holes = board.querySelectorAll('.hole');
    expect(holes.length).toBe(16);
  });
});

describe('GamePlay:', () => {
  const game = new GamePlay();
  game.drawGameBoard();

  test('drawGameBoard method should draw a new game board', () => {
    const holes = document.querySelectorAll('.hole');
    expect(holes.length).toBe(16);
  });

  test('activateHole (deactivateHole) method should add (remove) class to the index', () => {
    game.activateHole(3);
    expect(game.holes[3].classList.contains('hole_has-goblin')).toBeTruthy();

    game.deactivateHole(3);
    expect(game.holes[3].classList.contains('hole_has-goblin')).toBeFalsy();
  });

  test('getRandomIndex method should return random number', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const random = new GamePlay().getRandomIndex();
    expect(array).toContain(random);
  });
});
