import { Game } from './game';

const selectors = {
  vsPlayerBtn: document.getElementById('start-page__vsplayer-btn'),
  board: document.getElementById('game-board'),
  cellElements: document.querySelectorAll('.cell'),
  resultPane: document.getElementById('result'),
  xTurnElement: document.getElementById('x-player'),
  oTurnElement: document.getElementById('o-player'),
  startPage: document.getElementById('start-page'),
  gamePage: document.getElementById('game-page'),
};

const displayResultMessage = (mes) => {
  selectors.resultPane.classList.add('show-result');
  selectors.resultPane.textContent = mes;
  setTimeout(() => {
    selectors.resultPane.classList.remove('show-result');
  }, 2000);
};

const updateCurrentPlayerUI = (cell) => {
  const sign = Game.getCurrentPlayer().sign;
  cell.textContent = sign;
  cell.classList.add(`text-${sign.toLowerCase()}`);
};

const switchTurn = () => {
  const sign = Game.getCurrentPlayer().sign;
  const active = document.getElementById(`${sign.toLowerCase()}-player`);
  selectors.xTurnElement.classList.remove('active');
  selectors.oTurnElement.classList.remove('active');
  active.classList.add('active');
};

const clearBoard = () => {
  selectors.cellElements.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('text-o');
    cell.classList.remove('text-x');
  });
};

const checkEmpty = (cell) => cell.textContent === '';

const toggleGamePage = () => {
  selectors.startPage.classList.toggle('is-hidden');
  selectors.gamePage.classList.toggle('is-hidden');
};

export const Dom = {
  selectors,
  displayResultMessage,
  switchTurn,
  clearBoard,
  updateCurrentPlayerUI,
  checkEmpty,
  toggleGamePage,
};
