const board = document.getElementById('game-board');
const cellElements = document.querySelectorAll('.cell');
const resultPane = document.getElementById('result');
const xTurnElement = document.getElementById('x-player');
const oTurnElement = document.getElementById('o-player');

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

export default uiController = {
  displayResultMessage,
  switchTurn,
  clearBoard,
};
