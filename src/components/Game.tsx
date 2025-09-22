import React, { useEffect, useState } from "react";
import Board from "./Board";
import InputForm from "./InputForm";
import GameModel from "../models/Game";
import type { MoveResult } from "../types";

const Game: React.FC = () => {
  const [game, setGame] = useState<GameModel | null>(null);
  const [message, setMessage] = useState<string>("");
  const [totalShots, setTotalShots] = useState(0);
  const [hits, setHits] = useState(0);

  const startNewGame = () => {
    const newGame = new GameModel();
    newGame.initialise();
    setGame(newGame);
    setMessage("Enter coordinates (e.g., A5) to fire");
    setTotalShots(0);
    setHits(0);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleCellClick = (row: number, col: number) => {
    const col_letter = String.fromCharCode(65 + col);
    const target = `${col_letter}${row + 1}`;
    handleMove(target);
  };

  const handleMove = (target: string) => {
    if (game) {
      const result: MoveResult = game.makeMove(target);
      // Only update shots and hits if the move was valid
      if (!result.message.includes("Already targeted")) {
        setTotalShots((prev) => prev + 1);
        if (result.isHit) setHits((prev) => prev + 1);
      }

      setMessage(result.message);
      if (result.isGameOver) {
        setMessage("Game Over!");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5 text-center">
      <div className="mb-2">
        <h1 className="text-4xl font-bold mb-4">Battleships</h1>
        <button
          className="mb-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg border-1 border-black
                     hover:bg-blue-800 hover:border-white"
          onClick={startNewGame}
        >
          New Game
        </button>
        <div className="text-lg text-white">
          <p>
            Total shots: {totalShots} | Hits: {hits} | Accuracy:{" "}
            {totalShots > 0 ? ((hits / totalShots) * 100).toFixed(1) : "0"}%
          </p>
        </div>
      </div>
      {game && <Board board={game.getBoard()} onCellClick={handleCellClick} />}
      <InputForm onSubmit={handleMove} />
      <div className="mt-4 text-lg font-medium text-gray-200">{message}</div>
    </div>
  );
};

export default Game;
