import React from "react";
import { Level, GamePhase } from "../types/game";
import { Trophy, Target, Clock } from "lucide-react";

interface LevelInfoProps {
  level: number;
  levelConfig?: Level;
  score: number;
  phase: GamePhase;
}

const LevelInfo: React.FC<LevelInfoProps> = ({
  level,
  levelConfig,
  score,
  phase,
}) => {
  return (
    <div className="max-w-[368px] dark:bg-white/10 bg-white/80 backdrop-blur-lg rounded-2xl p-5 shadow-2xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold dark:text-white ">Level {level}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="dark:text-white font-semibold">{score}</span>
          </div>
        </div>

        {levelConfig && (
          <div>
            <h3 className="text-lg font-semibold dark:text-cyan-300 text-cyan-500 mb-2">
              {levelConfig.name}
            </h3>
            {/* <p className="text-gray-300 text-sm leading-relaxed">
              {levelConfig.description}
            </p> */}
          </div>
        )}

        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4 text-purple-400" />
          <span className="dark:text-gray-300 text-gray-700">
            {phase === "ready" && "Ready to start"}
            {phase === "flashing" && "Observe the pattern..."}
            {phase === "selecting" && "Select the flashing squares"}
            {phase === "feedback" && "Review your answer"}
            {phase === "completed" && "Game completed!"}
          </span>
        </div>

        {phase === "flashing" && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Pattern observation</span>
              <span>10s</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-100 ease-linear progress-bar" />
            </div>
          </div>
        )}
        {phase != "flashing" && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Pattern observation</span>
              <span>10s</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-100 ease-linear " />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelInfo;
