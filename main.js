const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector(".title").innerText = message;
  };

  return {
    renderMessage,
  };
})();

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = (lastMarkIndex) => {
    let boardHTML = "";
    gameboard.forEach((square, index) => {
      if(lastMarkIndex === index){
        boardHTML += `<div class="square" id="square-${index}"><span class="square__mark">${square}</span></div>`;
      } else{
        boardHTML += `<div class="square" id="square-${index}"><span>${square}</span></div>`;
      }

    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const getGameboard = () => gameboard;

  const update = (index, value) => {
    gameboard[index] = value;
    render(index);
  };

  return {
    render,
    update,
    getGameboard,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    
    players = [
      createPlayer(document.querySelector("#player1").value ? document.querySelector("#player1").value : "Player 1", "X"),
      createPlayer(document.querySelector("#player2").value ? document.querySelector("#player2").value : "Player 2", "O"),
    ];

    currentPlayerIndex = 0;
    gameOver = false;

    Gameboard.render();
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    displayController.renderMessage("TIC TAC TOE");
    start();
  };

  const handleClick = (event) => {
    if (gameOver) return;

    let index = parseInt(event.target.id.split("-")[1]);

    if (Gameboard.getGameboard()[index] !== "") return;

    Gameboard.update(index, players[currentPlayerIndex].mark);

    if (checkForWin(Gameboard.getGameboard())) {
      displayController.renderMessage(
        `${players[currentPlayerIndex].name} wins!`
      );
      gameOver = true;
    } else if (checkForTie(Gameboard.getGameboard())) {
      displayController.renderMessage("It's a Tie!");
      gameOver = true;
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  return {
    start,
    restart,
    handleClick,
  };
})();

function checkForWin(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkForTie(board) {
  return board.every((cell) => cell !== "");
}

const startBtn = document.querySelector("#start-button");
startBtn.addEventListener("click", () => {
  Game.start();
});

const restartBtn = document.querySelector("#restart-button");
restartBtn.addEventListener("click", () => {
  Game.restart();
});
