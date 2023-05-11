import { Game } from './game';
import { Dom } from './dom';

function initializeListeners() {
  document.addEventListener('DOMContentLoaded', () => Game.initializeNewGame());

  const handleCellClick = (e) => {
    if (Dom.checkEmpty(e.target)) {
      const index = e.target.dataset.index;
      Dom.setCellValue(index, Game.getCurrentPlayer().sign);
      const winner = Game.playRound(index);
      if (winner === 'tie') {
        Dom.displayResultMessage("It's a tie");
      } else if (winner) {
        Dom.displayResultMessage(`${winner.name} is the winner`);
      } else return;

      Game.initializeNewGame();
      Dom.clearBoard();
    }
  };
  function handleVsPlayerBtnClick() {
    Dom.toggleGamePage();
  }
  Dom.selectors.board.addEventListener('click', handleCellClick);
  Dom.selectors.vsPlayerBtn.addEventListener('click', handleVsPlayerBtnClick);
}

export default initializeListeners;
