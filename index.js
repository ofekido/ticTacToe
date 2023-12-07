document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.querySelector(".btnRestart");
  
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
  
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
          restartGame();
        } else if (isBoardFull()) {
          alert("It's a draw!");
          restartGame();
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    }
  
    function updateCell(index) {
      const cell = cells[index];
      cell.textContent = gameBoard[index];
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
      currentPlayer = "X";
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      cells.forEach((cell) => {
        cell.textContent = "";
      });
    }
  });