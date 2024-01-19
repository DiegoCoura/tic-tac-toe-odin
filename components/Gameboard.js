export function Gameboard() {

  const boardSize = 9;

  const board = document.createElement("div")
  board.classList.add("board");

  for (let i = 1; i <= boardSize; i++) {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", `${i}`);
    newDiv.classList.add("cell");
    board.appendChild(newDiv);
  }
  return board;
}
