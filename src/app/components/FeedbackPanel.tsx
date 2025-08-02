import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { GameState, Level } from '../types/game';

interface FeedbackPanelProps {
  gameState: GameState;
  levelConfig?: Level;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  gameState,
  levelConfig
}) => {
  if (!gameState.showFeedback) {
    return (
      <div className="dark:bg-white/10 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-2xl max-w-[368px] mx-auto">
        <div className="text-center dark:text-gray-400 text-gray-500">
          <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className='font-bold '>Analysis Pending</p>
          <p>Complete the level to see feedback</p>
        </div>
      </div>
    );
  }

  const correct = gameState.userSelection.filter(square => 
    gameState.correctSquares.includes(square)
  );
  const incorrect = gameState.userSelection.filter(square => 
    !gameState.correctSquares.includes(square)
  );
  const missed = gameState.correctSquares.filter(square => 
    !gameState.userSelection.includes(square)
  );

  const isCorrect = incorrect.length === 0 && missed.length === 0;
  const points = correct.length * 10 - incorrect.length * 5;

  return (
    <div className="dark:bg-white/10 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-2xl  max-w-[368px] mx-auto">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          {isCorrect ? (
            <CheckCircle className="w-6 h-6 dark:text-green-400 text-green-500" />
          ) : (
            <XCircle className="w-6 h-6 text-red-400" />
          )}
          <h3 className="text-lg font-semibold dark:text-white">
            {isCorrect ? 'Perfect!' : 'Not quite right'}
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="dark:text-green-300 text-green-500 flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Correct</span>
            </span>
            <span className="dark:text-white font-semibold">{correct.length}</span>
          </div>

          {incorrect.length > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="dark:text-red-300 text-red-500 flex items-center space-x-1">
                <XCircle className="w-4 h-4" />
                <span>Incorrect</span>
              </span>
              <span className="dark:text-white font-semibold">{incorrect.length}</span>
            </div>
          )}

          {missed.length > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="dark:text-yellow-300 text-yellow-500 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>Missed</span>
              </span>
              <span className="dark:text-white font-semibold">{missed.length}</span>
            </div>
          )}

          <div className="pt-2 border-t border-white/20">
            <div className="flex items-center justify-between">
              <span className="dark:text-gray-300 text-gray-600">Points earned</span>
              <span className={`font-bold ${points > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {points > 0 ? '+' : ''}{points}
              </span>
            </div>
          </div>
        </div>

        {!isCorrect && levelConfig && (
          <div className="mt-4 p-4 dark:bg-blue-500/20 border dark:border-blue-500/30  bg-yellow-200/20  border-yellow-700/30 rounded-xl">
            <div className="flex items-start space-x-2">
              <Lightbulb className="w-5 h-5 dark:text-yellow-400 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold dark:text-yellow-300 text-yellow-500 mb-1">Hint</h4>
                <p className="text-xs dark:text-gray-300 text-gray-600">{levelConfig.hint}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPanel;