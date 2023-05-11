class Cell {
  constructor(value = '') {
    this.value = value;
  }

  setValue(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}

class GameBoard {
  constructor() {
    this.cells = [];
    this.winner = null;
    this.players = [
      {
        name: 'Player X',
        sign: 'X',
      },
      {
        name: 'Player O',
        sign: 'O',
      },
    ];
    this.currentPlayerIndex = 0;

    this.initialize();
  }

  initialize() {
    this.cells = Array.from({ length: 9 }, () => new Cell());
    this.winner = null;
    this.currentPlayerIndex = 0;
  }

  getCellValues() {
    return this.cells.map((cell) => cell.getValue());
  }

  playRound(index) {
    const player = this.getCurrentPlayer();
    const cell = this.cells[index];

    if (cell.getValue() !== '') {
      return null;
    }

    cell.setValue(player.sign);

    if (this.checkWin()) {
      this.setWinner(player);
      return player;
    } else if (this.checkTie()) {
      this.setWinner(null);
      return 'tie';
    } else {
      this.switchCurrentPlayer();
      return null;
    }
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  switchCurrentPlayer() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

  setWinner(player) {
    this.winner = player;
  }

  getWinner() {
    return this.winner;
  }

  checkWin() {
    const cells = this.getCellValues();
    const winningCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCases.some((subArr) =>
      subArr.every((index) => cells[index] === this.getCurrentPlayer().sign)
    );
  }

  checkTie() {
    const cellsValues = this.getCellValues();
    return cellsValues.every((cell) => cell !== '');
  }
}

export const Game = {
  playRound: (index) => gameBoard.playRound(index),
  getCurrentPlayer: () => gameBoard.getCurrentPlayer(),
  initializeNewGame: () => gameBoard.initialize(),
};

const gameBoard = new GameBoard();
