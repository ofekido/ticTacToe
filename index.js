document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll(".cell");
  const restartButton = document.querySelector(".btnRestart");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let turnCount = 0;

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
  });

  restartButton.addEventListener("click", restartGame);

  function handleCellClick(index) {
    if (gameBoard[index] === "" && !isGameOver()) {
      gameBoard[index] = currentPlayer;
      updateCell(index);
      if (checkWinner()) {
        alert(`${currentPlayer} is the winner!`);
      } else if (isBoardFull()) {
        alert("It's a draw!");
      } else {
        // Switch player for the next turn
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnCount++;
      }
    }
  }

  function updateCell(index) {
    const cell = cells[index];
    cell.innerHTML = "";

    const image = document.createElement("img");
    image.classList.add("image");
    image.src = currentPlayer === "X" ? "../assets/idoX.jpg" : "../assets/davidO.jpg";
    image.alt = currentPlayer;

    cell.appendChild(image);
  }

  function checkWinner() {
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

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameBoard[a] !== "" &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        return true;
      }
    }

    return false;
  }

  function isBoardFull() {
    return !gameBoard.includes("");
  }

  function isGameOver() {
    return checkWinner() || isBoardFull();
  }

  function restartGame() {
    currentPlayer = turnCount % 2 === 0 ? "X" : "O";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });
    turnCount = 0;
  }
});
