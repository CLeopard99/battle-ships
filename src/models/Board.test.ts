import Board from "./Board";
import { describe, it, expect, beforeEach } from 'vitest'

describe("Board", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
  });

  describe("initialise game", () => {
    it("should create an empty 10x10 grid", () => {
      const cells = board.getCells();

      expect(cells.length).toBe(10);

      cells.forEach((row) => {
        expect(row.length).toBe(10);
        row.forEach((cell) => {
          expect(cell).toBe("empty");
        });
      });
    });

    it("should successfully place ships", () => {
      expect(board.placeShips()).toBe(true);

      const cells = board.getCells();

      let shipCells = 0;
      cells.forEach((row) => {
        row.forEach((cell) => {
          if (cell === "ship") shipCells++;
        });
      });
      // 1 battleship + 2 destroyers = 13 cells
      expect(shipCells).toBe(13);
    });

    it("should place correct number of ships", () => {
      board.placeShips();
      expect(board.getTotalShips()).toBe(3);
    });
  });

  describe("gameplay", () => {
    beforeEach(() => {
      board.placeShips();
    });

    it("should handle misses correctly", () => {
      // Find an empty cell
      const cells = board.getCells();
      let missCoordinate = "";
      outerLoop: for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (cells[i][j] === "empty") {
            missCoordinate = `${String.fromCharCode(65 + j)}${i + 1}`;
            break outerLoop;
          }
        }
      }

      const result = board.checkHit(missCoordinate);
      expect(result).toBeNull();
      const updatedCells = board.getCells();
      const [col, row] = [
        missCoordinate.charAt(0).toUpperCase().charCodeAt(0) - 65,
        parseInt(missCoordinate.slice(1)) - 1,
      ];
      expect(updatedCells[row][col]).toBe("miss");
    });

    it("should handle hits correctly", () => {
      // Find a ship cell
      const cells = board.getCells();
      let hitCoordinate = "";
      outerLoop: for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (cells[i][j] === "ship") {
            hitCoordinate = `${String.fromCharCode(65 + j)}${i + 1}`;
            break outerLoop;
          }
        }
      }

      const result = board.checkHit(hitCoordinate);
      expect(result).not.toBeNull(); // Should return ship name
      const updatedCells = board.getCells();
      const [col, row] = [
        hitCoordinate.charAt(0).toUpperCase().charCodeAt(0) - 65,
        parseInt(hitCoordinate.slice(1)) - 1,
      ];
      expect(updatedCells[row][col]).toBe("hit");
    });

    it("should detect when a ship is sunk", () => {
      const cells = board.getCells();

      // Find all cells of the first ship we encounter
      const shipCoordinates: string[] = [];
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (cells[i][j] === "ship") {
            shipCoordinates.push(`${String.fromCharCode(65 + j)}${i + 1}`);
          }
        }
      }

      let shipName: string | null = null;
      // Hit all cells of the ship
      shipCoordinates.forEach((coord) => {
        shipName = board.checkHit(coord) || shipName;
      });

      if (shipName) {
        expect(board.isShipSunk(shipName)).toBe(true);
      }
    });

    it("should handle invalid coordinates", () => {
      expect(board.checkHit("K1")).toBeNull();
      expect(board.checkHit("A11")).toBeNull(); 
      expect(board.checkHit("A0")).toBeNull();
      expect(board.checkHit("")).toBeNull();
    });
  });
});
