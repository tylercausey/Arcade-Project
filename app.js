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
            //adding the coloring listener, the work up a column listener, and the win condition checker listener
            newGameboardCell.addEventListener("click",colorCell);
            newGameboardCell.addEventListener("click",goUpTheColumn);
            newGameboardCell.addEventListener("click",checkForWin);
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
    } else{
        console.log("error");
    }
}

//making it so that you must start from bottom of column and go up
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

//win condition checker (this is very long)
function checkForWin(){
    if (
        //COLUMN 1
        (document.getElementById("1").classList.contains("red") && document.getElementById("2").classList.contains("red") && 
        document.getElementById("3").classList.contains("red") && document.getElementById("4").classList.contains("red")) ||

        (document.getElementById("2").classList.contains("red") && document.getElementById("3").classList.contains("red") && 
        document.getElementById("4").classList.contains("red") && document.getElementById("5").classList.contains("red")) ||

        (document.getElementById("3").classList.contains("red") && document.getElementById("4").classList.contains("red") && 
        document.getElementById("5").classList.contains("red") && document.getElementById("6").classList.contains("red")) ||

        //COLUMN 2
        (document.getElementById("7").classList.contains("red") && document.getElementById("8").classList.contains("red") && 
        document.getElementById("9").classList.contains("red") && document.getElementById("10").classList.contains("red")) ||

        (document.getElementById("8").classList.contains("red") && document.getElementById("9").classList.contains("red") && 
        document.getElementById("10").classList.contains("red") && document.getElementById("11").classList.contains("red"))||
        
        (document.getElementById("9").classList.contains("red") && document.getElementById("10").classList.contains("red") && 
        document.getElementById("11").classList.contains("red") && document.getElementById("12").classList.contains("red")) ||

        //COLUMN 3
        (document.getElementById("13").classList.contains("red") && document.getElementById("14").classList.contains("red") && 
        document.getElementById("15").classList.contains("red") && document.getElementById("16").classList.contains("red")) ||

        (document.getElementById("14").classList.contains("red") && document.getElementById("15").classList.contains("red") && 
        document.getElementById("16").classList.contains("red") && document.getElementById("17").classList.contains("red")) ||

        (document.getElementById("15").classList.contains("red") && document.getElementById("16").classList.contains("red") && 
        document.getElementById("17").classList.contains("red") && document.getElementById("18").classList.contains("red")) ||

        //COLUMN 4
        (document.getElementById("19").classList.contains("red") && document.getElementById("20").classList.contains("red") && 
        document.getElementById("21").classList.contains("red") && document.getElementById("22").classList.contains("red")) ||

        (document.getElementById("20").classList.contains("red") && document.getElementById("21").classList.contains("red") && 
        document.getElementById("22").classList.contains("red") && document.getElementById("23").classList.contains("red")) ||

        (document.getElementById("21").classList.contains("red") && document.getElementById("22").classList.contains("red") && 
        document.getElementById("23").classList.contains("red") && document.getElementById("24").classList.contains("red")) ||

        //COLUMN 5
        (document.getElementById("25").classList.contains("red") && document.getElementById("26").classList.contains("red") && 
        document.getElementById("27").classList.contains("red") && document.getElementById("28").classList.contains("red")) ||

        (document.getElementById("26").classList.contains("red") && document.getElementById("27").classList.contains("red") && 
        document.getElementById("28").classList.contains("red") && document.getElementById("29").classList.contains("red")) ||

        (document.getElementById("27").classList.contains("red") && document.getElementById("28").classList.contains("red") && 
        document.getElementById("29").classList.contains("red") && document.getElementById("30").classList.contains("red")) ||

        //COLUMN 6
        (document.getElementById("31").classList.contains("red") && document.getElementById("32").classList.contains("red") && 
        document.getElementById("33").classList.contains("red") && document.getElementById("34").classList.contains("red")) ||

        (document.getElementById("32").classList.contains("red") && document.getElementById("33").classList.contains("red") && 
        document.getElementById("34").classList.contains("red") && document.getElementById("35").classList.contains("red")) ||

        (document.getElementById("33").classList.contains("red") && document.getElementById("34").classList.contains("red") && 
        document.getElementById("35").classList.contains("red") && document.getElementById("36").classList.contains("red")) ||

        //COLUMN 7
        (document.getElementById("37").classList.contains("red") && document.getElementById("38").classList.contains("red") && 
        document.getElementById("39").classList.contains("red") && document.getElementById("40").classList.contains("red")) ||

        (document.getElementById("38").classList.contains("red") && document.getElementById("39").classList.contains("red") && 
        document.getElementById("40").classList.contains("red") && document.getElementById("41").classList.contains("red")) ||

        (document.getElementById("39").classList.contains("red") && document.getElementById("40").classList.contains("red") && 
        document.getElementById("41").classList.contains("red") && document.getElementById("42").classList.contains("red")) ||

        //ROW 1
        (document.getElementById("1").classList.contains("red") && document.getElementById("7").classList.contains("red") && 
        document.getElementById("13").classList.contains("red") && document.getElementById("19").classList.contains("red")) ||

        (document.getElementById("7").classList.contains("red") && document.getElementById("13").classList.contains("red") && 
        document.getElementById("19").classList.contains("red") && document.getElementById("25").classList.contains("red")) ||

        (document.getElementById("13").classList.contains("red") && document.getElementById("19").classList.contains("red") && 
        document.getElementById("25").classList.contains("red") && document.getElementById("31").classList.contains("red")) ||

        (document.getElementById("19").classList.contains("red") && document.getElementById("25").classList.contains("red") && 
        document.getElementById("31").classList.contains("red") && document.getElementById("37").classList.contains("red")) ||

        //ROW 2
        (document.getElementById("2").classList.contains("red") && document.getElementById("8").classList.contains("red") && 
        document.getElementById("14").classList.contains("red") && document.getElementById("20").classList.contains("red")) ||

        (document.getElementById("8").classList.contains("red") && document.getElementById("14").classList.contains("red") && 
        document.getElementById("20").classList.contains("red") && document.getElementById("26").classList.contains("red")) ||

        (document.getElementById("14").classList.contains("red") && document.getElementById("20").classList.contains("red") && 
        document.getElementById("26").classList.contains("red") && document.getElementById("32").classList.contains("red")) ||

        (document.getElementById("20").classList.contains("red") && document.getElementById("26").classList.contains("red") && 
        document.getElementById("32").classList.contains("red") && document.getElementById("38").classList.contains("red")) ||

        //ROW 3
        (document.getElementById("3").classList.contains("red") && document.getElementById("9").classList.contains("red") && 
        document.getElementById("15").classList.contains("red") && document.getElementById("21").classList.contains("red")) ||

        (document.getElementById("9").classList.contains("red") && document.getElementById("15").classList.contains("red") && 
        document.getElementById("21").classList.contains("red") && document.getElementById("27").classList.contains("red")) ||

        (document.getElementById("15").classList.contains("red") && document.getElementById("21").classList.contains("red") && 
        document.getElementById("27").classList.contains("red") && document.getElementById("33").classList.contains("red")) ||

        (document.getElementById("21").classList.contains("red") && document.getElementById("27").classList.contains("red") && 
        document.getElementById("33").classList.contains("red") && document.getElementById("39").classList.contains("red")) ||

        //ROW 4
        (document.getElementById("4").classList.contains("red") && document.getElementById("10").classList.contains("red") && 
        document.getElementById("16").classList.contains("red") && document.getElementById("22").classList.contains("red")) ||

        (document.getElementById("10").classList.contains("red") && document.getElementById("16").classList.contains("red") && 
        document.getElementById("22").classList.contains("red") && document.getElementById("28").classList.contains("red")) ||

        (document.getElementById("16").classList.contains("red") && document.getElementById("22").classList.contains("red") && 
        document.getElementById("28").classList.contains("red") && document.getElementById("34").classList.contains("red")) ||

        (document.getElementById("22").classList.contains("red") && document.getElementById("28").classList.contains("red") && 
        document.getElementById("34").classList.contains("red") && document.getElementById("40").classList.contains("red")) ||

        //ROW 5
        (document.getElementById("5").classList.contains("red") && document.getElementById("11").classList.contains("red") && 
        document.getElementById("17").classList.contains("red") && document.getElementById("23").classList.contains("red")) ||

        (document.getElementById("11").classList.contains("red") && document.getElementById("17").classList.contains("red") && 
        document.getElementById("23").classList.contains("red") && document.getElementById("29").classList.contains("red")) ||

        (document.getElementById("17").classList.contains("red") && document.getElementById("23").classList.contains("red") && 
        document.getElementById("29").classList.contains("red") && document.getElementById("35").classList.contains("red")) ||

        (document.getElementById("23").classList.contains("red") && document.getElementById("29").classList.contains("red") && 
        document.getElementById("35").classList.contains("red") && document.getElementById("41").classList.contains("red")) ||

        //ROW 6
        (document.getElementById("6").classList.contains("red") && document.getElementById("12").classList.contains("red") && 
        document.getElementById("18").classList.contains("red") && document.getElementById("24").classList.contains("red")) ||

        (document.getElementById("12").classList.contains("red") && document.getElementById("18").classList.contains("red") && 
        document.getElementById("24").classList.contains("red") && document.getElementById("30").classList.contains("red")) ||

        (document.getElementById("18").classList.contains("red") && document.getElementById("24").classList.contains("red") && 
        document.getElementById("30").classList.contains("red") && document.getElementById("36").classList.contains("red")) ||

        (document.getElementById("24").classList.contains("red") && document.getElementById("30").classList.contains("red") && 
        document.getElementById("36").classList.contains("red") && document.getElementById("42").classList.contains("red")) ||

        //DIAGONAL FROM BOTTOM LEFT CORNER (WORKING UP COLUMN 1)
        (document.getElementById("3").classList.contains("red") && document.getElementById("10").classList.contains("red") && 
        document.getElementById("17").classList.contains("red") && document.getElementById("24").classList.contains("red")) ||

        (document.getElementById("2").classList.contains("red") && document.getElementById("9").classList.contains("red") && 
        document.getElementById("16").classList.contains("red") && document.getElementById("23").classList.contains("red")) ||

        (document.getElementById("9").classList.contains("red") && document.getElementById("16").classList.contains("red") && 
        document.getElementById("23").classList.contains("red") && document.getElementById("30").classList.contains("red")) ||

        (document.getElementById("1").classList.contains("red") && document.getElementById("8").classList.contains("red") && 
        document.getElementById("15").classList.contains("red") && document.getElementById("22").classList.contains("red")) ||

        (document.getElementById("8").classList.contains("red") && document.getElementById("15").classList.contains("red") && 
        document.getElementById("22").classList.contains("red") && document.getElementById("29").classList.contains("red")) ||

        (document.getElementById("15").classList.contains("red") && document.getElementById("22").classList.contains("red") && 
        document.getElementById("29").classList.contains("red") && document.getElementById("36").classList.contains("red")) ||

        //DIAGONAL FROM BOTTOM LEFT CORNER (WORKING ACROSS ROW 1 LEFT TO RIGHT)
        (document.getElementById("7").classList.contains("red") && document.getElementById("14").classList.contains("red") && 
        document.getElementById("21").classList.contains("red") && document.getElementById("28").classList.contains("red")) ||

        (document.getElementById("14").classList.contains("red") && document.getElementById("21").classList.contains("red") && 
        document.getElementById("28").classList.contains("red") && document.getElementById("35").classList.contains("red")) ||

        (document.getElementById("21").classList.contains("red") && document.getElementById("28").classList.contains("red") && 
        document.getElementById("35").classList.contains("red") && document.getElementById("42").classList.contains("red")) ||

        (document.getElementById("13").classList.contains("red") && document.getElementById("20").classList.contains("red") && 
        document.getElementById("27").classList.contains("red") && document.getElementById("34").classList.contains("red")) ||

        (document.getElementById("20").classList.contains("red") && document.getElementById("27").classList.contains("red") && 
        document.getElementById("34").classList.contains("red") && document.getElementById("41").classList.contains("red")) ||

        (document.getElementById("19").classList.contains("red") && document.getElementById("26").classList.contains("red") && 
        document.getElementById("33").classList.contains("red") && document.getElementById("40").classList.contains("red")) ||

        //DIAGONAL FROM BOTTOM RIGHT CORNER (WORKING UP COLUMN 7)
        (document.getElementById("39").classList.contains("red") && document.getElementById("34").classList.contains("red") && 
        document.getElementById("29").classList.contains("red") && document.getElementById("24").classList.contains("red")) ||

        (document.getElementById("38").classList.contains("red") && document.getElementById("33").classList.contains("red") && 
        document.getElementById("28").classList.contains("red") && document.getElementById("23").classList.contains("red")) ||

        (document.getElementById("33").classList.contains("red") && document.getElementById("28").classList.contains("red") && 
        document.getElementById("23").classList.contains("red") && document.getElementById("18").classList.contains("red")) ||

        (document.getElementById("37").classList.contains("red") && document.getElementById("32").classList.contains("red") && 
        document.getElementById("27").classList.contains("red") && document.getElementById("22").classList.contains("red")) ||

        (document.getElementById("32").classList.contains("red") && document.getElementById("27").classList.contains("red") && 
        document.getElementById("22").classList.contains("red") && document.getElementById("17").classList.contains("red")) ||

        (document.getElementById("27").classList.contains("red") && document.getElementById("22").classList.contains("red") && 
        document.getElementById("17").classList.contains("red") && document.getElementById("12").classList.contains("red")) ||

        //DIAGONAL FROM BOTTOM RIGHT CORNER (WORKING ACROSS ROW 1 FROM RIGHT TO LEFT)
        (document.getElementById("31").classList.contains("red") && document.getElementById("26").classList.contains("red") && 
        document.getElementById("21").classList.contains("red") && document.getElementById("16").classList.contains("red")) ||

        (document.getElementById("26").classList.contains("red") && document.getElementById("21").classList.contains("red") && 
        document.getElementById("16").classList.contains("red") && document.getElementById("11").classList.contains("red")) ||

        (document.getElementById("21").classList.contains("red") && document.getElementById("16").classList.contains("red") && 
        document.getElementById("11").classList.contains("red") && document.getElementById("6").classList.contains("red")) ||

        (document.getElementById("25").classList.contains("red") && document.getElementById("20").classList.contains("red") && 
        document.getElementById("15").classList.contains("red") && document.getElementById("10").classList.contains("red")) ||

        (document.getElementById("20").classList.contains("red") && document.getElementById("15").classList.contains("red") && 
        document.getElementById("10").classList.contains("red") && document.getElementById("5").classList.contains("red")) ||

        (document.getElementById("19").classList.contains("red") && document.getElementById("14").classList.contains("red") && 
        document.getElementById("9").classList.contains("red") && document.getElementById("4").classList.contains("red")) 
    ){
        alert(player1Name.textContent+" Wins!")
        document.getElementById("1").classList.remove("red")
        document.getElementById("1").classList.remove("purple")
        document.getElementById("1").classList.remove("alreadyChosen")
        document.getElementById("1").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("2").classList.remove("red")
        document.getElementById("2").classList.remove("purple")
        document.getElementById("2").classList.remove("alreadyChosen")
        document.getElementById("2").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("3").classList.remove("red")
        document.getElementById("3").classList.remove("purple")
        document.getElementById("3").classList.remove("alreadyChosen")
        document.getElementById("3").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("4").classList.remove("red")
        document.getElementById("4").classList.remove("purple")
        document.getElementById("4").classList.remove("alreadyChosen")
        document.getElementById("4").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("5").classList.remove("red")
        document.getElementById("5").classList.remove("purple")
        document.getElementById("5").classList.remove("alreadyChosen")
        document.getElementById("5").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("6").classList.remove("red")
        document.getElementById("6").classList.remove("purple")
        document.getElementById("6").classList.remove("alreadyChosen")
        document.getElementById("6").classList.add("lowestAvailableCellInColumn")

        document.getElementById("7").classList.remove("red")
        document.getElementById("7").classList.remove("purple")
        document.getElementById("7").classList.remove("alreadyChosen")
        document.getElementById("7").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("8").classList.remove("red")
        document.getElementById("8").classList.remove("purple")
        document.getElementById("8").classList.remove("alreadyChosen")
        document.getElementById("8").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("9").classList.remove("red")
        document.getElementById("9").classList.remove("purple")
        document.getElementById("9").classList.remove("alreadyChosen")
        document.getElementById("9").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("10").classList.remove("red")
        document.getElementById("10").classList.remove("purple")
        document.getElementById("10").classList.remove("alreadyChosen")
        document.getElementById("10").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("11").classList.remove("red")
        document.getElementById("11").classList.remove("purple")
        document.getElementById("11").classList.remove("alreadyChosen")
        document.getElementById("11").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("12").classList.remove("red")
        document.getElementById("12").classList.remove("purple")
        document.getElementById("12").classList.remove("alreadyChosen")
        document.getElementById("12").classList.add("lowestAvailableCellInColumn")

        document.getElementById("13").classList.remove("red")
        document.getElementById("13").classList.remove("purple")
        document.getElementById("13").classList.remove("alreadyChosen")
        document.getElementById("13").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("14").classList.remove("red")
        document.getElementById("14").classList.remove("purple")
        document.getElementById("14").classList.remove("alreadyChosen")
        document.getElementById("14").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("15").classList.remove("red")
        document.getElementById("15").classList.remove("purple")
        document.getElementById("15").classList.remove("alreadyChosen")
        document.getElementById("15").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("16").classList.remove("red")
        document.getElementById("16").classList.remove("purple")
        document.getElementById("16").classList.remove("alreadyChosen")
        document.getElementById("16").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("17").classList.remove("red")
        document.getElementById("17").classList.remove("purple")
        document.getElementById("17").classList.remove("alreadyChosen")
        document.getElementById("17").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("18").classList.remove("red")
        document.getElementById("18").classList.remove("purple")
        document.getElementById("18").classList.remove("alreadyChosen")
        document.getElementById("18").classList.add("lowestAvailableCellInColumn")

        document.getElementById("19").classList.remove("red")
        document.getElementById("19").classList.remove("purple")
        document.getElementById("19").classList.remove("alreadyChosen")
        document.getElementById("19").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("20").classList.remove("red")
        document.getElementById("20").classList.remove("purple")
        document.getElementById("20").classList.remove("alreadyChosen")
        document.getElementById("20").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("21").classList.remove("red")
        document.getElementById("21").classList.remove("purple")
        document.getElementById("21").classList.remove("alreadyChosen")
        document.getElementById("21").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("22").classList.remove("red")
        document.getElementById("22").classList.remove("purple")
        document.getElementById("22").classList.remove("alreadyChosen")
        document.getElementById("22").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("23").classList.remove("red")
        document.getElementById("23").classList.remove("purple")
        document.getElementById("23").classList.remove("alreadyChosen")
        document.getElementById("23").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("24").classList.remove("red")
        document.getElementById("24").classList.remove("purple")
        document.getElementById("24").classList.remove("alreadyChosen")
        document.getElementById("24").classList.add("lowestAvailableCellInColumn")

        document.getElementById("25").classList.remove("red")
        document.getElementById("25").classList.remove("purple")
        document.getElementById("25").classList.remove("alreadyChosen")
        document.getElementById("25").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("26").classList.remove("red")
        document.getElementById("26").classList.remove("purple")
        document.getElementById("26").classList.remove("alreadyChosen")
        document.getElementById("26").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("27").classList.remove("red")
        document.getElementById("27").classList.remove("purple")
        document.getElementById("27").classList.remove("alreadyChosen")
        document.getElementById("27").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("28").classList.remove("red")
        document.getElementById("28").classList.remove("purple")
        document.getElementById("28").classList.remove("alreadyChosen")
        document.getElementById("28").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("29").classList.remove("red")
        document.getElementById("29").classList.remove("purple")
        document.getElementById("29").classList.remove("alreadyChosen")
        document.getElementById("29").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("30").classList.remove("red")
        document.getElementById("30").classList.remove("purple")
        document.getElementById("30").classList.remove("alreadyChosen")
        document.getElementById("30").classList.add("lowestAvailableCellInColumn")

        document.getElementById("31").classList.remove("red")
        document.getElementById("31").classList.remove("purple")
        document.getElementById("31").classList.remove("alreadyChosen")
        document.getElementById("31").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("32").classList.remove("red")
        document.getElementById("32").classList.remove("purple")
        document.getElementById("32").classList.remove("alreadyChosen")
        document.getElementById("32").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("33").classList.remove("red")
        document.getElementById("33").classList.remove("purple")
        document.getElementById("33").classList.remove("alreadyChosen")
        document.getElementById("33").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("34").classList.remove("red")
        document.getElementById("34").classList.remove("purple")
        document.getElementById("34").classList.remove("alreadyChosen")
        document.getElementById("34").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("35").classList.remove("red")
        document.getElementById("35").classList.remove("purple")
        document.getElementById("35").classList.remove("alreadyChosen")
        document.getElementById("35").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("36").classList.remove("red")
        document.getElementById("36").classList.remove("purple")
        document.getElementById("36").classList.remove("alreadyChosen")
        document.getElementById("36").classList.add("lowestAvailableCellInColumn")

        document.getElementById("37").classList.remove("red")
        document.getElementById("37").classList.remove("purple")
        document.getElementById("37").classList.remove("alreadyChosen")
        document.getElementById("37").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("38").classList.remove("red")
        document.getElementById("38").classList.remove("purple")
        document.getElementById("38").classList.remove("alreadyChosen")
        document.getElementById("38").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("39").classList.remove("red")
        document.getElementById("39").classList.remove("purple")
        document.getElementById("39").classList.remove("alreadyChosen")
        document.getElementById("39").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("40").classList.remove("red")
        document.getElementById("40").classList.remove("purple")
        document.getElementById("40").classList.remove("alreadyChosen")
        document.getElementById("40").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("41").classList.remove("red")
        document.getElementById("41").classList.remove("purple")
        document.getElementById("41").classList.remove("alreadyChosen")
        document.getElementById("41").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("42").classList.remove("red")
        document.getElementById("42").classList.remove("purple")
        document.getElementById("42").classList.remove("alreadyChosen")
        document.getElementById("42").classList.add("lowestAvailableCellInColumn")

        playerTurn = undefined;
    } else if (
        //COLUMN 1
        (document.getElementById("1").classList.contains("purple") && document.getElementById("2").classList.contains("purple") && 
        document.getElementById("3").classList.contains("purple") && document.getElementById("4").classList.contains("purple")) ||

        (document.getElementById("2").classList.contains("purple") && document.getElementById("3").classList.contains("purple") && 
        document.getElementById("4").classList.contains("purple") && document.getElementById("5").classList.contains("purple")) ||

        (document.getElementById("3").classList.contains("purple") && document.getElementById("4").classList.contains("purple") && 
        document.getElementById("5").classList.contains("purple") && document.getElementById("6").classList.contains("purple")) ||

        //COLUMN 2
        (document.getElementById("7").classList.contains("purple") && document.getElementById("8").classList.contains("purple") && 
        document.getElementById("9").classList.contains("purple") && document.getElementById("10").classList.contains("purple")) ||

        (document.getElementById("8").classList.contains("purple") && document.getElementById("9").classList.contains("purple") && 
        document.getElementById("10").classList.contains("purple") && document.getElementById("11").classList.contains("purple"))||
        
        (document.getElementById("9").classList.contains("purple") && document.getElementById("10").classList.contains("purple") && 
        document.getElementById("11").classList.contains("purple") && document.getElementById("12").classList.contains("purple")) ||

        //COLUMN 3
        (document.getElementById("13").classList.contains("purple") && document.getElementById("14").classList.contains("purple") && 
        document.getElementById("15").classList.contains("purple") && document.getElementById("16").classList.contains("purple")) ||

        (document.getElementById("14").classList.contains("purple") && document.getElementById("15").classList.contains("purple") && 
        document.getElementById("16").classList.contains("purple") && document.getElementById("17").classList.contains("purple")) ||

        (document.getElementById("15").classList.contains("purple") && document.getElementById("16").classList.contains("purple") && 
        document.getElementById("17").classList.contains("purple") && document.getElementById("18").classList.contains("purple")) ||

        //COLUMN 4
        (document.getElementById("19").classList.contains("purple") && document.getElementById("20").classList.contains("purple") && 
        document.getElementById("21").classList.contains("purple") && document.getElementById("22").classList.contains("purple")) ||

        (document.getElementById("20").classList.contains("purple") && document.getElementById("21").classList.contains("purple") && 
        document.getElementById("22").classList.contains("purple") && document.getElementById("23").classList.contains("purple")) ||

        (document.getElementById("21").classList.contains("purple") && document.getElementById("22").classList.contains("purple") && 
        document.getElementById("23").classList.contains("purple") && document.getElementById("24").classList.contains("purple")) ||

        //COLUMN 5
        (document.getElementById("25").classList.contains("purple") && document.getElementById("26").classList.contains("purple") && 
        document.getElementById("27").classList.contains("purple") && document.getElementById("28").classList.contains("purple")) ||

        (document.getElementById("26").classList.contains("purple") && document.getElementById("27").classList.contains("purple") && 
        document.getElementById("28").classList.contains("purple") && document.getElementById("29").classList.contains("purple")) ||

        (document.getElementById("27").classList.contains("purple") && document.getElementById("28").classList.contains("purple") && 
        document.getElementById("29").classList.contains("purple") && document.getElementById("30").classList.contains("purple")) ||

        //COLUMN 6
        (document.getElementById("31").classList.contains("purple") && document.getElementById("32").classList.contains("purple") && 
        document.getElementById("33").classList.contains("purple") && document.getElementById("34").classList.contains("purple")) ||

        (document.getElementById("32").classList.contains("purple") && document.getElementById("33").classList.contains("purple") && 
        document.getElementById("34").classList.contains("purple") && document.getElementById("35").classList.contains("purple")) ||

        (document.getElementById("33").classList.contains("purple") && document.getElementById("34").classList.contains("purple") && 
        document.getElementById("35").classList.contains("purple") && document.getElementById("36").classList.contains("purple")) ||

        //COLUMN 7
        (document.getElementById("37").classList.contains("purple") && document.getElementById("38").classList.contains("purple") && 
        document.getElementById("39").classList.contains("purple") && document.getElementById("40").classList.contains("purple")) ||

        (document.getElementById("38").classList.contains("purple") && document.getElementById("39").classList.contains("purple") && 
        document.getElementById("40").classList.contains("purple") && document.getElementById("41").classList.contains("purple")) ||

        (document.getElementById("39").classList.contains("purple") && document.getElementById("40").classList.contains("purple") && 
        document.getElementById("41").classList.contains("purple") && document.getElementById("42").classList.contains("purple")) ||

        //ROW 1
        (document.getElementById("1").classList.contains("purple") && document.getElementById("7").classList.contains("purple") && 
        document.getElementById("13").classList.contains("purple") && document.getElementById("19").classList.contains("purple")) ||

        (document.getElementById("7").classList.contains("purple") && document.getElementById("13").classList.contains("purple") && 
        document.getElementById("19").classList.contains("purple") && document.getElementById("25").classList.contains("purple")) ||

        (document.getElementById("13").classList.contains("purple") && document.getElementById("19").classList.contains("purple") && 
        document.getElementById("25").classList.contains("purple") && document.getElementById("31").classList.contains("purple")) ||

        (document.getElementById("19").classList.contains("purple") && document.getElementById("25").classList.contains("purple") && 
        document.getElementById("31").classList.contains("purple") && document.getElementById("37").classList.contains("purple")) ||

        //ROW 2
        (document.getElementById("2").classList.contains("purple") && document.getElementById("8").classList.contains("purple") && 
        document.getElementById("14").classList.contains("purple") && document.getElementById("20").classList.contains("purple")) ||

        (document.getElementById("8").classList.contains("purple") && document.getElementById("14").classList.contains("purple") && 
        document.getElementById("20").classList.contains("purple") && document.getElementById("26").classList.contains("purple")) ||

        (document.getElementById("14").classList.contains("purple") && document.getElementById("20").classList.contains("purple") && 
        document.getElementById("26").classList.contains("purple") && document.getElementById("32").classList.contains("purple")) ||

        (document.getElementById("20").classList.contains("purple") && document.getElementById("26").classList.contains("purple") && 
        document.getElementById("32").classList.contains("purple") && document.getElementById("38").classList.contains("purple")) ||

        //ROW 3
        (document.getElementById("3").classList.contains("purple") && document.getElementById("9").classList.contains("purple") && 
        document.getElementById("15").classList.contains("purple") && document.getElementById("21").classList.contains("purple")) ||

        (document.getElementById("9").classList.contains("purple") && document.getElementById("15").classList.contains("purple") && 
        document.getElementById("21").classList.contains("purple") && document.getElementById("27").classList.contains("purple")) ||

        (document.getElementById("15").classList.contains("purple") && document.getElementById("21").classList.contains("purple") && 
        document.getElementById("27").classList.contains("purple") && document.getElementById("33").classList.contains("purple")) ||

        (document.getElementById("21").classList.contains("purple") && document.getElementById("27").classList.contains("purple") && 
        document.getElementById("33").classList.contains("purple") && document.getElementById("39").classList.contains("purple")) ||

        //ROW 4
        (document.getElementById("4").classList.contains("purple") && document.getElementById("10").classList.contains("purple") && 
        document.getElementById("16").classList.contains("purple") && document.getElementById("22").classList.contains("purple")) ||

        (document.getElementById("10").classList.contains("purple") && document.getElementById("16").classList.contains("purple") && 
        document.getElementById("22").classList.contains("purple") && document.getElementById("28").classList.contains("purple")) ||

        (document.getElementById("16").classList.contains("purple") && document.getElementById("22").classList.contains("purple") && 
        document.getElementById("28").classList.contains("purple") && document.getElementById("34").classList.contains("purple")) ||

        (document.getElementById("22").classList.contains("purple") && document.getElementById("28").classList.contains("purple") && 
        document.getElementById("34").classList.contains("purple") && document.getElementById("40").classList.contains("purple")) ||

        //ROW 5
        (document.getElementById("5").classList.contains("purple") && document.getElementById("11").classList.contains("purple") && 
        document.getElementById("17").classList.contains("purple") && document.getElementById("23").classList.contains("purple")) ||

        (document.getElementById("11").classList.contains("purple") && document.getElementById("17").classList.contains("purple") && 
        document.getElementById("23").classList.contains("purple") && document.getElementById("29").classList.contains("purple")) ||

        (document.getElementById("17").classList.contains("purple") && document.getElementById("23").classList.contains("purple") && 
        document.getElementById("29").classList.contains("purple") && document.getElementById("35").classList.contains("purple")) ||

        (document.getElementById("23").classList.contains("purple") && document.getElementById("29").classList.contains("purple") && 
        document.getElementById("35").classList.contains("purple") && document.getElementById("41").classList.contains("purple")) ||

        //ROW 6
        (document.getElementById("6").classList.contains("purple") && document.getElementById("12").classList.contains("purple") && 
        document.getElementById("18").classList.contains("purple") && document.getElementById("24").classList.contains("purple")) ||

        (document.getElementById("12").classList.contains("purple") && document.getElementById("18").classList.contains("purple") && 
        document.getElementById("24").classList.contains("purple") && document.getElementById("30").classList.contains("purple")) ||

        (document.getElementById("18").classList.contains("purple") && document.getElementById("24").classList.contains("purple") && 
        document.getElementById("30").classList.contains("purple") && document.getElementById("36").classList.contains("purple")) ||

        (document.getElementById("24").classList.contains("purple") && document.getElementById("30").classList.contains("purple") && 
        document.getElementById("36").classList.contains("purple") && document.getElementById("42").classList.contains("purple")) ||

        //DIAGONAL FROM BOTTOM LEFT CORNER (WORKING UP COLUMN 1)
        (document.getElementById("3").classList.contains("purple") && document.getElementById("10").classList.contains("purple") && 
        document.getElementById("17").classList.contains("purple") && document.getElementById("24").classList.contains("purple")) ||

        (document.getElementById("2").classList.contains("purple") && document.getElementById("9").classList.contains("purple") && 
        document.getElementById("16").classList.contains("purple") && document.getElementById("23").classList.contains("purple")) ||

        (document.getElementById("9").classList.contains("purple") && document.getElementById("16").classList.contains("purple") && 
        document.getElementById("23").classList.contains("purple") && document.getElementById("30").classList.contains("purple")) ||

        (document.getElementById("1").classList.contains("purple") && document.getElementById("8").classList.contains("purple") && 
        document.getElementById("15").classList.contains("purple") && document.getElementById("22").classList.contains("purple")) ||

        (document.getElementById("8").classList.contains("purple") && document.getElementById("15").classList.contains("purple") && 
        document.getElementById("22").classList.contains("purple") && document.getElementById("29").classList.contains("purple")) ||

        (document.getElementById("15").classList.contains("purple") && document.getElementById("22").classList.contains("purple") && 
        document.getElementById("29").classList.contains("purple") && document.getElementById("36").classList.contains("purple")) ||

        //DIAGONAL FROM BOTTOM LEFT CORNER (WORKING ACROSS ROW 1 LEFT TO RIGHT)
        (document.getElementById("7").classList.contains("purple") && document.getElementById("14").classList.contains("purple") && 
        document.getElementById("21").classList.contains("purple") && document.getElementById("28").classList.contains("purple")) ||

        (document.getElementById("14").classList.contains("purple") && document.getElementById("21").classList.contains("purple") && 
        document.getElementById("28").classList.contains("purple") && document.getElementById("35").classList.contains("purple")) ||

        (document.getElementById("21").classList.contains("purple") && document.getElementById("28").classList.contains("purple") && 
        document.getElementById("35").classList.contains("purple") && document.getElementById("42").classList.contains("purple")) ||

        (document.getElementById("13").classList.contains("purple") && document.getElementById("20").classList.contains("purple") && 
        document.getElementById("27").classList.contains("purple") && document.getElementById("34").classList.contains("purple")) ||

        (document.getElementById("20").classList.contains("purple") && document.getElementById("27").classList.contains("purple") && 
        document.getElementById("34").classList.contains("purple") && document.getElementById("41").classList.contains("purple")) ||

        (document.getElementById("19").classList.contains("purple") && document.getElementById("26").classList.contains("purple") && 
        document.getElementById("33").classList.contains("purple") && document.getElementById("40").classList.contains("purple")) ||

        //DIAGONAL FROM BOTTOM RIGHT CORNER (WORKING UP COLUMN 7)
        (document.getElementById("39").classList.contains("purple") && document.getElementById("34").classList.contains("purple") && 
        document.getElementById("29").classList.contains("purple") && document.getElementById("24").classList.contains("purple")) ||

        (document.getElementById("38").classList.contains("purple") && document.getElementById("33").classList.contains("purple") && 
        document.getElementById("28").classList.contains("purple") && document.getElementById("23").classList.contains("purple")) ||

        (document.getElementById("33").classList.contains("purple") && document.getElementById("28").classList.contains("purple") && 
        document.getElementById("23").classList.contains("purple") && document.getElementById("18").classList.contains("purple")) ||

        (document.getElementById("37").classList.contains("purple") && document.getElementById("32").classList.contains("purple") && 
        document.getElementById("27").classList.contains("purple") && document.getElementById("22").classList.contains("purple")) ||

        (document.getElementById("32").classList.contains("purple") && document.getElementById("27").classList.contains("purple") && 
        document.getElementById("22").classList.contains("purple") && document.getElementById("17").classList.contains("purple")) ||

        (document.getElementById("27").classList.contains("purple") && document.getElementById("22").classList.contains("purple") && 
        document.getElementById("17").classList.contains("purple") && document.getElementById("12").classList.contains("purple")) ||

        //DIAGONAL FROM BOTTOM RIGHT CORNER (WORKING ACROSS ROW 1 FROM RIGHT TO LEFT)
        (document.getElementById("31").classList.contains("purple") && document.getElementById("26").classList.contains("purple") && 
        document.getElementById("21").classList.contains("purple") && document.getElementById("16").classList.contains("purple")) ||

        (document.getElementById("26").classList.contains("purple") && document.getElementById("21").classList.contains("purple") && 
        document.getElementById("16").classList.contains("purple") && document.getElementById("11").classList.contains("purple")) ||

        (document.getElementById("21").classList.contains("purple") && document.getElementById("16").classList.contains("purple") && 
        document.getElementById("11").classList.contains("purple") && document.getElementById("6").classList.contains("purple")) ||

        (document.getElementById("25").classList.contains("purple") && document.getElementById("20").classList.contains("purple") && 
        document.getElementById("15").classList.contains("purple") && document.getElementById("10").classList.contains("purple")) ||

        (document.getElementById("20").classList.contains("purple") && document.getElementById("15").classList.contains("purple") && 
        document.getElementById("10").classList.contains("purple") && document.getElementById("5").classList.contains("purple")) ||

        (document.getElementById("19").classList.contains("purple") && document.getElementById("14").classList.contains("purple") && 
        document.getElementById("9").classList.contains("purple") && document.getElementById("4").classList.contains("purple")) 
    ){
        alert(player2Name.textContent+" Wins!")
        document.getElementById("1").classList.remove("red")
        document.getElementById("1").classList.remove("purple")
        document.getElementById("1").classList.remove("alreadyChosen")
        document.getElementById("1").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("2").classList.remove("red")
        document.getElementById("2").classList.remove("purple")
        document.getElementById("2").classList.remove("alreadyChosen")
        document.getElementById("2").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("3").classList.remove("red")
        document.getElementById("3").classList.remove("purple")
        document.getElementById("3").classList.remove("alreadyChosen")
        document.getElementById("3").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("4").classList.remove("red")
        document.getElementById("4").classList.remove("purple")
        document.getElementById("4").classList.remove("alreadyChosen")
        document.getElementById("4").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("5").classList.remove("red")
        document.getElementById("5").classList.remove("purple")
        document.getElementById("5").classList.remove("alreadyChosen")
        document.getElementById("5").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("6").classList.remove("red")
        document.getElementById("6").classList.remove("purple")
        document.getElementById("6").classList.remove("alreadyChosen")
        document.getElementById("6").classList.add("lowestAvailableCellInColumn")

        document.getElementById("7").classList.remove("red")
        document.getElementById("7").classList.remove("purple")
        document.getElementById("7").classList.remove("alreadyChosen")
        document.getElementById("7").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("8").classList.remove("red")
        document.getElementById("8").classList.remove("purple")
        document.getElementById("8").classList.remove("alreadyChosen")
        document.getElementById("8").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("9").classList.remove("red")
        document.getElementById("9").classList.remove("purple")
        document.getElementById("9").classList.remove("alreadyChosen")
        document.getElementById("9").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("10").classList.remove("red")
        document.getElementById("10").classList.remove("purple")
        document.getElementById("10").classList.remove("alreadyChosen")
        document.getElementById("10").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("11").classList.remove("red")
        document.getElementById("11").classList.remove("purple")
        document.getElementById("11").classList.remove("alreadyChosen")
        document.getElementById("11").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("12").classList.remove("red")
        document.getElementById("12").classList.remove("purple")
        document.getElementById("12").classList.remove("alreadyChosen")
        document.getElementById("12").classList.add("lowestAvailableCellInColumn")

        document.getElementById("13").classList.remove("red")
        document.getElementById("13").classList.remove("purple")
        document.getElementById("13").classList.remove("alreadyChosen")
        document.getElementById("13").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("14").classList.remove("red")
        document.getElementById("14").classList.remove("purple")
        document.getElementById("14").classList.remove("alreadyChosen")
        document.getElementById("14").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("15").classList.remove("red")
        document.getElementById("15").classList.remove("purple")
        document.getElementById("15").classList.remove("alreadyChosen")
        document.getElementById("15").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("16").classList.remove("red")
        document.getElementById("16").classList.remove("purple")
        document.getElementById("16").classList.remove("alreadyChosen")
        document.getElementById("16").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("17").classList.remove("red")
        document.getElementById("17").classList.remove("purple")
        document.getElementById("17").classList.remove("alreadyChosen")
        document.getElementById("17").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("18").classList.remove("red")
        document.getElementById("18").classList.remove("purple")
        document.getElementById("18").classList.remove("alreadyChosen")
        document.getElementById("18").classList.add("lowestAvailableCellInColumn")

        document.getElementById("19").classList.remove("red")
        document.getElementById("19").classList.remove("purple")
        document.getElementById("19").classList.remove("alreadyChosen")
        document.getElementById("19").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("20").classList.remove("red")
        document.getElementById("20").classList.remove("purple")
        document.getElementById("20").classList.remove("alreadyChosen")
        document.getElementById("20").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("21").classList.remove("red")
        document.getElementById("21").classList.remove("purple")
        document.getElementById("21").classList.remove("alreadyChosen")
        document.getElementById("21").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("22").classList.remove("red")
        document.getElementById("22").classList.remove("purple")
        document.getElementById("22").classList.remove("alreadyChosen")
        document.getElementById("22").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("23").classList.remove("red")
        document.getElementById("23").classList.remove("purple")
        document.getElementById("23").classList.remove("alreadyChosen")
        document.getElementById("23").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("24").classList.remove("red")
        document.getElementById("24").classList.remove("purple")
        document.getElementById("24").classList.remove("alreadyChosen")
        document.getElementById("24").classList.add("lowestAvailableCellInColumn")

        document.getElementById("25").classList.remove("red")
        document.getElementById("25").classList.remove("purple")
        document.getElementById("25").classList.remove("alreadyChosen")
        document.getElementById("25").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("26").classList.remove("red")
        document.getElementById("26").classList.remove("purple")
        document.getElementById("26").classList.remove("alreadyChosen")
        document.getElementById("26").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("27").classList.remove("red")
        document.getElementById("27").classList.remove("purple")
        document.getElementById("27").classList.remove("alreadyChosen")
        document.getElementById("27").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("28").classList.remove("red")
        document.getElementById("28").classList.remove("purple")
        document.getElementById("28").classList.remove("alreadyChosen")
        document.getElementById("28").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("29").classList.remove("red")
        document.getElementById("29").classList.remove("purple")
        document.getElementById("29").classList.remove("alreadyChosen")
        document.getElementById("29").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("30").classList.remove("red")
        document.getElementById("30").classList.remove("purple")
        document.getElementById("30").classList.remove("alreadyChosen")
        document.getElementById("30").classList.add("lowestAvailableCellInColumn")

        document.getElementById("31").classList.remove("red")
        document.getElementById("31").classList.remove("purple")
        document.getElementById("31").classList.remove("alreadyChosen")
        document.getElementById("31").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("32").classList.remove("red")
        document.getElementById("32").classList.remove("purple")
        document.getElementById("32").classList.remove("alreadyChosen")
        document.getElementById("32").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("33").classList.remove("red")
        document.getElementById("33").classList.remove("purple")
        document.getElementById("33").classList.remove("alreadyChosen")
        document.getElementById("33").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("34").classList.remove("red")
        document.getElementById("34").classList.remove("purple")
        document.getElementById("34").classList.remove("alreadyChosen")
        document.getElementById("34").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("35").classList.remove("red")
        document.getElementById("35").classList.remove("purple")
        document.getElementById("35").classList.remove("alreadyChosen")
        document.getElementById("35").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("36").classList.remove("red")
        document.getElementById("36").classList.remove("purple")
        document.getElementById("36").classList.remove("alreadyChosen")
        document.getElementById("36").classList.add("lowestAvailableCellInColumn")

        document.getElementById("37").classList.remove("red")
        document.getElementById("37").classList.remove("purple")
        document.getElementById("37").classList.remove("alreadyChosen")
        document.getElementById("37").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("38").classList.remove("red")
        document.getElementById("38").classList.remove("purple")
        document.getElementById("38").classList.remove("alreadyChosen")
        document.getElementById("38").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("39").classList.remove("red")
        document.getElementById("39").classList.remove("purple")
        document.getElementById("39").classList.remove("alreadyChosen")
        document.getElementById("39").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("40").classList.remove("red")
        document.getElementById("40").classList.remove("purple")
        document.getElementById("40").classList.remove("alreadyChosen")
        document.getElementById("40").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("41").classList.remove("red")
        document.getElementById("41").classList.remove("purple")
        document.getElementById("41").classList.remove("alreadyChosen")
        document.getElementById("41").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("42").classList.remove("red")
        document.getElementById("42").classList.remove("purple")
        document.getElementById("42").classList.remove("alreadyChosen")
        document.getElementById("42").classList.add("lowestAvailableCellInColumn")

        playerTurn = undefined;
    }
    //setting up reset for if board fills up and no one has connected 4
    else if(
        (document.getElementById("1").classList.contains("red") || document.getElementById("1").classList.contains("purple")) &&
        (document.getElementById("2").classList.contains("red") || document.getElementById("2").classList.contains("purple")) &&
        (document.getElementById("3").classList.contains("red") || document.getElementById("3").classList.contains("purple")) &&
        (document.getElementById("4").classList.contains("red") || document.getElementById("4").classList.contains("purple")) &&
        (document.getElementById("5").classList.contains("red") || document.getElementById("5").classList.contains("purple")) &&
        (document.getElementById("6").classList.contains("red") || document.getElementById("6").classList.contains("purple")) &&
        (document.getElementById("7").classList.contains("red") || document.getElementById("7").classList.contains("purple")) &&
        (document.getElementById("8").classList.contains("red") || document.getElementById("8").classList.contains("purple")) &&
        (document.getElementById("9").classList.contains("red") || document.getElementById("9").classList.contains("purple")) &&
        (document.getElementById("10").classList.contains("red") || document.getElementById("10").classList.contains("purple")) &&
        (document.getElementById("11").classList.contains("red") || document.getElementById("11").classList.contains("purple")) &&
        (document.getElementById("12").classList.contains("red") || document.getElementById("12").classList.contains("purple")) &&
        (document.getElementById("13").classList.contains("red") || document.getElementById("13").classList.contains("purple")) &&
        (document.getElementById("14").classList.contains("red") || document.getElementById("14").classList.contains("purple")) &&
        (document.getElementById("15").classList.contains("red") || document.getElementById("15").classList.contains("purple")) &&
        (document.getElementById("16").classList.contains("red") || document.getElementById("16").classList.contains("purple")) &&
        (document.getElementById("17").classList.contains("red") || document.getElementById("17").classList.contains("purple")) &&
        (document.getElementById("18").classList.contains("red") || document.getElementById("18").classList.contains("purple")) &&
        (document.getElementById("19").classList.contains("red") || document.getElementById("19").classList.contains("purple")) &&
        (document.getElementById("20").classList.contains("red") || document.getElementById("20").classList.contains("purple")) &&
        (document.getElementById("21").classList.contains("red") || document.getElementById("21").classList.contains("purple")) &&
        (document.getElementById("22").classList.contains("red") || document.getElementById("22").classList.contains("purple")) &&
        (document.getElementById("23").classList.contains("red") || document.getElementById("23").classList.contains("purple")) &&
        (document.getElementById("24").classList.contains("red") || document.getElementById("24").classList.contains("purple")) &&
        (document.getElementById("25").classList.contains("red") || document.getElementById("25").classList.contains("purple")) &&
        (document.getElementById("26").classList.contains("red") || document.getElementById("26").classList.contains("purple")) &&
        (document.getElementById("27").classList.contains("red") || document.getElementById("27").classList.contains("purple")) &&
        (document.getElementById("28").classList.contains("red") || document.getElementById("28").classList.contains("purple")) &&
        (document.getElementById("29").classList.contains("red") || document.getElementById("29").classList.contains("purple")) &&
        (document.getElementById("30").classList.contains("red") || document.getElementById("30").classList.contains("purple")) &&
        (document.getElementById("31").classList.contains("red") || document.getElementById("31").classList.contains("purple")) &&
        (document.getElementById("32").classList.contains("red") || document.getElementById("32").classList.contains("purple")) &&
        (document.getElementById("33").classList.contains("red") || document.getElementById("33").classList.contains("purple")) &&
        (document.getElementById("34").classList.contains("red") || document.getElementById("34").classList.contains("purple")) &&
        (document.getElementById("35").classList.contains("red") || document.getElementById("35").classList.contains("purple")) &&
        (document.getElementById("36").classList.contains("red") || document.getElementById("36").classList.contains("purple")) &&
        (document.getElementById("37").classList.contains("red") || document.getElementById("37").classList.contains("purple")) &&
        (document.getElementById("38").classList.contains("red") || document.getElementById("38").classList.contains("purple")) &&
        (document.getElementById("39").classList.contains("red") || document.getElementById("39").classList.contains("purple")) &&
        (document.getElementById("40").classList.contains("red") || document.getElementById("40").classList.contains("purple")) &&
        (document.getElementById("41").classList.contains("red") || document.getElementById("41").classList.contains("purple")) &&
        (document.getElementById("42").classList.contains("red") || document.getElementById("42").classList.contains("purple"))
        ){
            alert("You somehow managed to fill up the entire board without either player winning. Bravo, that's a feat in and of itself. Resetting the board now.")
        document.getElementById("1").classList.remove("red")
        document.getElementById("1").classList.remove("purple")
        document.getElementById("1").classList.remove("alreadyChosen")
        document.getElementById("1").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("2").classList.remove("red")
        document.getElementById("2").classList.remove("purple")
        document.getElementById("2").classList.remove("alreadyChosen")
        document.getElementById("2").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("3").classList.remove("red")
        document.getElementById("3").classList.remove("purple")
        document.getElementById("3").classList.remove("alreadyChosen")
        document.getElementById("3").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("4").classList.remove("red")
        document.getElementById("4").classList.remove("purple")
        document.getElementById("4").classList.remove("alreadyChosen")
        document.getElementById("4").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("5").classList.remove("red")
        document.getElementById("5").classList.remove("purple")
        document.getElementById("5").classList.remove("alreadyChosen")
        document.getElementById("5").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("6").classList.remove("red")
        document.getElementById("6").classList.remove("purple")
        document.getElementById("6").classList.remove("alreadyChosen")
        document.getElementById("6").classList.add("lowestAvailableCellInColumn")

        document.getElementById("7").classList.remove("red")
        document.getElementById("7").classList.remove("purple")
        document.getElementById("7").classList.remove("alreadyChosen")
        document.getElementById("7").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("8").classList.remove("red")
        document.getElementById("8").classList.remove("purple")
        document.getElementById("8").classList.remove("alreadyChosen")
        document.getElementById("8").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("9").classList.remove("red")
        document.getElementById("9").classList.remove("purple")
        document.getElementById("9").classList.remove("alreadyChosen")
        document.getElementById("9").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("10").classList.remove("red")
        document.getElementById("10").classList.remove("purple")
        document.getElementById("10").classList.remove("alreadyChosen")
        document.getElementById("10").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("11").classList.remove("red")
        document.getElementById("11").classList.remove("purple")
        document.getElementById("11").classList.remove("alreadyChosen")
        document.getElementById("11").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("12").classList.remove("red")
        document.getElementById("12").classList.remove("purple")
        document.getElementById("12").classList.remove("alreadyChosen")
        document.getElementById("12").classList.add("lowestAvailableCellInColumn")

        document.getElementById("13").classList.remove("red")
        document.getElementById("13").classList.remove("purple")
        document.getElementById("13").classList.remove("alreadyChosen")
        document.getElementById("13").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("14").classList.remove("red")
        document.getElementById("14").classList.remove("purple")
        document.getElementById("14").classList.remove("alreadyChosen")
        document.getElementById("14").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("15").classList.remove("red")
        document.getElementById("15").classList.remove("purple")
        document.getElementById("15").classList.remove("alreadyChosen")
        document.getElementById("15").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("16").classList.remove("red")
        document.getElementById("16").classList.remove("purple")
        document.getElementById("16").classList.remove("alreadyChosen")
        document.getElementById("16").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("17").classList.remove("red")
        document.getElementById("17").classList.remove("purple")
        document.getElementById("17").classList.remove("alreadyChosen")
        document.getElementById("17").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("18").classList.remove("red")
        document.getElementById("18").classList.remove("purple")
        document.getElementById("18").classList.remove("alreadyChosen")
        document.getElementById("18").classList.add("lowestAvailableCellInColumn")

        document.getElementById("19").classList.remove("red")
        document.getElementById("19").classList.remove("purple")
        document.getElementById("19").classList.remove("alreadyChosen")
        document.getElementById("19").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("20").classList.remove("red")
        document.getElementById("20").classList.remove("purple")
        document.getElementById("20").classList.remove("alreadyChosen")
        document.getElementById("20").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("21").classList.remove("red")
        document.getElementById("21").classList.remove("purple")
        document.getElementById("21").classList.remove("alreadyChosen")
        document.getElementById("21").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("22").classList.remove("red")
        document.getElementById("22").classList.remove("purple")
        document.getElementById("22").classList.remove("alreadyChosen")
        document.getElementById("22").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("23").classList.remove("red")
        document.getElementById("23").classList.remove("purple")
        document.getElementById("23").classList.remove("alreadyChosen")
        document.getElementById("23").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("24").classList.remove("red")
        document.getElementById("24").classList.remove("purple")
        document.getElementById("24").classList.remove("alreadyChosen")
        document.getElementById("24").classList.add("lowestAvailableCellInColumn")

        document.getElementById("25").classList.remove("red")
        document.getElementById("25").classList.remove("purple")
        document.getElementById("25").classList.remove("alreadyChosen")
        document.getElementById("25").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("26").classList.remove("red")
        document.getElementById("26").classList.remove("purple")
        document.getElementById("26").classList.remove("alreadyChosen")
        document.getElementById("26").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("27").classList.remove("red")
        document.getElementById("27").classList.remove("purple")
        document.getElementById("27").classList.remove("alreadyChosen")
        document.getElementById("27").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("28").classList.remove("red")
        document.getElementById("28").classList.remove("purple")
        document.getElementById("28").classList.remove("alreadyChosen")
        document.getElementById("28").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("29").classList.remove("red")
        document.getElementById("29").classList.remove("purple")
        document.getElementById("29").classList.remove("alreadyChosen")
        document.getElementById("29").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("30").classList.remove("red")
        document.getElementById("30").classList.remove("purple")
        document.getElementById("30").classList.remove("alreadyChosen")
        document.getElementById("30").classList.add("lowestAvailableCellInColumn")

        document.getElementById("31").classList.remove("red")
        document.getElementById("31").classList.remove("purple")
        document.getElementById("31").classList.remove("alreadyChosen")
        document.getElementById("31").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("32").classList.remove("red")
        document.getElementById("32").classList.remove("purple")
        document.getElementById("32").classList.remove("alreadyChosen")
        document.getElementById("32").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("33").classList.remove("red")
        document.getElementById("33").classList.remove("purple")
        document.getElementById("33").classList.remove("alreadyChosen")
        document.getElementById("33").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("34").classList.remove("red")
        document.getElementById("34").classList.remove("purple")
        document.getElementById("34").classList.remove("alreadyChosen")
        document.getElementById("34").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("35").classList.remove("red")
        document.getElementById("35").classList.remove("purple")
        document.getElementById("35").classList.remove("alreadyChosen")
        document.getElementById("35").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("36").classList.remove("red")
        document.getElementById("36").classList.remove("purple")
        document.getElementById("36").classList.remove("alreadyChosen")
        document.getElementById("36").classList.add("lowestAvailableCellInColumn")

        document.getElementById("37").classList.remove("red")
        document.getElementById("37").classList.remove("purple")
        document.getElementById("37").classList.remove("alreadyChosen")
        document.getElementById("37").classList.remove("lowestAvailableCellInColumn")

        document.getElementById("38").classList.remove("red")
        document.getElementById("38").classList.remove("purple")
        document.getElementById("38").classList.remove("alreadyChosen")
        document.getElementById("38").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("39").classList.remove("red")
        document.getElementById("39").classList.remove("purple")
        document.getElementById("39").classList.remove("alreadyChosen")
        document.getElementById("39").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("40").classList.remove("red")
        document.getElementById("40").classList.remove("purple")
        document.getElementById("40").classList.remove("alreadyChosen")
        document.getElementById("40").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("41").classList.remove("red")
        document.getElementById("41").classList.remove("purple")
        document.getElementById("41").classList.remove("alreadyChosen")
        document.getElementById("41").classList.remove("lowestAvailableCellInColumn")
        
        document.getElementById("42").classList.remove("red")
        document.getElementById("42").classList.remove("purple")
        document.getElementById("42").classList.remove("alreadyChosen")
        document.getElementById("42").classList.add("lowestAvailableCellInColumn")

        playerTurn = undefined;
        }
}

