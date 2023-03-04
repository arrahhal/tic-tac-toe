const GameBoard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  const initNewBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) board[i].push(Cell());
    }
  };
  initNewBoard();

  const getBoard = () => board;

  const holdValue = (row, column, player) => {
    const cell = board[row][column];
    if (cell.getValue() != 0) {
      console.log(`this position is reserved`);
      return 'reserved';
    }
    cell.setValue(player);
  };

  const printBoard = () => {
    console.table(getCellValues());
  };
  const getCellValues = () =>
    board.map((row) => row.map((cell) => cell.getValue()));
  return {
    getBoard,
    holdValue,
    printBoard,
    getCellValues,
    initNewBoard,
  };
})();

function Cell() {
  let value = 0;

  setValue = (newValue) => (value = newValue);
  getValue = () => value;
  return {
    setValue,
    getValue,
  };
}

const GameController = (() => {
  const players = [
    {
      name: 'Player X',
      sign: 'X',
    },
    {
      name: 'Player O',
      sign: 'O',
    },
  ];
  let activePlayer = players[0];
  const switchPlayers = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    GameBoard.printBoard();
    console.log(`${activePlayer.name}'s new  turn...`);
  };

  const playRound = (row, column) => {
    if (GameBoard.holdValue(row, column, activePlayer.sign) === 'reserved')
      return;
    checkWin();
    switchPlayers();
    printNewRound();
  };

  const logWinner = (player) => {
    console.log(`${player.name} is the winner.`);
    endGame();
  };
  const logTie = () => {
    console.log(`It is a tie.`);
    endGame();
  }
  const endGame = () => {
    activePlayer = players[0];
    GameBoard.initNewBoard();
  };
  const checkWin = () => {
    const board = GameBoard.getCellValues();

    //check rows for winner
    board.map((row) => {
      if (row[0] === row[1] && row[0] === row[2] && row[0] !== 0) {
        logWinner(row[0] === 'X' ? players[0] : players[1]);
        return;
      }
    });

    // check columns for winner
    for (let col = 0; col < 3; col++) {
      if (
        board[0][col] === board[1][col] &&
        board[0][col] === board[2][col] &&
        board[0][col] !== 0
      ) {
        logWinner(board[0][col] === 'X' ? players[0] : players[1]);
        GameBoard.initNewBoard();
        return;
      }
    }

    //checks 3-on-angle
    if (
      (board[0][0] === board[1][1] && board[0][0] === board[2][2]) && board[1][1] !== 0 ||
      (board[2][0] === board[1][1] && board[2][0] === board[0][2]) && board[1][1]
    ) {
      logWinner(board[1][1] == 'X' ? players[0] : players[1]);
      return;
    }
    
    // checks for a tie
    for(let i = 0; i < 3; i++)
      for(let j = 0; j < 3; j++)
        if(board[i][j] === 0) return;
    logTie();
  };

  return {
    playRound,
    getActivePlayer,
  };
})();
