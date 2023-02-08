let player1Name=document.getElementById("name-1");

let player2Name=document.getElementById("name-2");

function player1AddingName() {
    let user1 = prompt("Please enter your name", "Player 1");
    if (user1 != null) {
      player1Name.innerHTML = user1;
    }
}

function player2AddingName() {
    let user2 = prompt("Please enter your name", "Player 2");
    if (user2 != null) {
      player2Name.innerHTML = user2;
    }
}

window.addEventListener("DOMContentLoaded", player1AddingName)
window.addEventListener("DOMContentLoaded", player2AddingName)

// const gameState = {
//     players: [player1Name,player2Name]
//     board: [
//         [null,null,null,null,null,null,null]
//         [null,null,null,null,null,null,null]
//         [null,null,null,null,null,null,null]
//         [null,null,null,null,null,null,null]
//         [null,null,null,null,null,null,null]
//         [null,null,null,null,null,null,null]
//     ] 
// }

let gameboardArea=document.getElementById("gameboard");

let gameboard = [];

function buildGameboard(){
    for (let i=0; i<6; i++){
        let row = i
        for (let j=0; j<7; j++){
            let column = row[j]
            gameboard.push(undefined);
            let newGameboardCell = document.createElement("div");
            newGameboardCell.classList.add("board-cell");
            newGameboardCell.addEventListener("click",colorCell)
            gameboardArea.appendChild(newGameboardCell);
        }
    }
}

window.addEventListener("DOMContentLoaded", buildGameboard);

function colorCell(event){
    event.target
    if (currentPlayer = player1){
        newGameboardCell.classList.add("red")
        currentPlayer = player2
    } else{
        newGameboardCell.classList.add("yellow")
        currentPlayer=player1
    }
}