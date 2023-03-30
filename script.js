const Cell = () => {
  let cellValue = 0;

  const setCellValue = (newCellValue) => (cellValue = newCellValue);
  const getCellValue = () => cellValue;
  return {
    setCellValue,
    getCellValue,
  };
};

const GameBoard = (() => {
  const rows = 3;
  const columns = 3;
  const cells = [];

  const initializeNewBoard = () => {
    for (let i = 0; i < rows; i++) {
      cells[i] = [];
      for (let j = 0; j < columns; j++) cells[i].push(Cell());
    }
  };

  const holdValue = (row, column) => {
    const cell = cells[row][column];
    const currentPlayer = GameController.getCurrentPlayer();
    cell.setCellValue(currentPlayer.sign);
  };

  const getCellValues = () =>
    cells.map((row) => row.map((cell) => cell.getCellValue()));

  window.addEventListener('DOMContentLoaded', initializeNewBoard);

  return {
    holdValue,
    getCellValues,
    initializeNewBoard,
  };
})();

const GameController = (() => {
  const players = [
    {
      name: 'Player X',
      sign: 'X',
    },
    {
      name: 'Player O',
      sign: 'O',
    },
  ];
  let winner = '';
  let currentPlayer = players[0];

  const switchCurrentPlayers = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    uiController.switchTurn();
  };
  const getCurrentPlayer = () => currentPlayer;

  const playRound = (row, column) => {
    GameBoard.holdValue(row, column);
    if (checkResult() === 'win') {
      setWinner();
    } else if (checkResult() === 'tie') {
      setTie();
    }
    switchCurrentPlayers();
  };

  const getResultMessage = () =>
    winner === '' ? 'It is a tie! ' : `${winner} is the winner`;

  const setWinner = () => {
    winner = currentPlayer.name;
    uiController.displayResultMessage(getResultMessage());
    initializeNewGame();
  };
  const setTie = () => {
    uiController.displayResultMessage(getResultMessage());
    initializeNewGame();
  };
  const initializeNewGame = () => {
    winner = '';
    GameBoard.initializeNewBoard();
    uiController.clearBoard();
  };
  const checkResult = () => {
    const cells = GameBoard.getCellValues();

    //check rows for winner
    cells.map((row) => {
      if (row[0] === row[1] && row[0] === row[2] && row[0] !== 0) return 'win';
    });

    // check columns for winner
    for (let col = 0; col < 3; col++) {
      if (
        cells[0][col] === cells[1][col] &&
        cells[0][col] === cells[2][col] &&
        cells[0][col] !== 0
      )
        return 'win';
    }

    //checks 3-on-angle
    if (
      (cells[0][0] === cells[1][1] &&
        cells[0][0] === cells[2][2] &&
        cells[1][1] !== 0) ||
      (cells[2][0] === cells[1][1] &&
        cells[2][0] === cells[0][2] &&
        cells[1][1])
    )
      return 'win';

    // checks for a tie
    let tieFlag = true;
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) if (cells[i][j] === 0) tieFlag = false;
    if (tieFlag) return 'tie';
  };

  return {
    playRound,
    getCurrentPlayer,
  };
})();

const uiController = (() => {
  const board = document.getElementById('game-board');
  const cellElements = document.querySelectorAll('.cell');
  const resultPane = document.getElementById('result');
  const xTurnElement = document.getElementById('x-player');
  const oTurnElement = document.getElementById('o-player');

  const handleCellClick = (e) => {
    if (checkEmpty(e.target)) {
      const col = e.target.dataset.col;
      const row = e.target.dataset.row;
      updateCurrentPlayerUI(e.target);
      GameController.playRound(row, col);
    }
  };

  const displayResultMessage = (mes) => {
    resultPane.classList.add('show-result');
    resultPane.textContent = mes;
    setTimeout(() => {
      resultPane.classList.remove('show-result');
    }, 2000);
  };

  const updateCurrentPlayerUI = (cell) => {
    const sign = GameController.getCurrentPlayer().sign;
    cell.textContent = sign;
    cell.classList.add(`text-${sign.toLowerCase()}`);
  };

  const switchTurn = () => {
    const sign = GameController.getCurrentPlayer().sign;
    const active = document.getElementById(`${sign.toLowerCase()}-player`);
    xTurnElement.classList.remove('active');
    oTurnElement.classList.remove('active');
    active.classList.add('active');
  };

  const clearBoard = () => {
    cellElements.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove('text-o');
      cell.classList.remove('text-x');
    });
  };

  const checkEmpty = (cell) => cell.textContent === '';

  board.addEventListener('click', handleCellClick);

  return {
    displayResultMessage,
    switchTurn,
    clearBoard,
  };
})();
