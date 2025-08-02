import React from 'react';
import Square from './Square';
import { GamePhase } from '../types/game';

interface GridProps {
  flashingSquares: Set<number>;
  userSelection: number[];
  correctSquares: number[];
  phase: GamePhase;
  onSquareClick: (index: number) => void;
}

const Grid: React.FC<GridProps> = ({
  flashingSquares,
  userSelection,
  correctSquares,
  phase,
  onSquareClick
}) => {
  return (
    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-neutral-200/50 dark:border-neutral-700/50">
      <div className="grid grid-cols-5 gap-2 w-80 h-80 mx-auto">
        {Array.from({ length: 25 }, (_, index) => (
          <Square
            key={index}
            index={index}
            isFlashing={flashingSquares.has(index)}
            isSelected={userSelection.includes(index)}
            isCorrect={correctSquares.includes(index)}
            phase={phase}
            onClick={() => onSquareClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;