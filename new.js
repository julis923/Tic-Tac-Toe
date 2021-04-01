let A1 = document.getElementById('A1')
let A2 = document.getElementById('A2')
let A3 = document.getElementById('A3')
let B1 = document.getElementById('B1')
let B2 = document.getElementById('B2')
let B3 = document.getElementById('B3')
let C1 = document.getElementById('C1')
let C2 = document.getElementById('C2')
let C3 = document.getElementById('C3')
let compScore = document.getElementById('compScore')
let userScore = document.getElementById('userScore')

let endBlock = document.getElementById('game-end')
let result = document.getElementById('results')

let set = []
let finalSet = []
let possibilities = []
let firstMove = true;
let userTurn = true;
let computerTurn = false;
let computerWins = false;
let userWins = false;
let tieGame = false;
let compWins = 0
let youWin = 0


let rows = {
    rowA: [null, null, null],
    rowB: [null, null, null],
    rowC: [null, null, null],
    row1: [null, null, null],
    row2: [null, null, null],
    row3: [null, null, null],
    diag1: [null, null, null],
    diag2: [null, null, null]
}

function checkWinner(player) {
    if (player === 'user' && userTurn) {
        for (let key in rows) {
            for (let z = 0; z < rows[key].length; z++) {
                if (rows[key][z] === "blue" && rows[key][z] === rows[key][z + 1] && rows[key][z] === rows[key][z + 2]) {
                    console.log('user wins')
                    userWins = true;
                    computerTurn = false;
                    userTurn = false;
                    result.innerHTML = 'You Win!'
                    endBlock.style.display = 'block'
                    youWin++
                    userScore.innerHTML = 'User: ' + youWin
                    userScore.style.fontSize = '30px'
                    userScore.style.fontWeight = 'bold'
                }
            } 
        }
    } else if (player === 'computer' && computerTurn) {
        for (let key2 in rows) {
            for (let x = 0; x < rows[key2].length; x++) {
                if (rows[key2][x] === "red" && rows[key2][x] === rows[key2][x + 1] && rows[key2][x] === rows[key2][x + 2]) {
                    console.log('comp wins')
                    computerWins = true;
                    userTurn = false;
                    endBlock.style.display = 'block'
                    result.innerHTML = 'Computer Wins!'
                    compWins++
                    compScore.innerHTML = 'Computer: ' + compWins
                    compScore.style.fontSize = '30px'
                    compScore.style.fontWeight = 'bold'
                } 
            }
        } 
    }
}


function updateRows(sq) {
    if (sq === A1) {
        rows.rowA[0] = 'red'
        rows.row1[0] = 'red'
        rows.diag1[0] = 'red'
    } else if (sq === A2) {
        rows.rowA[1] = 'red'
        rows.row2[0] = 'red'
    } else if (sq === A3) {
        rows.rowA[2] = 'red'
        rows.row3[0] ='red'
        rows.diag2[2] = 'red'
    } else if (sq === B1) {
        rows.rowB[0] = 'red'
        rows.row1[1] = 'red'
    } else if (sq === B2) {
        rows.rowB[1] = 'red'
        rows.row2[1] = 'red'
        rows.diag1[1] = 'red'
        rows.diag2[1] = 'red'
    } else if (sq === B3) {
        rows.rowB[2] = 'red'
        rows.row3[1] = 'red'
    } else if (sq === C1) {
        rows.rowC[0] = 'red'
        rows.row1[2] = 'red'
        rows.diag2[0] = 'red'
    } else if (sq === C2) {
        rows.rowC[1] = 'red'
        rows.row2[2] = 'red'
    } else if (sq === C3) {
        rows.rowC[2] = 'red'
        rows.row3[2] = 'red'
        rows.diag1[2] = 'red'
    }
}


