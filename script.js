const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll(`[data-cell]`);
const board = document.getElementById('board');
const winningMessageConc = document.getElementById('winningMessage');
const restartButton = document.getElementById('close-btn');
const reloadButton = document.querySelector('.new-game');
const winningMessageTextElement = document.querySelector(`[data-winning-message-text]`);

//set variables for score
let oScore = document.getElementById("scoreO");
let xScore = document.getElementById("scoreX");
let gameDraw = document.getElementById("draw");

//score counter

let x = 0;
let y = 0;
let z = 0;

let oTurn;
let oCounter = parseFloat(oScore.textContent);

console.log(oCounter);

function newGame () {
    reloadButton.addEventListener("click", function(){
        xScore.textContent = 0;
        yScore.textContent = 0;
        gameDraw.textContent = 0;
        console.log("foo");
    })
}

console.log(reloadButton);

startGame();
newGame();


restartButton.addEventListener("click", startGame)

function startGame(){
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener("click", handleClick)
    cell.addEventListener("click", handleClick, {once: true})
    })
    setBoardHoverClass();
    winningMessageConc.classList.remove(`show`);

}

function handleClick(e){
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;

    // place mark
    placeMark(cell, currentClass);
    // check for a win
    if(checkWin(currentClass)){
       endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns();
        setBoardHoverClass()
    }
    //check for a draw
    // switch turn
    //set board hover classes
    //Increment scores
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw";
        gameDraw.textContent = z += 1;
    } else if(`${oTurn ? "O" : "X"}` == 'X'){
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
        xScore.textContent = y+=1;
    } else if(`${oTurn ? "O" : "X"}` == 'O'){
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
        oScore.textContent = x+=1;
    }
    winningMessageConc.classList.add(`show`);
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(O_CLASS)
    })
}
// function isDraw(){
//     return [...cellElements].every(cell => {
//         return cell.classList.contains(X_CLASS) ||
//         cell.classList.contains(O_CLASS)
//     })
// }

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns(){
    oTurn = !oTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(oTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
         return combination.every(index => {
             return cellElements[index].classList.contains(currentClass)
         })
     })
 }
