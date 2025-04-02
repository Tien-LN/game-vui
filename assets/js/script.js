// Snake
const cvs_snake = document.getElementById("snake");
const ctx_snake = cvs_snake.getContext("2d");

const unit_snake = 32;

const foodImg = new Image();
foodImg.src = "assets/images/apple.png";

let food = {
    x : Math.floor(Math.random() * 18 + 1) * unit_snake,
    y : Math.floor(Math.random() * 15 + 4) * unit_snake
};

const dead = new Audio();
const eat = new Audio();
const level_up = new Audio();

dead.src = "assets/audio/dead.mp3";
eat.src = "assets/audio/eat.mp3";
level_up.src = "assets/audio/level_up.mp3";
let score = 0;
let snake = [];
snake[0] = {
    x : 9 * unit_snake,
    y : 10 * unit_snake
}

// control 

let d;
let queuedDirection = null;
document.addEventListener("keydown", direction);

function direction(e) {
    if(![37, 38, 39, 40].includes(e.keyCode)) return;

    e.preventDefault();

    let newDir;
    switch(e.keyCode) {
        case 37: newDir = "LEFT"; break;
        case 38: newDir = "UP"; break;
        case 39: newDir = "RIGHT"; break;
        case 40: newDir = "DOWN"; break;
    }

    queuedDirection = newDir;
}
// self crash 
function collision(head, array) {
    for(let i = 0;i <array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
} 
// end self crash 

// end control 

// draw 
function draw(){
    if(queuedDirection){
        if(
            (d === "RIGHT" && queuedDirection !== "LEFT") ||
            (d === "LEFT" && queuedDirection !== "RIGHT") ||
            (d === "UP" && queuedDirection !== "DOWN") ||
            (d === "DOWN" && queuedDirection !== "UP") ||
            (!d)
        ) {
            d = queuedDirection;
        }
        
        
    }
    // header 
    ctx_snake.fillStyle = "#567A39";
    ctx_snake.fillRect(0,0,640,unit_snake*3);
    ctx_snake.drawImage(foodImg, unit_snake, unit_snake, unit_snake,unit_snake);
    // end header 

    // background
    ctx_snake.fillStyle = "#649043";
    for(let i = 0; i<20; i++){
        ctx_snake.fillRect(i*unit_snake, 3*unit_snake, unit_snake,unit_snake);
        ctx_snake.fillRect(i*unit_snake, 19*unit_snake, unit_snake,unit_snake);
    }
    for(let i = 3; i<20; i++){
        ctx_snake.fillRect(0, i*unit_snake, unit_snake,unit_snake);
        ctx_snake.fillRect(19*unit_snake, i*unit_snake, unit_snake,unit_snake);

    }
    for(let i = 4; i<19; i++){
        for(let j = 1; j<19; j++){
            if((i + j) % 2 == 1) {
                ctx_snake.fillStyle = "#B5DF6A";
            }
            else {
                ctx_snake.fillStyle = "#AEDA60";
            }
            ctx_snake.fillRect(j*unit_snake, i*unit_snake, unit_snake,unit_snake);
        }
    }
    // end background 

    // snake 
    for(let i = 0; i<snake.length; i++) {
        ctx_snake.fillStyle = (i == 0) ? "green" : "white";
        ctx_snake.fillRect(snake[i].x,snake[i].y,unit_snake, unit_snake);

        ctx_snake.strokeStyle = "red";
        ctx_snake.strokeRect(snake[i].x, snake[i].y ,unit_snake,unit_snake);
    }
    // end snake 
    ctx_snake.drawImage(foodImg, food.x, food.y, unit_snake,unit_snake);

    // move logic 
    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;

    // eat food 
    if(snakeHeadX == food.x && snakeHeadY == food.y){
        score++;
        
        eat.play();
        if(score % 10 == 0){
            level_up.play();
        }
        do {
            food = {
                x : Math.floor(Math.random() * 18 + 1) * unit_snake,
                y : Math.floor(Math.random() * 15 + 4) * unit_snake
            };
        } while(collision(food, snake));
    } else {
        snake.pop();
    }
    // end eat food 

    if( d == "LEFT") snakeHeadX -= unit_snake;
    if( d == "RIGHT") snakeHeadX += unit_snake;
    if( d == "UP") snakeHeadY -= unit_snake;
    if( d == "DOWN") snakeHeadY += unit_snake;

    let newHead = {
        x : snakeHeadX,
        y : snakeHeadY
    };
    // game over 
    // console.log(d);
    if(snakeHeadX < unit_snake || snakeHeadX > 18 * unit_snake || snakeHeadY < 4*unit_snake || snakeHeadY > 18 * unit_snake || collision(newHead, snake)){
        clearInterval(game_snake);
        dead.play();
        // console.log(newHead);
        // console.log(snake);
        
    }
    // end game over 

    snake.unshift(newHead);
    // end move logic 

    
    ctx_snake.fillStyle = "white";
    ctx_snake.font = "37px sans-serif";
    ctx_snake.fillText(score, 2.2*unit_snake, 1.9*unit_snake);

    queuedDirection = null;
}
// end draw 
// render
let game_snake =  setInterval(draw, 100);
// end render 

// End Snake 