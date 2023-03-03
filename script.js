const GameBoard = (()=> {
  const rows = 3;
  const columns = 3;
  const board = [];

  for(let i = 0; i < rows; i++){
    board[i] = [];
    for(let j = 0; j < columns; j++)
      board[i].push(Cell());
  }

  const getBoard = ()=> board;

  const holdValue = (row, column, player)=> {
    const cell = board[row[column]];
    if(cell.getValue != 0){
      console.log(`this position is reserved`)
      return;
    }
    cell.setValue = player;
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

function Cell() {
  let value = 0;

  setValue = (newValue)=> value = newValue;
  getValue = ()=> value;
  return {
    setValue,
    getValue
  }
}

const GameController = (()=> {
  const player1 = 'Player X';
  const player2 = 'Player O';

  const players = [
    {
      name: player1,
      sign: 'X'
    },
    {
      name: player2,
      sign: 'O'
    }
  ];
  let activePlayer = players[0];
  const switchPlayers = ()=> {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }
  const getActivePlayer = ()=> activePlayer;

  const printNewRound = ()=> {
    GameBoard.printBoard();
    console.log(`${activePlayer}'s new  turn...`);
  }
  const playRound = (row, column)=> {
    GameBoard.holdValue(row, column, activePlayer);
    printNewRound();
    switchPlayers();
  }
  return {
    playRound,
    getActivePlayer,
  }
})();