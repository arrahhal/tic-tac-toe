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
    this.cells = Array.from({ length: 9 }, () => '');
    this.winner = null;
  }

  getCellsValues(cells = this.cells) {
    return cells;
  }

  activateAiMode() {
    this.isAiModeActive = true;
  }

  deActivateAiMode() {
    this.isAiModeActive = false;
  }

  evaluateScore(board) {
    if (this.checkWin(board, this.players[0])) return -1;
    if (this.checkWin(board, this.players[1])) return +1;
    if (this.checkTie(board)) return 0;
  }

  minimax(board, depth, isMaximizing) {
    if (this.isGameOver(board)) {
      return this.evaluateScore(board);
    }

    if (isMaximizing) {
      let bestScore = -9999;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = this.players[1].sign;
          let score = this.minimax(board, depth + 1, false);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = +9999;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = this.players[0].sign;
          let score = this.minimax(board, depth + 1, true);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  getAiChoice() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i] === '') {
        this.cells[i] = this.players[1].sign;
        let score = this.minimax(this.cells, 0, false);
        this.cells[i] = '';
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }

  playRound(index) {
    const player = this.getCurrentPlayer();

    if (this.cells[index] !== '') return;

    this.cells[index] = player.getSign();

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

  checkWin(cells = this.cells, player = this.getCurrentPlayer()) {
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
      subArr.every((index) => cells[index] === player.sign)
    );
  }

  checkTie(cells = this.cells) {
    return cells.every((cell) => cell !== '');
  }

  isGameOver(cells = this.cells) {
    return (
      this.checkTie(cells) ||
      this.checkWin(cells, this.players[0]) ||
      this.checkWin(cells, this.players[1])
    );
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
