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
