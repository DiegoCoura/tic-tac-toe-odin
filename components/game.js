import { Gameboard } from "./Gameboard.js";

export function game() {

  const mainContent = document.getElementById("main-content");

  const newBoard = Gameboard();

  mainContent.appendChild(newBoard);

  const cells = document.querySelectorAll(".cell");

  for (let cell of cells) {
    cell.addEventListener("click", () => placeMove(cell));
  }


  let currentPlayer = "Player 1";
  let moves = [];
  let winner;
  let isGameOn = true;

  function placeMove(position) { 
    
    if(!isGameOn) return; 

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

    if(winner === "X"){
      console.log("Player 1")
      isGameOn = false
    } else if(winner === "O"){
      console.log("Player 2")
      isGameOn = false
    } else if(moves.length === 9 && !winner){
      console.log("draw")
      isGameOn = false;
    }
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

    for (let i = 0; i < combs.length; i++) {
      const [a, b, c] = combs[i];

      if (
        cells[a].innerText &&
        cells[a].innerText === cells[b].innerText &&
        cells[a].innerText === cells[c].innerText
      ) {
        isGameOn = false;
        return winner = cells[a].innerText;
      }
    }    
    return null;
  }
}
