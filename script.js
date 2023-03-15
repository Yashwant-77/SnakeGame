// Game Constants & Variables
let inputDir = {x : 0 , y : 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let score = 0;
let speed = 1;
let lastPainterTime = 0;
let snakeArr = [
    {x : 13 , y : 15}
]

let food =     {x : 6 , y : 7}
let stateOfMusic = true;

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // musicSound.play();
    // console.log(ctime);
    if((ctime - lastPainterTime)/1000 < 1/speed){
        return;
    }
    lastPainterTime = ctime;
    gameEngine();

}

function isCollide(snake){
    // If you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if((snake[0].x >= 18 || snake[0].x <= 0) || (snake[0].y >= 18 || snake[0].y <= 0)){
        return true;
    }
}

function gameEngine(){



    // Part 1 : Updating the snake array & Food 
    if(isCollide(snakeArr)){

        gameOverSound.play();
        // musicSound.pause();
        // stateOfMusic = false;
        inputDir = {x : 0 , y : 0}
        alert("Game Over ! Press any key to play again")
        snakeArr = [{x : 13 , y : 15}]
        // musicSound.play();
        // stateOfMusic = true;
        score = 0;
        speed = 1;
        scoreBox.innerHTML = "Score :" + score;
    }




    // If you have eaten the , increament the score and regenerate the food 
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        // if(score%10 === 0){
        //     speed++;.
        // }
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore" , JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "High Score : " + hiscoreval
        }
        scoreBox.innerHTML = "Score :" + score;
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x,y : snakeArr[0].y + inputDir.y} )
        let a = 1;
        let b = 5;
        food = { x : Math.round(a + (b-a) * Math.random()),  y : Math.round(a + (b-a) * Math.random())}
    }




    // Moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    // Part 2 : Display the snake 
    board.innerHTML = ""
    snakeArr.forEach((e , index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y; 
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })


    
    // Part 2 : Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y; 
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





// Main Logic starts here 
let hiscore = localStorage.getItem("hiscore")
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "High Score : " + hiscoreval
}



window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x : 0 , y : 1} // Start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            console.log("ArrowUp")
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            console.log("ArrowDown")
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("ArrowLeft")
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            console.log("ArrowRight")
            break;
        default:
            break;
    }
})

flexSwitchCheckChecked.addEventListener('click',e =>{
    if(stateOfMusic){
        musicSound.pause();
        stateOfMusic = false;
        document.getElementById('labelButton').innerText = "Of"
    }
    else{
        musicSound.play();
        stateOfMusic = false;
        document.getElementById('labelButton').innerText = "On"
        
    }
})