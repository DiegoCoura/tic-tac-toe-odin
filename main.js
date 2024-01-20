import { game } from "./components/game.js";

const mainContent = document.getElementById("main-content");

let gameStatus = false;

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function playGame() {
  gameStatus = true;
  removeChildNodes(mainContent);
  const showBoard = game();
}

function showMenu() {

  const menu = document.createElement("div");
  menu.setAttribute("id", "menu");
  const startBtn = document.createElement("button");
  startBtn.classList.add("start-button");
  startBtn.innerText = "Start";
  startBtn.addEventListener("click", () => playGame());

  menu.appendChild(startBtn);
  mainContent.appendChild(menu);

}

if (gameStatus === false) {
  showMenu();
} else if (gameStatus === true) {
  mainContent.removeChildNodes();
  mainContent.appendChild(gameIsOn);
  console.log("gameStatus true");
}