let score = 0;
let timeLeft = 10;
let timer;
let gameArea = document.getElementById("gameArea");
let highScore = localStorage.getItem("highScore") || 0;

// สุ่มสี
function randomColor() {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

// สร้างกล่อง
function spawnBox() {
  if (timeLeft <= 0) return;

  let box = document.createElement("div");
  box.classList.add("box");

  let x = Math.random() * 350;
  let y = Math.random() * 350;

  box.style.left = x + "px";
  box.style.top = y + "px";
  box.style.backgroundColor = randomColor();

  box.onclick = function () {
    if (timeLeft <= 0) return;

    score++;
    document.getElementById("score").innerText = score;
    spawnBox();
  };

  gameArea.innerHTML = "";
  gameArea.appendChild(box);
}

// เริ่มเกม
function startGame() {
  clearInterval(timer); // กันกดซ้ำ

  score = 0;
  timeLeft = 10;

  document.getElementById("score").innerText = score;
  document.getElementById("time").innerText = timeLeft;

  document.getElementById("gameOverModal").style.display = "none";

  spawnBox();

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      endGame();
      return;
    }

    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
  }, 1000);
}

// จบเกม
function endGame() {
  clearInterval(timer);
  timeLeft = 0;
  document.getElementById("time").innerText = 0;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }

  document.getElementById("finalScore").innerText = score;
  document.getElementById("highScore").innerText = highScore;

  document.getElementById("gameOverModal").style.display = "flex";
}

// เล่นใหม่
function restartGame() {
  startGame();
}
