import { Gameboard } from "./components/Gameboard.js";

const mainContent = document.getElementById("main-content");

const newBoard = Gameboard();

mainContent.appendChild(newBoard);

let currentPlayer = "Player 1";
let moves = [];
let winner = ""

function placeMove(position) {
  let currentCell = position;

  if (currentCell.innerText) return;

  if (currentPlayer === "Player 1") {
    currentCell.innerText = "X";
    currentPlayer = "Player 2";
  } else if (currentPlayer === "Player 2") {
    currentCell.innerText = "O";
    currentPlayer = "Player 1";
  }
  moves.push(`${currentCell.innerText}: ${currentCell.id}`);

  moves.length >= 5 ? checkWinner() : "";

  if(checkWinner){
    console.log(winner)
  }
  
}

const cells = document.querySelectorAll(".cell");

for (let cell of cells) {
  cell.addEventListener("click", () => placeMove(cell));
}

function checkWinner() {
  const combs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let i = 0; i < combs.length; i++){
    const [a, b, c] = combs[i];

    if(cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText){
        if(cells[a].innerText === "X"){
            winner = "Player 1"
        } else{
            winner = "Player 2"
        }
        return winner;
    }
  }
  return null;
}