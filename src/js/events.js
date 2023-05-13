import { Game } from './game';
import { Dom } from './dom';

function initializeListeners() {
  document.addEventListener('DOMContentLoaded', () => Game.initializeNewGame());

  function handleResult() {
    if (Game.checkWin()) {
      Dom.displayResultMessage(`${Game.getWinner().getName()} is the winner`);
    } else if (Game.checkTie()) Dom.displayResultMessage("It's a tie");
  }
  function handleGameOver() {
    handleResult();
    Game.initializeNewGame();
    Dom.clearBoard();
  }

  let isAiPlaying = false;
  function handleCellClick(e) {
    if (isAiPlaying) return;

    if (Dom.checkEmpty(e.target)) {
      const index = e.target.dataset.index;
      Game.playRound(index);
      Dom.setBoard(Game.getCellsValues());
      if (Game.isGameOver()) {
        handleGameOver();
        return;
      }

      if (Game.isAiModeActive()) {
        isAiPlaying = true;
        setTimeout(() => {
          Game.playRound(Game.getAiChoice());
          Dom.setBoard(Game.getCellsValues());
          if (Game.isGameOver()) {
            handleGameOver();
            return;
          }
          isAiPlaying = false;
        }, 1000);
      }
    }
  }
  function handleVsPlayerBtnClick() {
    Game.initializeNewGame();
    Game.deActivateAiMode();
    Dom.clearBoard();
    Dom.toggleGamePage();
  }
  function handleReturnBtnClick() {
    Dom.toggleGamePage();
  }
  function handleVsAiBtnClick() {
    Game.initializeNewGame();
    Game.activateAiMode();
    Dom.clearBoard();
    Dom.toggleGamePage();
  }

  Dom.selectors.vsAiBtn.addEventListener('click', handleVsAiBtnClick);
  Dom.selectors.returnBtn.addEventListener('click', handleReturnBtnClick);
  Dom.selectors.board.addEventListener('click', handleCellClick);
  Dom.selectors.vsPlayerBtn.addEventListener('click', handleVsPlayerBtnClick);
}

export default initializeListeners;
