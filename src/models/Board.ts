import type { CellState, Ship, Coordinate } from "../types";

class Board {
  private grid: CellState[][];
  private ships: Ship[];

  constructor() {
    this.grid = this.createGrid();
    this.ships = [];
  }

  private createGrid(): CellState[][] {
    return Array.from({ length: 10 }, () => Array(10).fill("empty"));
  }

  public placeShips(): boolean {

    const battleship = {
      name: "Battleship",
      size: 5,
      positions: [],
      hits: 0,
      isSunk: false,
    };

    if (!this.attemptShipPlacement(battleship)) {
      return false;
    }

    for (let i = 0; i < 2; i++) {
      const destroyer = {
        name: `Destroyer ${i + 1}`,
        size: 4,
        positions: [],
        hits: 0,
        isSunk: false,
      };
      if (!this.attemptShipPlacement(destroyer)) {
        return false;
      }
    }

    return true;
  }

  private attemptShipPlacement(ship: Ship): boolean {
    // Try up to 100 times to place the ship without overlapping
    for (let attempt = 0; attempt < 100; attempt++) {
      const isHorizontal = Math.random() < 0.5;
      const x = Math.floor(
        Math.random() * (isHorizontal ? 10 - ship.size + 1 : 10)
      );
      const y = Math.floor(
        Math.random() * (isHorizontal ? 10 : 10 - ship.size + 1)
      );

      if (this.canPlaceShip(x, y, ship.size, isHorizontal)) {
        const positions: Coordinate[] = [];

        for (let i = 0; i < ship.size; i++) {
          const pos: Coordinate = {
            x: isHorizontal ? x + i : x,
            y: isHorizontal ? y : y + i,
          };
          positions.push(pos);
          this.grid[pos.y][pos.x] = "ship";
        }
        ship.positions = positions;
        this.ships.push(ship);
        return true;
      }
    }
    return false;
  }

  private canPlaceShip(
    x: number,
    y: number,
    size: number,
    isHorizontal: boolean
  ): boolean {
    // Check if ship would overlap with already placed ships
    for (let i = 0; i < size; i++) {
      const checkX = isHorizontal ? x + i : x;
      const checkY = isHorizontal ? y : y + i;

      if (this.grid[checkY][checkX] !== "empty") {
        return false;
      }
    }
    return true;
  }

  public checkHit(coordinate: string): string | null {
    const [col, row] = this.parseCoordinate(coordinate);
    if (!this.isValidCoordinate(col, row)) {
      return null;
    }

    const shipAtPosition = this.ships.find((ship) =>
      ship.positions.some((pos) => pos.x === col && pos.y === row)
    );

    if (shipAtPosition) {
      shipAtPosition.hits++;
      this.grid[row][col] =
        shipAtPosition.hits === shipAtPosition.size ? "sunk" : "hit";
      return shipAtPosition.name;
    }

    this.grid[row][col] = "miss";
    return null;
  }

  public isShipSunk(shipName: string): boolean {
    const ship = this.ships.find((s) => s.name === shipName);
    if (ship && ship.hits === ship.size) {
      ship.isSunk = true;
      ship.positions.forEach((pos) => {
        this.grid[pos.y][pos.x] = "sunk";
      });
      return true;
    }
    return false;
  }

  public getTotalShips(): number {
    return this.ships.length;
  }

  public getCells(): CellState[][] {
    return this.grid.map((row) => [...row]);
  }

  private parseCoordinate(coordinate: string): [number, number] {
    const col = coordinate.charAt(0).toUpperCase().charCodeAt(0) - 65;
    const row = parseInt(coordinate.slice(1)) - 1;
    return [col, row];
  }

  private isValidCoordinate(col: number, row: number): boolean {
    return col >= 0 && col < 10 && row >= 0 && row < 10;
  }
}

export default Board;
