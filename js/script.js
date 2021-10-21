const difficultyLevels = document.getElementById("difficulty-levels");
const playBtn = document.getElementById("play-btn");
const gridContainer = document.getElementById("grid-container");
let maxClick;
let j = [];
let counter;

console.log(difficultyLevels, playBtn);

playBtn.addEventListener("click", function () {
    //resetto il contenuto eventualmente già esistente all'interno della griglia
    gridContainer.innerHTML = "";

    //percepisco il livello scelto dall'utente
    const choosenLevel = difficultyLevels.value;
    console.log("Livello scelto: " + choosenLevel);

    //tramite la function getCellsNum ottengo il numero di celle che deve contenere la griglia di gioco
    cellsNum = getCellsNum(choosenLevel);
    console.log("Numero celle nella griglia: " + cellsNum);

    //calcolo il numero massimo di click che può compiere l'utente
    maxClick = cellsNum - 16;
    console.log("Numero massimo di click: " + maxClick);


    //creo la lista di bombe
    let bombList = createBombList(cellsNum);

    //creo la griglia formata da celle quadrate ed avente numero righe = numero colonne --> uso la function createGrid.
    createGrid(cellsNum, bombList);

})














/*****************************************************/
/* FUNCTIONS */
/*****************************************************/


/**
 * Associa ad ogni livello di difficoltà la rispettiva griglia col numero esatto di caselle 
 * 
 * @param {number} choosenLevel - indica il livello di difficoltà scelto dall'utente 
 * @returns {number} - restituisce il numero di celle relativo al livello di difficoltà
 */
function getCellsNum(choosenLevel) {
    let cellsNum;
    switch (parseInt(choosenLevel)) {
        case 1:
            cellsNum = 100;
            break;
        case 2:
            cellsNum = 81;
            break;
        case 3:
            cellsNum = 49;
            break;
    }
    j = [];
    return cellsNum;
}

/**
 * Restituisce la griglia con le caselle clickabili 
 * 
 * @param {number} cellsNum - numero di celle che deve contenere in totale la griglia 
 * @returns 
 */
function createGrid(cellsNum, bombList) {
    let cellsPerRow = cellsNum / Math.sqrt(cellsNum);
    let cell;



    for (let i = 1; i <= cellsNum; i++) {
        cell = document.createElement("a");
        cell.href = "#"
        cell.style.width = (100 / cellsPerRow) + "%";
        cell.style.height = (100 / cellsPerRow) + "%";
        cell.classList.add("border", "border-dark", "d-flex", "justify-content-center", "align-items-center", "text-decoration-none", "text-dark", "hover", "cell");
        cell.textContent = i;
        gridContainer.append(cell);

        cell.addEventListener("click", function () {
            focusClick.call(this, bombList);
        });
    }
    return cell;
}


/**
 * Cambia gli stili della cella una volta clickata
 */
function focusClick(bombList, cell) {
    //console.log(bombList);
    this.classList.toggle("focus");
    this.classList.toggle("text-dark");
    this.classList.toggle("hover");

    let currentNumber = (parseInt(this.textContent));
    let clickNum;
    let gameOver = false;

    if (bombList.includes(currentNumber)) {
        this.classList.add("bg-danger");
        gameOver = true;
    }

    clickNum = parseInt(counterClick(j, counter, gameOver, bombList)) - 1;
    
    if (gameOver) {
        const overlay = document.createElement("div");
        gridContainer.append(overlay);
        overlay.classList.add("overlay");
        overlay.innerHTML = `<h2>Hai perso!</h2>
        <h4>Il tuo punteggio è: ${clickNum}</h4>
        <h4>Per giocare di nuovo ricarica la pagina o premi nuovamente Play!</h4>`
        console.log("game over:" + bombList);

        showBombs(bombList);
    }

}

/**
 * Returns a random number between minValue and maxValue
 * @param {number} minValue rappresenta il limite inferiore (incluso) dell'intervallo entro cui voglio generare il numero random
 * @param {number} maxValue rappresenta il limite superiore (incluso) dell'intervallo entro cui voglio generare il numero random
 */
function randomNumber(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}


/**
 * 
 * Restituisce un array contente i numeri delle bombe
 * 
 * @param {number} cellsNum - numero di celle che deve contenere in totale la griglia 
 * @returns 
 */
function createBombList(cellsNum) {
    let bombList = [];
    while (bombList.length < 16) {
        let currentBomb = randomNumber(1, cellsNum);

        let thereIsBomb = bombList.includes(currentBomb);

        if (!thereIsBomb) {
            bombList.push(currentBomb);
        }
    }

    console.log(bombList.sort((a, b) => a - b));

    return bombList;


}


/**
 * Restituisce il numero di click effettuati, se questi non sono stati su bombe e raggiungono il numero di click max allora appare messaggio di vittoria
 * 
 * @param {Array} j - array la cui lunghezza (counter) mi permette di definire i numeri di click effettuati
 * @param {number} counter - lunghezza dell'array j, definisce il numero di click
 * @param {boolean} gameOver - booleano che definisce se ho clickato una bomba
 */
function counterClick(j, counter, gameOver, bombList) {
    j.push(0);
    console.log(j);
    counter = j.length;
    console.log(counter);

    if (counter === maxClick && gameOver === false) {
        const overlay = document.createElement("div");
        gridContainer.append(overlay);
        overlay.classList.add("overlay-winner");
        overlay.innerHTML = `<h2>Hai vinto!</h2>
        <h4>Per giocare di nuovo ricarica la pagina o premi nuovamente Play!</h4>`

        showBombs(bombList);
    }

    return counter;
    
}


function showBombs(bombList) {
    const cellsList = gridContainer.querySelectorAll(".cell");

    for (let i = 0; i < bombList.length; i++) {
        const bomb = bombList[i];
        
        cellsList[bomb - 1].classList.add("bg-danger");
    }
}