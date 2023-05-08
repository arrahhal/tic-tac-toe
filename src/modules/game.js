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
    (cells[2][0] === cells[1][1] && cells[2][0] === cells[0][2] && cells[1][1])
  )
    return 'win';

  // checks for a tie
  let tieFlag = true;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (cells[i][j] === 0) tieFlag = false;
  if (tieFlag) return 'tie';
};

export default gameController = {
  playRound,
  getCurrentPlayer,
};
