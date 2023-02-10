//player name entry
let player1Name=document.getElementById("name-1");

let player2Name=document.getElementById("name-2");

function player1AddingName() {
    let user1 = prompt("Please enter your name (Player 1 goes first)", "Player 1");
    if (user1 != null) {
      player1Name.innerHTML = user1;
    }
}

function player2AddingName() {
    let user2 = prompt("Please enter your name (Player 2 goes second)", "Player 2");
    if (user2 != null) {
      player2Name.innerHTML = user2;
    }
}

window.addEventListener("DOMContentLoaded", player1AddingName);
window.addEventListener("DOMContentLoaded", player2AddingName);

//creating gameboard

let gameboardHTML=document.getElementById("gameboard");



let gameboard = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

function buildGameboard(){
    for (let i=0; i<7; i++){
        let column = gameboard[i];
        column.push(undefined);
        for (let j=0; j<6; j++){
            let newGameboardCell = document.createElement("div");
            column[j] = newGameboardCell;
            newGameboardCell.classList.add("board-cell");
            let cellID = (i*6)+(j+1);
            newGameboardCell.setAttribute("id", cellID);
            //adding the coloring listener and the listener to make sure users must start from bottom of column and work their way up
            newGameboardCell.addEventListener("click",colorCell);
            newGameboardCell.addEventListener("click",goUpTheColumn);
            gameboardHTML.appendChild(newGameboardCell);
        }
    }
    
    gameboard[0][5].classList.add("lowestAvailableCellInColumn");
    gameboard[1][5].classList.add("lowestAvailableCellInColumn");
    gameboard[2][5].classList.add("lowestAvailableCellInColumn");
    gameboard[3][5].classList.add("lowestAvailableCellInColumn");
    gameboard[4][5].classList.add("lowestAvailableCellInColumn");
    gameboard[5][5].classList.add("lowestAvailableCellInColumn");
    gameboard[6][5].classList.add("lowestAvailableCellInColumn");
}

window.addEventListener("DOMContentLoaded", buildGameboard);

//setting the player order, the background color of current turn player, and the color change of the cell on click
let playerTurn = undefined;

function playerNameHighlight(){
    if (playerTurn == undefined || playerTurn == 1){
        player1Name.style.backgroundColor = "blue";
        player2Name.style.backgroundColor = "purple";
    } else{
        player2Name.style.backgroundColor = "blue";
        player1Name.style.backgroundColor = "red";
    }
}

window.setInterval(playerNameHighlight,1);

function colorCell(event){
    if ((event.target.classList.contains("red") || event.target.classList.contains("purple") && playerTurn == 2) || (event.target.classList.contains("red") || 
    event.target.classList.contains("purple") && playerTurn == 1)){
        alert("You are not able to select this option.");
    } else if (playerTurn == undefined || playerTurn == 1){        
        event.target.classList.add("red");
        playerTurn = 2;
    } else if (playerTurn == 2){
        event.target.classList.add("purple");
        event.target.classList.remove("red");
        playerTurn = 1;
    // } else if(!event.target.classList.contains("lowestAvailableCellInColumn")){
    //     alert("no cell should be colored");
    } else{
        console.log("error");
    }
}

//setting win condition not sure what to do with it at the moment
let winCondition = [
    //rows 1-6
    [1,2,3,4],[2,3,4,5],[3,4,5,6],[4,5,6,7],
    [8,9,10,11],[9,10,11,12],[10,11,12,13],[11,12,13,14],
    [15,16,17,18],[16,17,18,19],[17,18,19,20],[18,19,20,21],
    [22,23,24,25],[23,24,25,26],[24,25,26,27],[25,26,27,28],
    [29,30,31,32],[30,31,32,33],[31,32,33,34],[32,33,34,35],
    [36,37,38,39],[37,38,39,40],[38,39,40,41],[39,40,41,42],
    //columns 1-7
    [1,8,15,22],[8,15,22,29],[15,22,29,36],
    [2,9,16,23],[9,16,23,30],[16,23,30,37],
    [3,10,17,24],[10,17,24,31],[17,24,31,38],
    [4,11,18,25],[11,18,25,32],[18,25,32,39],
    [5,12,19,26],[12,19,26,33],[19,26,33,40],
    [6,13,20,27],[13,20,27,34],[20,27,34,41],
    [7,14,21,28],[14,21,28,35],[21,28,35,42],
    //diagonals from column 1 working down column (left to right)
    [1,9,17,25],[9,17,25,33],[17,25,33,41],
    [8,16,24,32],[16,24,32,40],
    [15,23,31,39],
    //diagonals from column 2 working down column (left to right); only the first row needed since other rows already accounted for in earlier diagonals
    [2,10,18,26],[10,18,26,34,],[18,26,34,42],
    //diagonals from column 3 working down column (left to right); already added arrays omitted
    [3,11,19,27],[11,19,27,35],
    //diagonals from column 4 working down column (left to right); already added arrays omitted
    [4,12,20,28],
    //diagonals from column 4 working down column diagonally (right to left)
    [4,10,16,22],
    //diagonals from column 5 working down column diagonally (right to left)
    [5,11,17,23],[11,17,23,29],
    //diagonals from column 6 working down column diagonally (right to left)
    [6,12,18,24],[12,18,24,30],[18,24,30,36],
    //diagonals from column 7 working down column diagonally (right to left), then down the column
    [7,13,19,25],[13,19,25,31],[19,25,31,37],
    [14,20,26,32],[20,26,32,38],
    [21,27,33,39]
]

//setting column values not currently being used they're more for reference
// let column1 = (1,8,15,22,29,36)
// let column2 = (2,9,16,23,30,37)
// let column3 = (3,10,17,24,31,38)
// let column4 = (4,11,18,25,32,39)
// let column5 = (5,12,19,26,33,40)
// let column6 = (6,13,20,27,34,41)
// let column7 = (7,14,21,28,35,42)

//making it so that you must start from bottom of column and go up

//currently throwing error message if cell doesn't have the lowestavailable class on it/, but will still let you choose it. 
//

function goUpTheColumn(event){
    if (event.target.classList.contains("lowestAvailableCellInColumn")){
        event.target.classList.add("alreadyChosen");
        event.target.classList.remove("lowestAvailableCellInColumn");
        if ((parseInt(event.target.id)) != 1 && (parseInt(event.target.id)) != 7 && (parseInt(event.target.id)) != 13 && 
        (parseInt(event.target.id)) != 19 && (parseInt(event.target.id)) != 25 && (parseInt(event.target.id)) != 31 && 
        (parseInt(event.target.id)) != 37){
            document.getElementById(String(parseInt(event.target.id)-1)).classList.add("lowestAvailableCellInColumn");
        }
        }
    else if(!event.target.classList.contains("red") && !event.target.classList.contains("alreadyChosen")){
        alert("Please select the lowest column.");
        // bad attempt to just remove the classes, because it will remove class of correctly played pieces as well
        event.target.classList.remove("purple");
        event.target.classList.remove("red");
        playerTurn = 2;
    } else if(!event.target.classList.contains("purple") && !event.target.classList.contains("alreadyChosen")){
        alert("Please select the lowest column.");
        event.target.classList.remove("purple");
        event.target.classList.remove("red");
        playerTurn = 1;
    }
}

//need to make condition if all cells have class alreadyChosen then say game over
//for reset button and for win condition being triggered: need to make function to clear out all of the classes accumulated

