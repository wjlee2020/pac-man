const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let squaresArray = [] /*created this to work with instead of using the 
layout array, as we will push created squares (looped through the layout) into this array */
let score = 0;


// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//create board

createBoard = () => {
    for(let i = 0; i< layout.length; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        squaresArray.push(square)
        if(layout[i] === 0) {
            squaresArray[i].classList.add('pac-dot')
        }
        else if(layout[i] === 1) {
            squaresArray[i].classList.add('wall')
        }
        else if(layout[i] === 2) {
            squaresArray[i].classList.add('ghost-lair')
        }
        else if (layout[i] === 3) {
            squaresArray[i].classList.add('power-pellet')
        }
    }
}

createBoard()

//creating pacman
let pacmanCurrentIndex = 490;
squaresArray[pacmanCurrentIndex].classList.add('pacman')

//moving pacman
control = (e) => {
    // if(e.keyCode === 40) {
    //     console.log("pressed");
    // }
    // else if(e.keyCode === 39) {
    //     console.log("right arrow")
    // }
    // else if(e.keyCode === 38) {
    //     console.log("up arrow")
    // }
    // else if(e.keyCode === 37) {
    //     console.log("left arrow");
    // }                        this can be written using switch - case below

    squaresArray[pacmanCurrentIndex].classList.remove('pacman');
    switch(e.keyCode) {
        case 40:
            if(
                !squaresArray[pacmanCurrentIndex + width].classList.contains('wall') &&
                pacmanCurrentIndex + width < width * width &&
                !squaresArray[pacmanCurrentIndex + width].classList.contains('ghost-lair')
                ) 
                pacmanCurrentIndex += width;
                break;

        case 39:
            if(
                !squaresArray[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
                !squaresArray[pacmanCurrentIndex + 1].classList.contains('wall') &&
                pacmanCurrentIndex % width < width - 1
                ) 
                pacmanCurrentIndex += 1;
                if(pacmanCurrentIndex === 391) {
                    pacmanCurrentIndex = 364
                }
                break;

        case 38:
            if(
                !squaresArray[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                !squaresArray[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width >= 0
                ) 
                pacmanCurrentIndex -= width;
                break;

        case 37: 
            if(
                !squaresArray[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
                !squaresArray[pacmanCurrentIndex - 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0
                ) 
                pacmanCurrentIndex -= 1;
                if(pacmanCurrentIndex === 364) {
                    pacmanCurrentIndex = 391 
                }
                break;
    }
    squaresArray[pacmanCurrentIndex].classList.add('pacman');
    pacDotEaten();
    powerPelletEaten();
    checkForWin();
    checkForGameOver();
    
}
document.addEventListener('keyup', control);

//eating pacdots

pacDotEaten = () => {
    if(squaresArray[pacmanCurrentIndex].classList.contains('pac-dot')){
        squaresArray[pacmanCurrentIndex].classList.remove('pac-dot')
        score ++;  
        scoreDisplay.textContent = score;
    }
};

//power pellet
 
powerPelletEaten = () => {
    //if square pacman is in contains a power pellet
    if(squaresArray[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squaresArray[pacmanCurrentIndex].classList.remove('power-pellet')
    //add a score of 10;
        score += 10;
        scoreDisplay.textContent = score;
    //change each of the four ghosts to isScared =true;
        ghosts.forEach(ghost => ghost.isScard = true)
    //use setTimeout to unscare ghosts after 10 sec using a function
        setTimeout(unscareGhosts, 10000)
    }
};

unscareGhosts = () => {
    ghosts.forEach(ghost => ghost.isScard = false)
}
    

//creating ghost class

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScard = false;
        this.timerId = NaN;
    }
};

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
];

//put ghosts into the grid

ghosts.forEach(ghost => {
    squaresArray[ghost.currentIndex].classList.add(ghost.className)
    squaresArray[ghost.currentIndex].classList.add('ghost')
})

//moving our ghosts around
moveGhost = (ghost) => {
    const directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)]
    ghost.timerId = setInterval( () => {

        //if the next square does not contain a wall & doesn't contain a ghost
        if(
            !squaresArray[ghost.currentIndex + direction].classList.contains('wall') &&
            !squaresArray[ghost.currentIndex + direction].classList.contains('ghost')
            ) {
        //remove any ghost
            squaresArray[ghost.currentIndex].classList.remove(ghost.className);
            squaresArray[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
        //add direction to currentIndex
            ghost.currentIndex += direction;
        //add ghost class
            squaresArray[ghost.currentIndex].classList.add(ghost.className);
            squaresArray[ghost.currentIndex].classList.add('ghost')
        //this else statement = if the above isn't true, ghost will find a new direction
            } else direction = directions[Math.floor(Math.random() * directions.length)]

        //if the ghost is scared
        if(ghost.isScard) {
            squaresArray[ghost.currentIndex].classList.add('scared-ghost')
        }
        //if the ghost isScare = true & pacman is on top of it
        if(ghost.isScard === true && squaresArray[ghost.currentIndex].classList.contains('pacman')){
        //remove classNames - ghost.className, 'ghost', 'scared-ghost'
            squaresArray[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        //change ghost currentIndex to startIndex
            ghost.currentIndex = ghost.startIndex;
        //add a score of 100 points per ghost
            score += 100;
            scoreDisplay.textContent = score;
        //reAdd individual ghost.className and 'ghost' to the ghosts new position
            squaresArray[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver();
        
    }, ghost.speed)
};
ghosts.forEach(ghost => moveGhost(ghost))

//check for gameover

checkForGameOver = () => {
    //if the square that pacman is in contains a ghost & the ghost contained in the square isScare = false
    if (squaresArray[pacmanCurrentIndex].classList.contains('ghost') &&
        !squaresArray[pacmanCurrentIndex].classList.contains('scared-ghost')) {
    //for each ghost, we need to stop it moving (forEach and clearInterval)
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove eventListener from our control function
        document.removeEventListener('keyup', control);
    //alert user that the game is over w/ score count (scoreDisplay => you lose)
        alert(`You just bombed the game! Your score was ${score}`)
        scoreDisplay.innerText = `You Lose with ${score}`
        }
}

checkForWin = () => {
    if(score === 274) {
        //stop each ghost moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //remove the event listener for the controls
        document.removeEventListener('keyup', control)
        //tell the user they won + score
        alert(`You won game with ${score} ya bastard`)
        //display win
        scoreDisplay.textContent = `Way to go with the big ${score}`
    }
}