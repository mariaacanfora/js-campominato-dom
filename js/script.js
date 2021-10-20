const difficultyLevels = document.getElementById("difficulty-levels");
const playBtn = document.getElementById("play-btn");
const gridContainer = document.getElementById("grid-container");

console.log(difficultyLevels, playBtn);

playBtn.addEventListener("click", function(){
    //resetto il contenuto eventualmente già esistente all'interno della griglia
    gridContainer.innerHTML = "";

    //percepisco il livello scelto dall'utente
    const choosenLevel = difficultyLevels.value;
    console.log(choosenLevel);

    //tramite la function getCellsNum ottengo il numero di celle che deve contenere la griglia di gioco
    cellsNum = getCellsNum(choosenLevel);
    console.log(cellsNum);
    
    
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
function getCellsNum(choosenLevel){
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
    return cellsNum;
}

/**
 * Restituisce la griglia con le caselle clickabili 
 * 
 * @param {number} cellsNum - numero di celle che deve contenere in totale la griglia 
 * @returns 
 */
function createGrid (cellsNum, bombList){
    let cellsPerRow = cellsNum / Math.sqrt(cellsNum);
    let cell;

    for (let i = 1; i <= cellsNum; i++) {
        cell = document.createElement("a");
        cell.href = "#"
        cell.style.width = (100 / cellsPerRow) + "%";
        cell.style.height = (100 / cellsPerRow) + "%";
        cell.classList.add("border", "border-dark", "d-flex", "justify-content-center", "align-items-center", "text-decoration-none", "text-dark", "hover");
        cell.textContent = i;
        gridContainer.append(cell);  

        cell.addEventListener("click", function(){
            focusClick.call(this, bombList);
        });
    }
    
       
    return cell;
}


/**
 * Cambia gli stili della cella una volta clickata
 */
function focusClick (bombList) { 
    //console.log(bombList);

    this.classList.toggle("focus");
    this.classList.toggle("text-dark");
    this.classList.toggle("hover");

    let currentNumber = (parseInt(this.textContent));

    let gameOver = false;
    if (bombList.includes(currentNumber)){
       this.classList.add("bg-danger");
       gameOver = true;
    }

    if (gameOver){
        const overlay = document.createElement("div");
        gridContainer.append(overlay);
        overlay.classList.add("overlay");
        overlay.innerHTML = `<h2>Hai perso!</h2>
        <h4>Per giocare di nuovo ricarica la pagina o premi nuovamente Play!</h4>`
    }


    //console.log(this.textContent);
    

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
function createBombList(cellsNum){
    let bombList = [];
    while (bombList.length<16){
        let currentBomb = randomNumber(1, cellsNum);
        
        let thereIsBomb = bombList.includes(currentBomb);

        if (!thereIsBomb){
            bombList.push(currentBomb);
        }
    }

    console.log(bombList.sort( (a, b) => a - b ) );

    return bombList;
}