function chooseSquare(array) {
    array = array.filter(x => x.style.backgroundColor != 'red' && x.style.backgroundColor != 'blue')
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    if (array[0]) {
        updateRows(array[0])
        setTimeout(function() { 
            array[0].style.backgroundColor = 'red' 
            checkWinner('computer')
            if (!computerWins) {
            userTurn = true; 
            }  
        }, 800)  
    } else {
        tieGame = true
        result.innerHTML = 'Tie Game!'
        endBlock.style.display = 'block'
    }
}

function determineSquare(set) {
    for (let i = 0; i < set.length; i++) {
        let sq = set[i]

        if (sq === 'rowA0' || sq === 'row10' || sq === 'diag10') {
            if (!possibilities.includes(A1)) {
                possibilities.push(A1);
            }
        } else if (sq === 'rowA1' || sq === 'row20') {
            if (!possibilities.includes(A2)) {
                possibilities.push(A2);
            }
        } else if (sq === 'rowA2' || sq === 'row30' || sq === 'diag22') {
            if (!possibilities.includes(A3)) {
                possibilities.push(A3);
            }
        } else if (sq === 'rowB0' || sq === 'row11') {
            if (!possibilities.includes(B1)) {
                possibilities.push(B1);
            }
        } else if (sq === 'rowB1' || sq === 'row21' || sq === 'diag11' || sq === 'diag21' ) {
            if (!possibilities.includes(B2)) {
                possibilities.push(B2);
            };
        } else if (sq === 'rowB2' || sq === 'row31') {
            if (!possibilities.includes(B3)) {
                possibilities.push(B3);
            }
        } else if (sq === 'rowC0' || sq === 'row12' || sq === 'diag20') {
            if (!possibilities.includes(C1)) {
                possibilities.push(C1);
            }
        } else if (sq === 'rowC1' || sq === 'row22') {
            if (!possibilities.includes(C2)) {
                 possibilities.push(C2);
            }
        } else if (sq === 'rowC2' || sq === 'row32' || sq === 'diag12') {
            if (!possibilities.includes(C3)) {
                possibilities.push(C3)
            }
        };
    }
    chooseSquare(possibilities)
}

function singleRedSquare() {
    set = []
    finalSet = []
    possibilities = []
    for (let key in rows) {
        for (let i = 0; i < rows[key].length; i++) {
            if (rows[key][i] === 'red') {
                set.push(key + rows[key].indexOf(null))
            }
        }
    }
    finalSet = [...new Set(set)]
    if (finalSet[0]) {
        determineSquare(finalSet)
    } 
}
  
function computerPlay() {
    if (computerTurn) {
        set = []
        finalSet = []
        possibilities = []
        if (firstMove) {
            if (!rows.rowB[1]) {
                set.push('rowB1')
                finalSet = [...new Set(set)]
                if (finalSet[0]) {
                    determineSquare(finalSet)
                    firstMove = false;
                } 
            } else {
                set.push('rowA0')
                set.push('rowA2')
                set.push('rowC0')
                set.push('rowC2')
                finalSet = [...new Set(set)]
                if (finalSet[0]) {
                    determineSquare(finalSet)
                    firstMove = false;
                }
            }
        } else { //no longer on first move
            for (let key in rows) {
                for (let i = 0; i < rows[key].length; i++) {
                    if (rows[key][i]) {
                        if (rows[key][i] === rows[key][i + 1] || rows[key][i] === rows[key][i + 2] && rows.rowB[1]) {
                            if (rows[key].indexOf(null) >= 0) {
                                set.push(key + rows[key].indexOf(null))
                            }
                        }
                    }
                }
            }
            finalSet = [...new Set(set)]
            if (finalSet[0]) {
                determineSquare(finalSet)
            } else {
                singleRedSquare()
            }
        }
    }
};



A1.onclick = function() {
    if (!rows.rowA[0] && userTurn) {
        A1.style.backgroundColor = 'blue'
        rows.rowA[0] = 'blue'
        rows.row1[0] = 'blue'
        rows.diag1[0] = 'blue'
        checkWinner('user')
        if (!userWins) {
            userTurn = false
            computerTurn = true;
            computerPlay()
        }
    }
}

