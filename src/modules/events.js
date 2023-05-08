export default function initializeListeners() {
  const handleCellClick = (e) => {
    if (checkEmpty(e.target)) {
      const col = e.target.dataset.col;
      const row = e.target.dataset.row;
      updateCurrentPlayerUI(e.target);
      GameController.playRound(row, col);
    }
    board.addEventListener('click', handleCellClick);
  };
}
