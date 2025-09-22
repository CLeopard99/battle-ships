export type CellState = "empty" | "ship" | "hit" | "miss" | "sunk";

export interface Coordinate {
  x: number;
  y: number;
}

export interface Ship {
  name: string;
  size: number;
  positions: Coordinate[];
  hits: number;
  isSunk: boolean;
}

export interface MoveResult {
  isHit: boolean;
  isGameOver: boolean;
  message: string;
}

export interface Board {
  grid: CellState[][];
  ships: Ship[];
  placeShip(ship: Ship, coordinates: Coordinate[]): boolean;
  makeMove(coordinate: Coordinate): MoveResult;
  getCells(): CellState[][];
}

export interface Game {
  board: Board;
  isGameOver: boolean;
  makeMove(target: string): MoveResult;
  initialise(): void;
}
