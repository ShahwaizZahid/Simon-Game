let buttons = document.querySelectorAll(".panel");
let score = document.querySelector(".Score-count");
let level = document.querySelector(".Level-count");
let Level = 1;
let Score = 0;
let play = false;
let randomSequence = [];
let listener = false;

for (let i = 0; i < 20; i++) {
  randomSequence.push(Math.floor(Math.random() * buttons.length));
}

let startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startTheGame);

function startTheGame() {
  play = true;
  start();
  startBtn.removeEventListener("click", startTheGame);
}

function start() {
  if (play) {
    let currentIndex = 0;
    let interval = setInterval(() => {
      let rSequence = buttons[randomSequence[currentIndex]];
      rSequence.classList.add("bright");
      setTimeout(() => {
        rSequence.classList.remove("bright");
      }, 800);
      currentIndex++;

      if (currentIndex === Level) {
        clearInterval(interval);
        buttons.forEach((box) => {
          box.removeEventListener("click", playerInput);
          box.addEventListener("click", playerInput);
        });
      }
    }, 1000);
  }
}

function playerInput() {
  if (!play) return;

  let expectedValue = randomSequence[Score];
  this.classList.add("bright");
  setTimeout(() => {
    this.classList.remove("bright");
  }, 1000);

  if (this === buttons[expectedValue]) {
    Score++;
    score.textContent = Score;
    setTimeout(() => {
      if (Score === Level) {
        Level++;
        level.textContent = Level;
        Score = 0;
        score.textContent = Score;
        if (Level == randomSequence.length) {
          alert("win");
          window.location.reload();
        }
        start();
      }
    }, 1000);
  } else {
    play = false;
    alert("You Lose the on Level " + Level);
    window.location.reload();
    return;
  }

  if (Score >= Level) {
    buttons.forEach((box) => {
      box.removeEventListener("click", playerInput);
    });
  }
}
