let foodX_area, foodY_area;
let snakeY = 20, snakeX = 15;
let moveX = 0, moveY = 0;
let snake_add_body = [];
let interval, count = 0;
let foodLayer = document.querySelector(".play_board")
let score = document.querySelector(".scores")
let high_scores = document.querySelector(".high_scores")
let saveHighScore = 0;

const direction =(arrow)=>{
    if(arrow.code === "ArrowUp" && moveY != 1){
        moveX = 0, moveY = -1;
    }else if(arrow.code === "ArrowDown" && moveY != -1){
        moveX = 0, moveY = 1;
    } else if(arrow.code === "ArrowLeft" && moveX != 1){
        moveX = -1, moveY = 0;
    } else if(arrow.code === "ArrowRight" && moveX != -1){
        moveX = 1, moveY = 0;
    }
}

const rotateFood = ()=>{
    foodX_area = Math.floor(Math.random() * 40) + 1;
    foodY_area = Math.floor(Math.random() * 30) + 1;
}

const startGame = ()=> {
    snakeX += moveX;
    snakeY += moveY;
    // change the food direction  & increase score count
    if(foodY_area == snakeY && snakeX == foodX_area){
        score.innerHTML = `Score: ${1+count++}` // increase count score per food eaten
        snake_add_body.push([foodX_area, foodY_area]);
        rotateFood();
    }
// minus 1 from the body and add
    for(let i = snake_add_body.length-1; i > 0; i--) snake_add_body[i] = snake_add_body[i -1]

    //add to snake size body
    snake_add_body[0] = [snakeX, snakeY]
    let shapeSetUp = `<div class="food" style="grid-area: ${foodY_area}/${foodX_area} "></div>`
    for(let i = 0; i < snake_add_body.length; i++){
        shapeSetUp += `<div class="snake" style="grid-area: ${snake_add_body[i][1]}/${snake_add_body[i][0]} "></div>`
        
        // check if snake hits body  ||GameOver
        if(i !==0 && snake_add_body[0][1] == snake_add_body[i][1] && snake_add_body[0][0] == snake_add_body[i][0]){
            gameOver()
        }
    }
    // check if snake hits border || Gameover
    if(snakeX <= 0 || snakeX > 40 || snakeY <= 0 || snakeY >40) gameOver() 
    foodLayer.innerHTML = shapeSetUp
    // update high score
    high_scores.innerHTML = `High Score: ${localStorage.getItem("storeScore", count)}`
}

const gameOver =()=>{
    let getHighScore = localStorage.getItem("storeScore", count)
    saveHighScore = count >= getHighScore ? localStorage.setItem("storeScore", count) : getHighScore
    clearInterval(interval)
    alert("Game over... Press Ok to continue")
    location.reload()
    
}

rotateFood() 
interval = setInterval(startGame, 120);

document.addEventListener("keydown", direction)