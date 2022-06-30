const canvas = document.querySelector('#gameCanvas');
const canvas_ctx = canvas.getContext('2d');

const snakeColor = 'blue';

const background = 'white';
const border = 'white';

let snake = [
  {x: 100, y: 100}
];
let velocity = 5;

initialize();
function initialize() {
  for(let i = 0; i < 10; i++) {
    const body = {x: snake[snake.length], y: snake[snake.length]};
    snake.unshift(body);
  }
}

let gameOver = false;

loop();
function loop() {
  if(gameOver) {

  } else {
    setTimeout(function onTick() {
      clearCanvas();

      loop();
    }, 100)
  }
}

function clearCanvas() {
  canvas_ctx.fillstyle = background;
  canvas_ctx.strokestyle = border;
  canvas_ctx.fillRect(0, 0, canvas.width, canvas.height);
  //canvas_ctx.strokeRect(0, 0, canvas.width, canvas.height);
}
