//Javascript worte by Yulong Fang
//Globle Vars
var CurrentPlayer = "X";
var gameGrid = document.getElementsByClassName("cell");
var gridCount = gameGrid.length;
var popsup = document.getElementById("popsupMsg");
var pauseContinuesBtn = document.getElementById("pauseGame");
window.onload = function () {
    updateMsg("Player X's turn!");
    popsup.style.visibility = "hidden";
    for (var i = 0; i < gridCount; i++) {
        gameGrid[i].addEventListener("click", function () {
            if (CurrentPlayer == "X" && this.innerHTML == "") {
                this.innerHTML = "X";
                updateMsg("Player O's turn!");
                checkResult(CurrentPlayer);
                CurrentPlayer = "O";
            }
            else if (CurrentPlayer == "O" && this.innerHTML == "") {
                this.innerHTML = "O";
                updateMsg("Player X's turn!");
                checkResult(CurrentPlayer);
                CurrentPlayer = "X";
            }
            else if (this.innerHTML != "") {
                this.style.backgroundColor('red');
            }
        });
    };
}

function checkResult(player) {
    if (Result()) {
        popsup.style.visibility = "visible";
        document.getElementById("pm").innerHTML = "Game Over<br\>Player " + player + " Wins!!!";
        updateMsg("Player " + player + " Wins!!!");
    };
}


// check if player won.
function Result() {
    var win = false;
    
    // check all rows
    for(var i = 0; i < gridCount; i += 3) {
        if (!isEmpty(getGV(i), getGV(i+1), getGV(i+2)) && isSame(getGV(i), getGV(i+1), getGV(i+2))) {
            win = true;
        }
    }
    // check all columns
    for(var i = 0; i < 3; i ++) {
         if (!isEmpty(getGV(i), getGV(i+3), getGV(i+6)) && isSame(getGV(i), getGV(i+3), getGV(i+6))) {
            win = true;
        }
    }
    // check all diagonal
    if (!isEmpty(getGV(0), getGV(4), getGV(8)) && isSame(getGV(0), getGV(4), getGV(8))) {
            win = true;
        }
    if (!isEmpty(getGV(2), getGV(4), getGV(6)) && isSame(getGV(2), getGV(4), getGV(6))) {
            win = true;
        }
    
    return win;
}

function isEmpty(c1, c2, c3) {
    return (c1 == "" && c2 == "" && c3 == "");
}

function isSame(c1, c2, c3) {
    return (c1 == c2 && c2 == c3);
}

function getGV(index) {
    return gameGrid[index].innerHTML;
}

function clearGameBoard() {
    for (var i = 0; i < gridCount; i++) {
        gameGrid[i].innerHTML = "";
        updateMsg("New Game Established!");
    };
    popsup.style.visibility = "hidden";
    pauseContinuesBtn.innerHTML = "Pause Game";
}

function pauseGame() {
    if(popsup.style.visibility == "hidden"){
    popsup.style.visibility = "visible";
    document.getElementById("pm").innerHTML = "Game Paused!!!";
    updateMsg("Game paused!!!");
    pauseContinuesBtn.innerHTML = "Continue Play";
    }else if(popsup.style.visibility == "visible"){
        popsup.style.visibility = "hidden";
        updateMsg("Player "+CurrentPlayer+"'s turn!");
        pauseContinuesBtn.innerHTML = "Pause Game";
    }
}

function updateMsg(msg) {
    var msgBox = document.getElementById("messages");
    msgBox.innerHTML = "<p>System:\r" + msg + "</p>";
}