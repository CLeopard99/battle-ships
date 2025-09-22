import Board from "./Board";
import type { MoveResult } from "../types";

class Game {
  private board: Board;
  private hits: Set<string>;
  private misses: Set<string>;
  private sunkShips: Set<string>;

  constructor() {
    this.board = new Board();
    this.hits = new Set();
    this.misses = new Set();
    this.sunkShips = new Set();
  }

  public initialise(): void {
    this.board.placeShips();
  }

  public getBoard(): Board {
    return this.board;
  }

  public makeMove(coordinate: string): MoveResult {
    if (this.hits.has(coordinate) || this.misses.has(coordinate)) {
      return {
        isHit: false,
        isGameOver: false,
        message: "Already targeted this coordinate.",
      };
    }

    const result = this.board.checkHit(coordinate);
    if (result) {
      this.hits.add(coordinate);
      if (this.board.isShipSunk(result)) {
        this.sunkShips.add(result);
        const isGameOver = this.sunkShips.size === this.board.getTotalShips();
        return {
          isHit: true,
          isGameOver,
          message: isGameOver
            ? "Game Over, You sunk all ships!"
            : `You sunk a ${result}!`,
        };
      }
      return {
        isHit: true,
        isGameOver: false,
        message: "Hit!",
      };
    }
    this.misses.add(coordinate);
    return {
      isHit: false,
      isGameOver: false,
      message: "Miss!",
    };
  }

  public getHits(): Set<string> {
    return this.hits;
  }

  public getMisses(): Set<string> {
    return this.misses;
  }

  public getSunkShips(): Set<string> {
    return this.sunkShips;
  }
}

export default Game;