A2.onclick = function() {
    if (!rows.rowA[1] && userTurn) {
        A2.style.backgroundColor = 'blue'
        rows.rowA[1] = 'blue'
        rows.row2[0] = 'blue'
        checkWinner('user')
        if (!userWins) {
            userTurn = false
            computerTurn = true;
            computerPlay()
        }
    }
}

A3.onclick = function() {
    if (!rows.rowA[2] && userTurn) {
        A3.style.backgroundColor = 'blue'
        rows.rowA[2] = 'blue'
        rows.row3[0] ='blue'
        rows.diag2[2] = 'blue'
        checkWinner('user')
        if (!userWins) {
            userTurn = false
            computerTurn = true;
            computerPlay()
        }
    }
}

B1.onclick = function() {
    if (!rows.rowB[0] && userTurn) {
        B1.style.backgroundColor = 'blue'
        rows.rowB[0] = 'blue'
        rows.row1[1] = 'blue'
        checkWinner('user')
        if (!userWins) {
            userTurn = false
            computerTurn = true;
            computerPlay()
        }
    }
}

B2.onclick = function() {
    if (!rows.rowB[1] && userTurn) {
        B2.style.backgroundColor = 'blue'
        rows.rowB[1] = 'blue'
        rows.row2[1] = 'blue'
        rows.diag1[1] = 'blue'
        rows.diag2[1] = 'blue'
        checkWinner('user')
        if (!userWins) {
            userTurn = false
            computerTurn = true;
            computerPlay()
        }
    }
}

B3.onclick = function() {
    if (!rows.rowB[2] && userTurn) {
        B3.style.backgroundColor = 'blue'
        rows.rowB[2] = 'blue'
        rows.row3[1] = 'blue'
        checkWinner('user')
        if (!userWins) {
            userTurn = false
            computerTurn = true;
            computerPlay()
        }
    }
}

C1.onclick = function() {
    if (!rows.rowC[0] && userTurn) {
        C1.style.backgroundColor = 'blue'
        rows.rowC[0] = 'blue'
        rows.row1[2] = 'blue'
        rows.diag2[0] = 'blue'
        checkWinner('user')
        if (!userWins) {
            userTurn = false
            computerTurn = true;
            computerPlay()
        }
    }
}

C2.onclick = function() {
    if (!rows.rowC[1] && userTurn) {
        C2.style.backgroundColor = 'blue'
        rows.rowC[1] = 'blue'
        rows.row2[2] = 'blue'
        checkWinner('user')
        if (!userWins) {
            userTurn = false
            computerTurn = true;
            computerPlay()
        }
    }
}

C3.onclick = function() {
    if (!rows.rowC[2] && userTurn) {
        C3.style.backgroundColor = 'blue'
        rows.rowC[2] = 'blue'
        rows.row3[2] = 'blue'
        rows.diag1[2] = 'blue'
        checkWinner('user')
        if (!userWins) {
            userTurn = false
            computerTurn = true;
            computerPlay()
        }
    }
}

button.onclick = function() {
    endBlock.style.display = 'none'
    set = []
    finalSet = []
    possibilities = []
    firstMove = true;
    userTurn = true;
    computerTurn = false;
    computerWins = false;
    userWins = false;
    tieGame = true;
    rows = {
        rowA: [null, null, null],
        rowB: [null, null, null],
        rowC: [null, null, null],
        row1: [null, null, null],
        row2: [null, null, null],
        row3: [null, null, null],
        diag1: [null, null, null],
        diag2: [null, null, null]
    }
    A1.style.backgroundColor = 'white'
    A2.style.backgroundColor = 'white'
    A3.style.backgroundColor = 'white'
    B1.style.backgroundColor = 'white'
    B2.style.backgroundColor = 'white'
    B3.style.backgroundColor = 'white'
    C1.style.backgroundColor = 'white'
    C2.style.backgroundColor = 'white'
    C3.style.backgroundColor = 'white'
}


