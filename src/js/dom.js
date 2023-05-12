const selectors = {
  vsPlayerBtn: document.getElementById('start-page__vsplayer-btn'),
  returnBtn: document.getElementById('game-page__return-btn'),
  board: document.getElementById('game-board'),
  cellElements: document.querySelectorAll('.cell'),
  resultPane: document.getElementById('result'),
  xTurnElement: document.getElementById('x-player'),
  oTurnElement: document.getElementById('o-player'),
  startPage: document.getElementById('start-page'),
  gamePage: document.getElementById('game-page'),
};

function displayResultMessage(message) {
  selectors.resultPane.classList.add('show-result');
  selectors.resultPane.textContent = message;
  setTimeout(() => {
    selectors.resultPane.classList.remove('show-result');
  }, 2000);
}

function setCellValue(cellIndex, value) {
  const cell = document.querySelector(`.cell[data-index="${cellIndex}"]`);
  cell.textContent = value;
  cell.classList.add(`text-${value.toLowerCase()}`);
}

function clearBoard() {
  selectors.cellElements.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('text-o', 'text-x');
  });
}

function checkEmpty(cell) {
  return cell.textContent === '';
}
function toggleGamePage() {
  selectors.startPage.classList.toggle('is-hidden');
  selectors.gamePage.classList.toggle('is-hidden');
}

export const Dom = {
  selectors,
  displayResultMessage,
  clearBoard,
  checkEmpty,
  toggleGamePage,
  setCellValue,
};
