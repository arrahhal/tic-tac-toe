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

class Player {
  constructor(name = '', sign = '', isHisTurn = false) {
    this.name = name;
    this.sign = sign;
    this.isHisTurn = isHisTurn;
  }

  getName() {
    return this.name;
  }

  getSign() {
    return this.sign;
  }

  getHisTurn() {
    return this.isHisTurn;
  }

  toggleHisTurn() {
    this.isHisTurn = !this.isHisTurn;
  }
}

class GameBoard {
  constructor() {
    this.cells = [];
    this.winner = null;
    this.players = [
      new Player('Player x', 'X', true),
      new Player('Player o', 'O', false),
    ];
    this.isAiModeActive = false;

    this.initialize();
  }

  initialize() {
    this.cells = Array.from({ length: 9 }, () => new Cell());
    this.winner = null;
  }

  getCellsValues() {
    return this.cells.map((cell) => cell.getValue());
  }

  activateAiMode() {
    this.isAiModeActive = true;
  }

  deActivateAiMode() {
    this.isAiModeActive = false;
  }

  getRandomIndex() {
    return Math.floor(Math.random() * 9);
  }

  getAiChoice() {
    let randomIndex = this.getRandomIndex();
    while (this.cells[randomIndex].getValue() !== '') {
      randomIndex = this.getRandomIndex();
    }
    return randomIndex;
  }

  playRound(index) {
    const player = this.getCurrentPlayer();
    const cell = this.cells[index];

    if (cell.getValue() !== '') return;

    cell.setValue(player.getSign());

    if (this.checkWin()) {
      this.setWinner(player);
    } else if (this.checkTie()) {
      this.setWinner(null);
    } else {
      this.switchPlayersTurns();
    }
  }

  getCurrentPlayer() {
    return this.players.find((player) => player.getHisTurn() === true);
  }

  switchPlayersTurns() {
    this.players.forEach((player) => player.toggleHisTurn());
  }

  setWinner(player) {
    this.winner = player;
  }

  getWinner() {
    return this.winner;
  }

  checkWin() {
    const cells = this.getCellsValues();
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
      subArr.every(
        (index) => cells[index] === this.getCurrentPlayer().getSign()
      )
    );
  }

  checkTie() {
    const cellsValues = this.getCellsValues();
    return cellsValues.every((cell) => cell !== '');
  }
  isGameOver() {
    return this.checkTie() || this.checkWin() ? true : false;
  }
}

export const Game = {
  playRound: (index) => gameBoard.playRound(index),
  getWinner: () => gameBoard.getWinner(),
  initializeNewGame: () => gameBoard.initialize(),
  getCellsValues: () => gameBoard.getCellsValues(),
  activateAiMode: () => gameBoard.activateAiMode(),
  deActivateAiMode: () => gameBoard.deActivateAiMode(),
  getAiChoice: () => gameBoard.getAiChoice(),
  isAiModeActive: () => gameBoard.isAiModeActive,
  checkWin: () => gameBoard.checkWin(),
  checkTie: () => gameBoard.checkTie(),
  isGameOver: () => gameBoard.isGameOver(),
};

const gameBoard = new GameBoard();
