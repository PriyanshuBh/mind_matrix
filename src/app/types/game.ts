export type GamePhase = 'ready' | 'flashing' | 'selecting' | 'feedback' | 'completed';

export interface GameState {
  currentLevel: number;
  phase: GamePhase;
  userSelection: number[];
  correctSquares: number[];
  showFeedback: boolean;
  score: number;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  hint: string;
}