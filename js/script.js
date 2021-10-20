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
    
    //creo la griglia formata da celle quadrate ed avente numero righe = numero colonne --> uso la function createGrid.
    createGrid(cellsNum);
    
    
})


/* FUNCTIONS */
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


function createGrid (cellsNum){
    let row = document.createElement("div");
    row.classList.add("row");
    gridContainer.append(row);
    let cellsPerRow = cellsNum / Math.sqrt(cellsNum);
    let cell;

    for (let i = 1; i <= cellsNum; i++) {
        cell = document.createElement("a");
        cell.href = "#"
        cell.style.width = (100 / cellsPerRow) + "%";
        cell.style.height = (100 / cellsPerRow) + "%";
        cell.classList.add("border", "border-dark", "d-flex", "justify-content-center", "align-items-center", "text-decoration-none", "text-dark", "hover");
        cell.textContent = i;
        row.append(cell);  

        cell.addEventListener("click", focusClick);
    }
    
    return cell;
}

function focusClick () { 

    this.classList.toggle("focus");
    this.classList.toggle("text-dark");
    this.classList.toggle("hover");


}