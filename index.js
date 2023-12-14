document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll(".cell");
  const restartButton = document.querySelector(".btnRestart");
  const playerTurnElement = document.querySelector(".playerTurn");
  const countdownTimerElement = document.getElementById("countdownTimer");

  const PLAYER_IDO = "Ido";
  const PLAYER_DAVID = "David";
  const TIMEOUT_DURATION = 30000;

  let currentPlayer = PLAYER_IDO;
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let timeout;

  displayRules();

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
  });

  restartButton.addEventListener("click", restartGame);

  function updateCountdownDisplay(seconds) {
    countdownTimerElement.textContent = seconds;
  }

  function updatePlayerTurn() {
    playerTurnElement.textContent = `${currentPlayer}'s turn`;
  }

  function handleCellClick(index) {
    if (gameBoard[index] === "" && !isGameOver()) {
      clearTimeout(timeout);

      gameBoard[index] = currentPlayer;
      updateCell(index);

      if (checkWinner()) {
        setTimeout(() => {
          alert(`${currentPlayer} is the winner!`);
          restartGame();
        }, 100);
      } else if (isBoardFull()) {
        alert("It's a draw!");
        restartGame();
      } else {
        currentPlayer = currentPlayer === PLAYER_IDO ? PLAYER_DAVID : PLAYER_IDO;

        updatePlayerTurn();

        clearTimeout(timeout);
        startCountdown();
      }
    }
  }

  function updateCell(index) {
    const cell = cells[index];
    cell.innerHTML = "";

    const image = document.createElement("img");
    image.classList.add("image");
    image.src = currentPlayer === PLAYER_IDO ? "assets/idoX.jpg" : "assets/davidO.jpg";
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
    clearTimeout(timeout);

    currentPlayer = currentPlayer === PLAYER_IDO ? PLAYER_DAVID : PLAYER_IDO;

    gameBoard = ["", "", "", "", "", "", "", "", ""];

    cells.forEach((cell) => {
      cell.innerHTML = "";
    });

    updatePlayerTurn();

    startCountdown();

    displayRules();
  }

  function displayRules() {
    alert("Welcome to Tic Tac Toe Battle!\n\nRules:\n1. Click on a cell to place your symbol (Ido or David).\n2. The first player to get three in a row wins!\n3. If the board is full and no one has three in a row, it's a draw.\n4. If there is no move within 30 seconds, you lose, and the opponent wins.\n\nLet the battle begin!!!!");
  }


  function getOpponent(player) {
    return player === PLAYER_IDO ? PLAYER_DAVID : PLAYER_IDO;
  }

  function startCountdown() {
    let secondsRemaining = TIMEOUT_DURATION / 1000;

    function updateTimer() {
      updateCountdownDisplay(secondsRemaining);
      secondsRemaining--;

      if (secondsRemaining < 0) {
        alert(`30 seconds have passed! ${getOpponent(currentPlayer)} is the winner!`);
        restartGame();
      } else {
        timeout = setTimeout(updateTimer, 1000);
      }
    }

    updateTimer();
  }

  startCountdown();
});
