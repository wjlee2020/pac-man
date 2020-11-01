const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let squaresArray = [] /*created this to work with instead of using the 
layout array, as we will push created squares (looped through the layout) into this array */

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
    // } which can be written using switch - case below
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

}
document.addEventListener('keyup', control);
