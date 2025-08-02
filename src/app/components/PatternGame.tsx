"use client";

import React, { useState, useCallback } from "react";
import Grid from "./Grid";
import GameControls from "./GameControls";
import LevelInfo from "./LevelInfo";
import FeedbackPanel from "./FeedbackPanel";
import { GameState } from "../types/game";
import { getLevelRule, LEVELS } from "../utils/levelRules";

const FLASH_DURATION = 10000;
const FLASH_INTERVAL = 800;
const PatternGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    phase: "ready",
    userSelection: [],
    correctSquares: [],
    showFeedback: false,
    score: 0,
  });

  const [flashingSquares, setFlashingSquares] = useState<Set<number>>(
    new Set()
  );
  const [isFlashing, setIsFlashing] = useState(false);
  // Get current level configuration
  const currentLevelConfig = LEVELS.find(
    (level) => level.id === gameState.currentLevel
  );

  // Calculate correct squares for current level
  const calculateCorrectSquares = useCallback(() => {
    const rule = getLevelRule(gameState.currentLevel);
    const correct: number[] = [];

    for (let i = 0; i < 25; i++) {
      if (rule(i)) {
        correct.push(i);
      }
    }

    return correct;
  }, [gameState.currentLevel]);
  // Start flashing animation
  const startFlashing = useCallback(() => {
    const correctSquares = calculateCorrectSquares();
    setGameState((prev) => ({
      ...prev,
      phase: "flashing",
      correctSquares,
      userSelection: [],
      showFeedback: false,
    }));

    setIsFlashing(true);

    const flashInterval = setInterval(() => {
      setFlashingSquares((prev) =>
        prev.size > 0 ? new Set() : new Set(correctSquares)
      );
    }, FLASH_INTERVAL);

    setTimeout(() => {
      clearInterval(flashInterval);
      setFlashingSquares(new Set());
      setIsFlashing(false);
      setGameState((prev) => ({ ...prev, phase: "selecting" }));
    }, FLASH_DURATION);

    return () => clearInterval(flashInterval);
  }, [calculateCorrectSquares]);

  const handleSquareClick = useCallback(
    (index: number) => {
      if (gameState.phase !== "selecting") return;

      setGameState((prev) => ({
        ...prev,
        userSelection: prev.userSelection.includes(index)
          ? prev.userSelection.filter((i) => i !== index)
          : [...prev.userSelection, index],
      }));
    },
    [gameState.phase]
  );
  // Submit user's answer
  const submitAnswer = useCallback(() => {
    const correct = gameState.userSelection.filter((square) =>
      gameState.correctSquares.includes(square)
    );
    const incorrect = gameState.userSelection.filter(
      (square) => !gameState.correctSquares.includes(square)
    );
    // const missed = gameState.correctSquares.filter(
    //   (square) => !gameState.userSelection.includes(square)
    // );

    // const isCorrect = incorrect.length === 0 && missed.length === 0;
    const points = correct.length * 10 - incorrect.length * 5;

    setGameState((prev) => ({
      ...prev,
      phase: "feedback",
      showFeedback: true,
      score: prev.score + Math.max(0, points),
    }));
  }, [gameState.userSelection, gameState.correctSquares]);

  const nextLevel = useCallback(() => {
    if (gameState.currentLevel < LEVELS.length) {
      setGameState((prev) => ({
        ...prev,
        currentLevel: prev.currentLevel + 1,
        phase: "ready",
        userSelection: [],
        correctSquares: [],
        showFeedback: false,
      }));
    } else {
      setGameState((prev) => ({ ...prev, phase: "completed" }));
    }
  }, [gameState.currentLevel]);

  const resetGame = useCallback(() => {
    setGameState({
      currentLevel: 1,
      phase: "ready",
      userSelection: [],
      correctSquares: [],
      showFeedback: false,
      score: 0,
    });
    setFlashingSquares(new Set());
    setIsFlashing(false);
  }, []);

  return (
    <div className=" min-h-screen ">
      <div className="xl:max-w-6xl md:max-w-3xl mx-auto ">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold  mt-10 bg-linear-to-r dark:from-cyan-400 tdark:to-purple-400 from-cyan-700 to-purple-700 bg-clip-text text-transparent">
            Pattern Decoder
          </h1>
          <p className="text-lg dark:text-gray-300 text-gray-600 mt-6 max-w-2xl mx-auto">
            Observe the flashing pattern, decode the hidden rule, and select the
            correct squares to advance through increasingly complex levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  items-start  gap-6">
          <div className="lg:col-span-1 space-y-6 order-1">
            <LevelInfo
              level={gameState.currentLevel}
              levelConfig={currentLevelConfig}
              score={gameState.score}
              phase={gameState.phase}
            />
          </div>
          <div className="flex justify-center order-2 row-span-2 md:order-3">
            <Grid
              flashingSquares={flashingSquares}
              userSelection={gameState.userSelection}
              correctSquares={gameState.correctSquares}
              phase={gameState.phase}
              onSquareClick={handleSquareClick}
            />
          </div>

          <div className="lg:col-span-1 space-y-6 order-3 md:order-2 xl:order-4">
            <GameControls
              phase={gameState.phase}
              onStartFlashing={startFlashing}
              onSubmitAnswer={submitAnswer}
              onNextLevel={nextLevel}
              onResetGame={resetGame}
              hasSelection={gameState.userSelection.length > 0}
              isLastLevel={gameState.currentLevel >= LEVELS.length}
            />
          </div>
          <div className="xl:order-3 order-4 row-span-2">
            <FeedbackPanel
              gameState={gameState}
              levelConfig={currentLevelConfig}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternGame;
