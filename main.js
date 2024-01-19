import { Gameboard } from "./components/Gameboard.js";

const mainContent = document.getElementById("main-content");

const newBoard = Gameboard();

mainContent.appendChild(newBoard);