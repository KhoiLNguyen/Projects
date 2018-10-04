let numSquares = 6;
let colors = []; 
let pickedColor;
let squares = document.querySelectorAll('.square');
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.getElementById('message');
let h1 = document.querySelector('h1');
let resetBtn = document.querySelector('#reset');
let modeBtns = document.querySelectorAll(".mode");

init();

function init() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons() {
  for(let i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener('click', function() {
      modeBtns[0].classList.remove("selected");
      modeBtns[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
}

function setUpSquares() {
  for(let i = 0; i < squares.length; i++) {
    //add click listeners to squares
    squares[i].addEventListener('click', function() {
      //grab color of clicked square
      let clickedColor = this.style.backgroundColor;
      if(clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColor(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetBtn.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again!";
      }
    });
  }
}


function reset() {
  resetBtn.textContent = "New Colors";
  // generate all new colors
  colors = generateRandomColors(numSquares);
  
  // pick a new random color from array
  pickedColor = pickColor();
  
  // change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;

  messageDisplay.textContent = '';
  // change colors of squares
  for(let i = 0; i < squares.length; i++) {
    if(colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = 'steelblue'
}

resetBtn.addEventListener('click', function(){
  reset();
});;

function changeColor() {
  //loop through all squares
  for(let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = pickedColor;
  }
  //change each color to match given color
}

function pickColor() {
  let random = Math.floor(Math.random() * colors.length);

  return colors[random];
}

function generateRandomColors(num) {
  //make an array
  let arr = [];

  //add num random colors to array
  for(let i = 0; i < num; i++) {
    // get random colors and push into array
    arr.push(randomColor());
  }

  return arr;
}

function randomColor() {
  // pick red from 0 to 255
  let r = Math.floor(Math.random() * 256);
  // pick green from 0 to 255
  let g = Math.floor(Math.random() * 256);
  // pick blue from 0 to 255
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}