//setting up reset button
let resetButton = document.getElementById("reset")

resetButton.addEventListener("click",resetGame)

function resetGame(){
    alert("The game has been reset.")
    document.getElementById("1").classList.remove("red")
    document.getElementById("1").classList.remove("purple")
    document.getElementById("1").classList.remove("alreadyChosen")
    document.getElementById("1").classList.remove("lowestAvailableCellInColumn")

    document.getElementById("2").classList.remove("red")
    document.getElementById("2").classList.remove("purple")
    document.getElementById("2").classList.remove("alreadyChosen")
    document.getElementById("2").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("3").classList.remove("red")
    document.getElementById("3").classList.remove("purple")
    document.getElementById("3").classList.remove("alreadyChosen")
    document.getElementById("3").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("4").classList.remove("red")
    document.getElementById("4").classList.remove("purple")
    document.getElementById("4").classList.remove("alreadyChosen")
    document.getElementById("4").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("5").classList.remove("red")
    document.getElementById("5").classList.remove("purple")
    document.getElementById("5").classList.remove("alreadyChosen")
    document.getElementById("5").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("6").classList.remove("red")
    document.getElementById("6").classList.remove("purple")
    document.getElementById("6").classList.remove("alreadyChosen")
    document.getElementById("6").classList.add("lowestAvailableCellInColumn")

    document.getElementById("7").classList.remove("red")
    document.getElementById("7").classList.remove("purple")
    document.getElementById("7").classList.remove("alreadyChosen")
    document.getElementById("7").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("8").classList.remove("red")
    document.getElementById("8").classList.remove("purple")
    document.getElementById("8").classList.remove("alreadyChosen")
    document.getElementById("8").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("9").classList.remove("red")
    document.getElementById("9").classList.remove("purple")
    document.getElementById("9").classList.remove("alreadyChosen")
    document.getElementById("9").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("10").classList.remove("red")
    document.getElementById("10").classList.remove("purple")
    document.getElementById("10").classList.remove("alreadyChosen")
    document.getElementById("10").classList.remove("lowestAvailableCellInColumn")

    document.getElementById("11").classList.remove("red")
    document.getElementById("11").classList.remove("purple")
    document.getElementById("11").classList.remove("alreadyChosen")
    document.getElementById("11").classList.remove("lowestAvailableCellInColumn")

    document.getElementById("12").classList.remove("red")
    document.getElementById("12").classList.remove("purple")
    document.getElementById("12").classList.remove("alreadyChosen")
    document.getElementById("12").classList.add("lowestAvailableCellInColumn")

    document.getElementById("13").classList.remove("red")
    document.getElementById("13").classList.remove("purple")
    document.getElementById("13").classList.remove("alreadyChosen")
    document.getElementById("13").classList.remove("lowestAvailableCellInColumn")

    document.getElementById("14").classList.remove("red")
    document.getElementById("14").classList.remove("purple")
    document.getElementById("14").classList.remove("alreadyChosen")
    document.getElementById("14").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("15").classList.remove("red")
    document.getElementById("15").classList.remove("purple")
    document.getElementById("15").classList.remove("alreadyChosen")
    document.getElementById("15").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("16").classList.remove("red")
    document.getElementById("16").classList.remove("purple")
    document.getElementById("16").classList.remove("alreadyChosen")
    document.getElementById("16").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("17").classList.remove("red")
    document.getElementById("17").classList.remove("purple")
    document.getElementById("17").classList.remove("alreadyChosen")
    document.getElementById("17").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("18").classList.remove("red")
    document.getElementById("18").classList.remove("purple")
    document.getElementById("18").classList.remove("alreadyChosen")
    document.getElementById("18").classList.add("lowestAvailableCellInColumn")

    document.getElementById("19").classList.remove("red")
    document.getElementById("19").classList.remove("purple")
    document.getElementById("19").classList.remove("alreadyChosen")
    document.getElementById("19").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("20").classList.remove("red")
    document.getElementById("20").classList.remove("purple")
    document.getElementById("20").classList.remove("alreadyChosen")
    document.getElementById("20").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("21").classList.remove("red")
    document.getElementById("21").classList.remove("purple")
    document.getElementById("21").classList.remove("alreadyChosen")
    document.getElementById("21").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("22").classList.remove("red")
    document.getElementById("22").classList.remove("purple")
    document.getElementById("22").classList.remove("alreadyChosen")
    document.getElementById("22").classList.remove("lowestAvailableCellInColumn")

    document.getElementById("23").classList.remove("red")
    document.getElementById("23").classList.remove("purple")
    document.getElementById("23").classList.remove("alreadyChosen")
    document.getElementById("23").classList.remove("lowestAvailableCellInColumn")

    document.getElementById("24").classList.remove("red")
    document.getElementById("24").classList.remove("purple")
    document.getElementById("24").classList.remove("alreadyChosen")
    document.getElementById("24").classList.add("lowestAvailableCellInColumn")

    document.getElementById("25").classList.remove("red")
    document.getElementById("25").classList.remove("purple")
    document.getElementById("25").classList.remove("alreadyChosen")
    document.getElementById("25").classList.remove("lowestAvailableCellInColumn")

    document.getElementById("26").classList.remove("red")
    document.getElementById("26").classList.remove("purple")
    document.getElementById("26").classList.remove("alreadyChosen")
    document.getElementById("26").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("27").classList.remove("red")
    document.getElementById("27").classList.remove("purple")
    document.getElementById("27").classList.remove("alreadyChosen")
    document.getElementById("27").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("28").classList.remove("red")
    document.getElementById("28").classList.remove("purple")
    document.getElementById("28").classList.remove("alreadyChosen")
    document.getElementById("28").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("29").classList.remove("red")
    document.getElementById("29").classList.remove("purple")
    document.getElementById("29").classList.remove("alreadyChosen")
    document.getElementById("29").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("30").classList.remove("red")
    document.getElementById("30").classList.remove("purple")
    document.getElementById("30").classList.remove("alreadyChosen")
    document.getElementById("30").classList.add("lowestAvailableCellInColumn")

    document.getElementById("31").classList.remove("red")
    document.getElementById("31").classList.remove("purple")
    document.getElementById("31").classList.remove("alreadyChosen")
    document.getElementById("31").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("32").classList.remove("red")
    document.getElementById("32").classList.remove("purple")
    document.getElementById("32").classList.remove("alreadyChosen")
    document.getElementById("32").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("33").classList.remove("red")
    document.getElementById("33").classList.remove("purple")
    document.getElementById("33").classList.remove("alreadyChosen")
    document.getElementById("33").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("34").classList.remove("red")
    document.getElementById("34").classList.remove("purple")
    document.getElementById("34").classList.remove("alreadyChosen")
    document.getElementById("34").classList.remove("lowestAvailableCellInColumn")

    document.getElementById("35").classList.remove("red")
    document.getElementById("35").classList.remove("purple")
    document.getElementById("35").classList.remove("alreadyChosen")
    document.getElementById("35").classList.remove("lowestAvailableCellInColumn")

    document.getElementById("36").classList.remove("red")
    document.getElementById("36").classList.remove("purple")
    document.getElementById("36").classList.remove("alreadyChosen")
    document.getElementById("36").classList.add("lowestAvailableCellInColumn")

    document.getElementById("37").classList.remove("red")
    document.getElementById("37").classList.remove("purple")
    document.getElementById("37").classList.remove("alreadyChosen")
    document.getElementById("37").classList.remove("lowestAvailableCellInColumn")

    document.getElementById("38").classList.remove("red")
    document.getElementById("38").classList.remove("purple")
    document.getElementById("38").classList.remove("alreadyChosen")
    document.getElementById("38").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("39").classList.remove("red")
    document.getElementById("39").classList.remove("purple")
    document.getElementById("39").classList.remove("alreadyChosen")
    document.getElementById("39").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("40").classList.remove("red")
    document.getElementById("40").classList.remove("purple")
    document.getElementById("40").classList.remove("alreadyChosen")
    document.getElementById("40").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("41").classList.remove("red")
    document.getElementById("41").classList.remove("purple")
    document.getElementById("41").classList.remove("alreadyChosen")
    document.getElementById("41").classList.remove("lowestAvailableCellInColumn")
    
    document.getElementById("42").classList.remove("red")
    document.getElementById("42").classList.remove("purple")
    document.getElementById("42").classList.remove("alreadyChosen")
    document.getElementById("42").classList.add("lowestAvailableCellInColumn")

    playerTurn = undefined;
}
