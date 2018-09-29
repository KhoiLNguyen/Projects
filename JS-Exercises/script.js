let p1Btn = document.querySelector('#p1');
let p2Btn = document.querySelector('#p2');
let p1Display = document.querySelector('#p1Display');
let p2Display = document.querySelector('#p2Display');
let resetBtn = document.querySelector('#reset');
let numInput = document.querySelector('input');
let winningScoreDisplay = document.querySelector("#matchNum");

let p1Score = 0;
let p2Score = 0;
let matchNum = 5;
let gameOver = false;

p1Btn.addEventListener("click", function() {
  if(!gameOver) {
    p1Score++;
    if(p1Score === matchNum) {
      p1Display.classList.add('winner');
      gameOver = true;
    }
    p1Display.textContent = p1Score;
  }

});

p2Btn.addEventListener("click", function() {
  if(!gameOver) {
    p2Score++;
    if(p2Score === matchNum) {
      p2Display.classList.add('winner');
      gameOver = true;
    }
    p2Display.textContent = p2Score;
  }

});

resetBtn.addEventListener("click", function() {
  p1Score = 0;
  p2Score = 0;
  p1Display.classList.remove('winner');
  pwDisplay.classList.remove('winner');
  p1Display.textContent = p1Score;
  p2Display.textContent = p2Score;
  gameOver = false;
});

numInput.addEventListener('change', function() {
  winningScoreDisplay.textContent = this.value;
  matchNum = parseInt(this.value);
});