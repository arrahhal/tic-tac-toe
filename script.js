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

  window.addEventListener('DOMContentLoaded', initNewBoard);

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
  let winner = '';
  let activePlayer = players[0];

  const switchPlayers = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    uiController.switchTurn();
  };
  const getActivePlayer = () => activePlayer;

  const playRound = (row, column) => {
    if (GameBoard.holdValue(row, column, activePlayer.sign) === 'reserved')
      return;
    switchPlayers();
    checkWin();
  };

  const getResultMes = () =>
    winner === '' ? 'It is a tie! ' : `${winner} is the winner`;

  const setWinner = (player) => {
    winner = player.name;
    const mes = getResultMes();
    uiController.showResult(mes);
    initNewGame();
  };
  const logTie = () => {
    uiController.showResult();
    initNewGame();
  };
  const initNewGame = () => {
    activePlayer = players[0];
    GameBoard.initNewBoard();
    uiController.clearBoard();
  };
  const checkWin = () => {
    const board = GameBoard.getCellValues();

    //check rows for winner
    board.map((row) => {
      if (row[0] === row[1] && row[0] === row[2] && row[0] !== 0) {
        setWinner(row[0] === 'X' ? players[0] : players[1]);
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
        setWinner(board[0][col] === 'X' ? players[0] : players[1]);
        GameBoard.initNewBoard();
        return;
      }
    }

    //checks 3-on-angle
    if (
      (board[0][0] === board[1][1] &&
        board[0][0] === board[2][2] &&
        board[1][1] !== 0) ||
      (board[2][0] === board[1][1] &&
        board[2][0] === board[0][2] &&
        board[1][1])
    ) {
      setWinner(board[1][1] == 'X' ? players[0] : players[1]);
      return;
    }

    // checks for a tie
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) if (board[i][j] === 0) return;
    logTie();
  };

  return {
    playRound,
    getActivePlayer
  };
})();

const uiController = (() => {
  const board = document.getElementById('game-board');
  const boardCells = document.querySelectorAll('.cell');
  const resultPane = document.getElementById('result');
  const xTurn = document.getElementById('x-player');
  const oTurn = document.getElementById('o-player');

  const handleClicks = (e)=> {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    printSign(e.target);
    GameController.playRound(row, col);
  }
  board.addEventListener('click', handleClicks);

  const showResult = (mes) => {
    resultPane.classList.add('show-result');
    resultPane.textContent = mes;
    setTimeout(() => {
      resultPane.classList.remove('show-result');
    }, 2000);
  };

  const printSign = (cell) => {
    const sign = GameController.getActivePlayer().sign;
    cell.textContent = sign;
    cell.classList.add(`text-${sign.toLowerCase()}`);
  };

  const switchTurn = () => {
    const sign = GameController.getActivePlayer().sign;
    const active = document.getElementById(`${sign.toLowerCase()}-player`);
    xTurn.classList.remove('active');
    oTurn.classList.remove('active');
    active.classList.add('active');
  };

  const clearBoard = () => {
    boardCells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('text-o');
      cell.classList.remove('text-x');
    })
  }

  return {
    showResult,
    switchTurn,
    clearBoard
  };
})();
