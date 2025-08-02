import React from "react";
import { GamePhase } from "../types/game";

interface SquareProps {
  index: number;
  isFlashing: boolean;
  isSelected: boolean;
  isCorrect: boolean;
  phase: GamePhase;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({
  index,
  isFlashing,
  isSelected,
  isCorrect,
  phase,
  onClick,
}) => {
  const getSquareClasses = () => {
    let classes =
      "w-14 h-14 rounded-lg transition-all duration-200 cursor-pointer border-2 flex items-center justify-center text-xs font-bold relative overflow-hidden";

    if (phase === "flashing") {
      if (isFlashing) {
        classes +=
          " bg-gradient-to-br from-cyan-400 to-blue-500 border-cyan-300 shadow-lg shadow-cyan-500/50 animate-pulse";
      } else {
        classes += " bg-gray-700 border-gray-600 hover:bg-gray-600";
      }
    } else if (phase === "selecting") {
      if (isSelected) {
        classes +=
          " bg-gradient-to-br from-purple-500 to-pink-500 border-purple-400 shadow-lg shadow-purple-500/50";
      } else {
        classes +=
          " bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500";
      }
    } else if (phase === "feedback") {
      if (isCorrect && isSelected) {
        // Correct selection
        classes +=
          " bg-gradient-to-br from-green-500 to-emerald-500 border-green-400 shadow-lg shadow-green-500/50";
      } else if (isCorrect && !isSelected) {
        // Missed correct square
        classes +=
          " bg-gradient-to-br from-yellow-500 to-orange-500 border-yellow-400 shadow-lg shadow-yellow-500/50";
      } else if (!isCorrect && isSelected) {
        // Wrong selection
        classes +=
          " bg-gradient-to-br from-red-500 to-rose-500 border-red-400 shadow-lg shadow-red-500/50";
      } else {
        classes += " bg-gray-700 border-gray-600";
      }
    } else {
      classes += " bg-gray-700 border-gray-600 hover:bg-gray-600";
    }

    if (phase === "selecting") {
      classes += " hover:scale-105 active:scale-95";
    }

    return classes;
  };

  const getSquareContent = () => {
    if (phase === "feedback") {
      if (isCorrect && isSelected) return "✓";
      if (isCorrect && !isSelected) return "?";
      if (!isCorrect && isSelected) return "✗";
    }
    return index + 1;
  };

  return (
    <div
      className={getSquareClasses()}
      onClick={phase === "selecting" ? onClick : undefined}
      style={{
        transform:
          phase === "selecting" && isSelected ? "scale(1.05)" : "scale(1)",
      }}
    >
      <span className="text-white relative z-10 ">{getSquareContent()}</span>

      {isFlashing && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-30 animate-ping rounded-lg" />
      )}
    </div>
  );
};

export default Square;
