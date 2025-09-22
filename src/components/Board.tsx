import Cell from "./Cell";
import BoardModel from "../models/Board";
import type { CellState } from "../types";

interface BoardProps {
  board: BoardModel;
  onCellClick: (row: number, col: number) => void;
}

const Board = ({ board, onCellClick }: BoardProps) => {
  const COLUMN_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const GRID_SIZE = COLUMN_LABELS.length;

  return (
    <div className="grid grid-cols-[40px_1fr] grid-rows-[40px_1fr] gap-1 max-w-fit mx-auto">
      <div className="w-10 h-10"></div>
      <div className={`grid grid-cols-${GRID_SIZE} gap-0.5 ml-0.5`}>
        {COLUMN_LABELS.map((label) => (
          <div
            key={label}
            className="flex items-center justify-center font-bold text-blue-500 text-lg"
          >
            {label}
          </div>
        ))}
      </div>

      <div className={`grid grid-rows-${GRID_SIZE}`}>
        {Array.from(Array(GRID_SIZE).keys()).map((i) => (
          <div
            key={i}
            className="flex items-center justify-center font-bold text-blue-500 text-lg"
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div role="grid"
        className={`grid grid-cols-10 grid-rows-${GRID_SIZE} gap-0.5 bg-gray-300 rounded-b-md p-1`}
      >
        {board
          .getCells()
          .map((row: CellState[], rowIndex: number) =>
            row.map((cell: CellState, colIndex: number) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                status={cell}
                onClick={() => onCellClick(rowIndex, colIndex)}
              />
            ))
          )}
      </div>
    </div>
  );
};

export default Board;
