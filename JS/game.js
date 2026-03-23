let score = 0;
let timeLeft = 10;
let timer;
let gameArea = document.getElementById("gameArea");

function randomColor() {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function spawnBox() {
  let box = document.createElement("div");
  box.classList.add("box");

  let x = Math.random() * 350;
  let y = Math.random() * 350;

  box.style.left = x + "px";
  box.style.top = y + "px";
  box.style.backgroundColor = randomColor();

  box.onclick = function () {
    score++;
    document.getElementById("score").innerText = score;
    spawnBox();
  };

  gameArea.innerHTML = "";
  gameArea.appendChild(box);
}

function startGame() {
  score = 0;
  timeLeft = 10;
  document.getElementById("score").innerText = score;
  document.getElementById("time").innerText = timeLeft;

  spawnBox();

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      gameArea.innerHTML = "";
      alert("Game Over! Score: " + score);
    }
  }, 1000);
}
