let score = 0;
let timeLeft = 10;
let timer;
let gameArea = document.getElementById("gameArea");
let highScore = localStorage.getItem("highScore") || 0;

// เริ่มเกม
function startGame() {
  score = 0;
}

// สุ่มสี
function randomColor() {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

// สร้างกล่อง (แก้ bug แล้ว)
function spawnBox() {
  if (timeLeft <= 0) return;

  let oldBox = document.querySelector(".box");
  if (oldBox) oldBox.remove();

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

  gameArea.appendChild(box);
}

// เริ่มเกม
function startGame() {
  clearInterval(timer);

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
function exitGame() {
  // ซ่อน popup
  document.getElementById("gameOverModal").style.display = "none";

  // ล้างกล่องเกม
  gameArea.innerHTML = "";

  // รีเซ็ตค่า
  document.getElementById("score").innerText = 0;
  document.getElementById("time").innerText = 10;

  // หยุด timer
  clearInterval(timer);
}
