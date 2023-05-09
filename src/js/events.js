import { GameController } from './game';
import { uiController } from './dom';

export default function initializeListeners() {
  const handleCellClick = (e) => {
    if (uiController.checkEmpty(e.target)) {
      const col = e.target.dataset.col;
      const row = e.target.dataset.row;
      uiController.updateCurrentPlayerUI(e.target);
      GameController.playRound(row, col);
    }
    uiController.board.addEventListener('click', handleCellClick);
  };
}
