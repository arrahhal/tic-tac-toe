import { Game } from './game';
import { Dom } from './dom';

export default function initializeListeners() {
  const handleCellClick = (e) => {
    if (Dom.checkEmpty(e.target)) {
      const col = e.target.dataset.col;
      const row = e.target.dataset.row;
      Dom.updateCurrentPlayerUI(e.target);
      Game.playRound(row, col);
    }
  };
  const handleVsPlayerBtnClick = () => {
    Dom.toggleGamePage();
  };
  Dom.selectors.board.addEventListener('click', handleCellClick);
  Dom.selectors.vsPlayerBtn.addEventListener('click', handleVsPlayerBtnClick);
}
