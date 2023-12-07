document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll(".cell");
  const restartButton = document.querySelector(".btnRestart");

  let currentPlayer = "Ido";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let timeout;

  // Display rules when the page loads
  displayRules();

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
  });

  restartButton.addEventListener("click", restartGame);

  function handleCellClick(index) {
    if (gameBoard[index] === "" && !isGameOver()) {
      clearTimeout(timeout); // Clear the previous timeout

      gameBoard[index] = currentPlayer;
      updateCell(index);
      if (checkWinner()) {
        alert(`${currentPlayer} is the winner!`);
        restartGame();
      } else if (isBoardFull()) {
        alert("It's a draw!");
        restartGame();
      } else {
        // Switch player for the next turn
        currentPlayer = currentPlayer === "Ido" ? "David" : "Ido";

        // Set timeout for the next move
        timeout = setTimeout(() => {
          alert(`${currentPlayer} took too long! ${getOpponent(currentPlayer)} wins!`);
          restartGame();
        }, 30000);
      }
    }
  }

  function updateCell(index) {
    const cell = cells[index];
    cell.innerHTML = "";

    const image = document.createElement("img");
    image.classList.add("image");
    image.src = currentPlayer === "Ido" ? "assets/idoX.jpg" : "assets/davidO.jpg";
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
    clearTimeout(timeout); // Clear the current timeout

    // Switch player for the next game
    currentPlayer = currentPlayer === "Ido" ? "David" : "Ido";
    
    // Reset the game board
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    
    // Clear the cells
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });

    // Display rules after restart
    displayRules();
  }

  function displayRules() {
    alert("Welcome to Tic Tac Toe Battle!\n\nRules:\n1. Click on a cell to place your symbol (Ido or David).\n2. The first player to get three in a row wins!\n3. If the board is full and no one has three in a row, it's a draw.\n4. If no move in 30 seconds, you lose, and the opponent wins.\n\nLet the battle begin!!!!");
  }
 
  function getOpponent(player) {
    return player === "Ido" ? "David" : "Ido";
  }
});
