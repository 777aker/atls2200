// define the canvas
const snakeCanvas = document.querySelector("#gameCanvas");
const snakeCanvas_ctx = snakeCanvas.getContext("2d");

// define some colors
const board_border = 'black';
const board_background = 'white';
const snake_col = 'lightblue';
const snake_border = 'darkblue';

// snake velocity
let dx = 10;
let dy = 0;
let velocity = 1;
let changing_direction = false;

document.addEventListener("keydown", changeDirection);

let score = 0;

let food_x;
let food_y;

// define the snake
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 }
];

// start the game
start();
gen_food();
function start() {
  if(has_game_ended()) return;

  changing_direction = false;
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    start();
  }, 100)
}

// clear canvas and draw border around it
function clearCanvas() {
  snakeCanvas_ctx.fillStyle = board_background;
  snakeCanvas_ctx.strokestyle = board_border;
  snakeCanvas_ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
  snakeCanvas_ctx.strokeRect(0, 0, snakeCanvas.width, snakeCanvas.height);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
  snakeCanvas_ctx.fillStyle = snake_col;
  snakeCanvas_ctx.strokestyle = snake_border;
  snakeCanvas_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  snakeCanvas_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  const has_eaten = snake[0].x === food_x && snake[0].y === food_y;
  if(has_eaten) {
    score += 1;
    document.querySelector('#score').innerHTML = score;
    gen_food();
  } else {
    snake.pop();
  }
}

function has_game_ended() {
  for(let i = 4; i < snake.length; i++) {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
      return;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeCanvas.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeCanvas.height - 10;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if(changing_direction) return;
  changing_direction = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if(keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if(keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if(keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if(keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function drawFood() {
  snakeCanvas_ctx.fillStyle = 'lightgreen';
  snakeCanvas_ctx.strokestyle = 'darkgreen';
  snakeCanvas_ctx.fillRect(food_x, food_y, 10, 10);
  snakeCanvas_ctx.strokeRect(food_x, food_y, 10, 10);
}

function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food() {
  food_x = random_food(0, snakeCanvas.width - 10);
  food_y = random_food(0, snakeCanvas.height - 10);
  snake.forEach(function has_snake_eaten(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}
