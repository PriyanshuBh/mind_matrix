import React from 'react';
import { Play, Send, ArrowRight, RotateCcw } from 'lucide-react';
import { GamePhase } from '../types/game';

interface GameControlsProps {
  phase: GamePhase;
  onStartFlashing: () => void;
  onSubmitAnswer: () => void;
  onNextLevel: () => void;
  onResetGame: () => void;
  hasSelection: boolean;
  isLastLevel: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  phase,
  onStartFlashing,
  onSubmitAnswer,
  onNextLevel,
  onResetGame,
  hasSelection,
  isLastLevel
}) => {
  const buttonClass = "w-full px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="dark:bg-white/10 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-2xl space-y-3 max-w-[368px] mx-auto">
      <h3 className="text-lg font-semibold dark:text-white  mb-4">Game Controls</h3>
      
      {phase === 'ready' && (
        <button
          onClick={onStartFlashing}
          className={`${buttonClass} bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white transform hover:scale-105 active:scale-95 cursor-pointer`}
        >
          <Play className="w-5 h-5" />
          <span>Start Pattern</span>
        </button>
      )}

      {phase === 'flashing' && (
        <div className={`${buttonClass} bg-gray-600 text-gray-300 cursor-not-allowed`}>
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Observing Pattern...</span>
        </div>
      )}

      {phase === 'selecting' && (
        <button
          onClick={onSubmitAnswer}
          disabled={!hasSelection}
          className={`${buttonClass} bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white transform hover:scale-105 active:scale-95 cursor-pointer`}
        >
          <Send className="w-5 h-5" />
          <span>Submit Answer</span>
        </button>
      )}

      {phase === 'feedback' && (
        <button
          onClick={isLastLevel ? onResetGame : onNextLevel}
          className={`${buttonClass} bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-105 active:scale-95 cursor-pointer`}
        >
          {isLastLevel ? (
            <>
              <RotateCcw className="w-5 h-5" />
              <span>Play Again</span>
            </>
          ) : (
            <>
              <ArrowRight className="w-5 h-5" />
              <span>Next Level</span>
            </>
          )}
        </button>
      )}

      {phase === 'completed' && (
        <button
          onClick={onResetGame}
          className={`${buttonClass} bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white transform hover:scale-105 active:scale-95 cursor-pointer`}
        >
          <RotateCcw className="w-5 h-5" />
          <span>Start Over</span>
        </button>
      )}

      <div className="pt-3 border-t dark:border-white/20 border-neutral-700">
        <button
          onClick={onResetGame}
          className="w-full px-4 pt-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default GameControls;