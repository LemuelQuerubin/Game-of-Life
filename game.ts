const rows = 100; // Number of rows in the grid
const cols = 100; // Number of columns in the grid

const initialCells = []; // Set initial state by turning on specific cells
const gridSize = 100; // the size of the grid is 100x100
const numberOfCoordinates = 1000; // Number of random cell coordinates to generate

class main {
  // grid 
  private grid: boolean[][];

  // Initializes the grid variable as a new 2d array with rows and cols.
  constructor(rows: number, cols: number) {
    this.grid = Array.from({ length: rows }, () => new Array(cols).fill(false));
  }

  // State of a specific cell
  cellState(row: number, col: number, alive: boolean): void {
    this.grid[row][col] = alive;
  }


  //Opdate the grid for next generation
  updateGrid(): void {
    const newGrid: boolean[][] = [];

    for (let i = 0; i < this.grid.length; i++) {
      newGrid[i] = [];
      for (let j = 0; j < this.grid[i].length; j++) {
        const aliveNeighbors = this.checkNeighbors(i, j);
        const isAlive = this.grid[i][j];
        
        // ---------------------------CONDITIONS---------------------------
        if (isAlive) {
          // any live cell with fewer than 2 live neighbors dies, by underpopulation 
          // any live cell with more than three live neighbors dies, by overpopulation
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {      
            newGrid[i][j] = false;
          } else {
            // any live cell with two or three live neighbors lives, to the next generation
            newGrid[i][j] = true;
          }
        } else {

          // any dead cell with exactly 3 live neighbors becomes a live cell, buy reproduction
          if (aliveNeighbors === 3) {  
            newGrid[i][j] = true;
          } else {
            newGrid[i][j] = false;
          }
        }
      }
    }

    // Update the grid
    this.grid = newGrid;
  }


  // Count the number of alive neighbors for a given cell
  checkNeighbors(row: number, col: number): number {
    let count = 0;
    // check neigbor of the cell
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i >= 0 && i < this.grid.length && j >= 0 && j < this.grid[i].length && !(i === row && j === col)) {
          if (this.grid[i][j]) {
            count++; // Increment the count if the neighboring cell is alive
          }
        }
      }
    }
    // Return the count of alive neighbors
    return count;
  }


  // Print the grid 
  printGrid(): void { 
    for (let i = 0; i < this.grid.length; i++) {
      let row = "";
      for (let j = 0; j < this.grid[i].length; j++) {
        // Use 'X' to represent alive cells and '-' to represent dead cells
        row += this.grid[i][j] ? "X" : "-";
      }
      console.log(row);
    }
  }


  // Check if the game has a living cell
  gameOver(): boolean {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length;j ++) {
        if (this.grid[i][j]) {
          return false; // Found a live cell, game is not over
        }
      }
    }

    return true; // No live cells found, game is over
  }
}


// Function to run the game for a certain number of generations with intervals
function startGame(interval: number): void {
  const intervalId = setInterval(() => {
    if (game.gameOver()) {
      clearInterval(intervalId); // Stop the interval if the game is over
      return;
    }
    console.clear(); // Clear the console
    game.updateGrid();
    game.printGrid();
  }, interval);
}


const game = new main(rows, cols); // Create a new instance of the GameOfLife class

// Creating random active cells in the grid
while (initialCells.length < numberOfCoordinates) {
  const x = Math.floor(Math.random() * gridSize);
  const y = Math.floor(Math.random() * gridSize);
  const coordinate = [x, y];

  if (!initialCells.some(([cx, cy]) => cx === x && cy === y)) {
    initialCells.push(coordinate);
    game.cellState(x, y, true);
  }
}


// Run the game with a 1-second interval
startGame(1000);