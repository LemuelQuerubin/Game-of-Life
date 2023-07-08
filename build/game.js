const rows = 100;
const cols = 100;
const initialCells = [];
const gridSize = 100;
const numberOfCoordinates = 1000;
class main {
    constructor(rows, cols) {
        this.grid = Array.from({ length: rows }, () => new Array(cols).fill(false));
    }
    cellState(row, col, alive) {
        this.grid[row][col] = alive;
    }
    updateGrid() {
        const newGrid = [];
        for (let i = 0; i < this.grid.length; i++) {
            newGrid[i] = [];
            for (let j = 0; j < this.grid[i].length; j++) {
                const aliveNeighbors = this.checkNeighbors(i, j);
                const isAlive = this.grid[i][j];
                if (isAlive) {
                    if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                        newGrid[i][j] = false;
                    }
                    else {
                        newGrid[i][j] = true;
                    }
                }
                else {
                    if (aliveNeighbors === 3) {
                        newGrid[i][j] = true;
                    }
                    else {
                        newGrid[i][j] = false;
                    }
                }
            }
        }
        this.grid = newGrid;
    }
    checkNeighbors(row, col) {
        let count = 0;
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i >= 0 && i < this.grid.length && j >= 0 && j < this.grid[i].length && !(i === row && j === col)) {
                    if (this.grid[i][j]) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
    printGrid() {
        for (let i = 0; i < this.grid.length; i++) {
            let row = "";
            for (let j = 0; j < this.grid[i].length; j++) {
                row += this.grid[i][j] ? "X" : "-";
            }
            console.log(row);
        }
    }
    gameOver() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
}
function startGame(interval) {
    const intervalId = setInterval(() => {
        if (game.gameOver()) {
            clearInterval(intervalId);
            return;
        }
        console.clear();
        game.updateGrid();
        game.printGrid();
    }, interval);
}
const game = new main(rows, cols);
while (initialCells.length < numberOfCoordinates) {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    const coordinate = [x, y];
    if (!initialCells.some(([cx, cy]) => cx === x && cy === y)) {
        initialCells.push(coordinate);
        game.cellState(x, y, true);
    }
}
startGame(1000);
//# sourceMappingURL=game.js.map