let activePlayer = 'X';
let selectedSquares = [];

// Place X or O
function placeXOrO(squareNumber) {
  if (!selectedSquares.some((el) => el.includes(squareNumber))) {
    let select = document.getElementById(squareNumber);
    select.style.backgroundImage =
      activePlayer === 'X' ? "url('images/x.png')" : "url('images/o.png')";
    selectedSquares.push(squareNumber + activePlayer);

    checkWinConditions();

    activePlayer = activePlayer === 'X' ? 'O' : 'X';
    audio('./media/place.mp3');

    if (activePlayer === 'O') {
      disableClick();
      setTimeout(() => computersTurn(), 1000);
    }
    return true;
  }
  return false;
}

// Computer turn
function computersTurn() {
  let success = false;
  let pickASquare;
  while (!success) {
    pickASquare = String(Math.floor(Math.random() * 9));
    if (placeXOrO(pickASquare)) {
      success = true;
    }
  }
}

// Check wins
function checkWinConditions() {
  if (arrayIncludes('0X', '1X', '2X')) {
    drawWinLine(50, 100, 558, 100);
  } else if (arrayIncludes('3X', '4X', '5X')) {
    drawWinLine(50, 304, 558, 304);
  } else if (arrayIncludes('6X', '7X', '8X')) {
    drawWinLine(50, 508, 558, 508);
  } else if (arrayIncludes('0X', '3X', '6X')) {
    drawWinLine(100, 50, 100, 558);
  } else if (arrayIncludes('1X', '4X', '7X')) {
    drawWinLine(304, 50, 304, 558);
  } else if (arrayIncludes('2X', '5X', '8X')) {
    drawWinLine(508, 50, 508, 558);
  } else if (arrayIncludes('6X', '4X', '2X')) {
    drawWinLine(100, 508, 510, 90);
  } else if (arrayIncludes('0X', '4X', '8X')) {
    drawWinLine(100, 100, 520, 520);
  } else if (arrayIncludes('0O', '1O', '2O')) {
    drawWinLine(50, 100, 558, 100);
  } else if (arrayIncludes('3O', '4O', '5O')) {
    drawWinLine(50, 304, 558, 304);
  } else if (arrayIncludes('6O', '7O', '8O')) {
    drawWinLine(50, 508, 558, 508);
  } else if (arrayIncludes('0O', '3O', '6O')) {
    drawWinLine(100, 50, 100, 558);
  } else if (arrayIncludes('1O', '4O', '7O')) {
    drawWinLine(304, 50, 304, 558);
  } else if (arrayIncludes('2O', '5O', '8O')) {
    drawWinLine(508, 50, 508, 558);
  } else if (arrayIncludes('6O', '4O', '2O')) {
    drawWinLine(100, 508, 510, 90);
  } else if (arrayIncludes('0O', '4O', '8O')) {
    drawWinLine(100, 100, 520, 520);
  } else if (selectedSquares.length >= 9) {
    audio('./media/tie.mp3');
    setTimeout(() => resetGame(), 1000);
  }

  function arrayIncludes(a, b, c) {
    const x = selectedSquares.includes(a);
    const y = selectedSquares.includes(b);
    const z = selectedSquares.includes(c);
    return x && y && z;
  }
}

// Sound
function audio(audioURL) {
  let audio = new Audio(audioURL);
  audio.play();
}

// Disable clicks temporarily
function disableClick() {
  document.body.style.pointerEvents = 'none';
  setTimeout(() => {
    document.body.style.pointerEvents = 'auto';
  }, 1000);
}

// Draw win line
function drawWinLine(x1, y1, x2, y2) {
  const canvas = document.getElementById('win-lines');
  const c = canvas.getContext('2d');
  let x = x1,
    y = y1;

  function animateLineDrawing() {
    const animationLoop = requestAnimationFrame(animateLineDrawing);
    c.clearRect(0, 0, 608, 608);
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x, y);
    c.lineWidth = 10;
    c.strokeStyle = 'rgba(70,255,33,0.8)';
    c.stroke();
    if (x1 <= x2 && y1 <= y2) {
      if (x < x2) {
        x += 10;
      }
      if (y < y2) {
        y += 10;
      }
      if (x >= x2 && y >= y2) {
        cancelAnimationFrame(animationLoop);
      }
    }
  }
  animateLineDrawing();
  disableClick();
  audio('./media/winGame.mp3');
  setTimeout(() => resetGame(), 1500);
}

// Reset board
function resetGame() {
  for (let i = 0; i < 9; i++) {
    let square = document.getElementById(String(i));
    square.style.backgroundImage = '';
  }
  selectedSquares = [];
}
