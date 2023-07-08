declare const rows = 100;
declare const cols = 100;
declare const initialCells: any[];
declare const gridSize = 100;
declare const numberOfCoordinates = 1000;
declare class main {
    private grid;
    constructor(rows: number, cols: number);
    cellState(row: number, col: number, alive: boolean): void;
    updateGrid(): void;
    checkNeighbors(row: number, col: number): number;
    printGrid(): void;
    gameOver(): boolean;
}
declare function startGame(interval: number): void;
declare const game: main;
