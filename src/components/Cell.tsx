import type { CellState } from "../types";

interface CellProps {
  status: CellState;
  onClick: () => void;
}

const Cell = ({ status, onClick }: CellProps) => {
  const isDisabled = status === "hit" || status === "miss" || status === "sunk";

  const getCellContent = () => {
    switch (status) {
      case "hit":
        return "💥";
      case "miss":
        return "X";
      case "sunk":
        return "☠️";
      default:
        return "";
    }
  };

  const getStatusClasses = () => {
    switch (status) {
      case "hit":
        return "bg-red-300";
      case "miss":
        return "bg-blue-300";
      case "sunk":
        return "bg-black";
      default:
        return "bg-white hover:bg-gray-300";
    }
  };

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center cursor-pointer ${getStatusClasses()}
        ${isDisabled ? "cursor-default" : ""}
      `}
      onClick={!isDisabled ? onClick : undefined}
    >
      {getCellContent()}
    </div>
  );
};

export default Cell;
