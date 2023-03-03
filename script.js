const Gameboard = (()=> {
  const rows = 3;
  const columns = 3;
  const board = [];

  for(let i = 0; i < rows; i++){
    board[i] = [];
    for(let j = 0; j < columns; i++)
      board[i].push(Cell());
  }

  const getBoard = ()=> board;

  const holdValue = (row, column, player)=> {
    const cell = board[row[column]];
    if(cell.getValue != 0) return;
    cell.setValue = player.getSign;
  }

  const printBoard = ()=> {
    const cellValuesBoard = board.map(row => row.map(cell => cell.getValue));
    console.table(cellValuesBoard);
  }
  return {
    getBoard,
    holdValue,
    printBoard
  }
})();

const Cell = ()=> {
  let value = 0;

  setValue = (newValue)=> value = newValue;
  getValue = ()=> value;
  return {
    setValue,
    getValue
  }
}