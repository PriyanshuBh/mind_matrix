import { Level } from "../types/game";

// Convert grid index to row and column (0-based)
const indexToRowCol = (index: number): [number, number] => {
  const row = Math.floor(index / 5);
  const col = index % 5;
  return [row, col];
};

// Check if a number is prime
const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
};

// Level rule functions
const levelRules: Record<number, (index: number) => boolean> = {
  1: (index: number) => (index + 1) % 2 === 0,

  2: (index: number) => {
    const [row, col] = indexToRowCol(index);
    return row === col || row + col === 4;
  },

  3: (index: number) => isPrime(index + 1),

  4: (index: number) => {
    const center = 12;
    const neighbors = [7, 11, 13, 17];
    return index === center || neighbors.includes(index);
  },

  5: (index: number) => {
    const [row, col] = indexToRowCol(index);
    return (row + col + 2) % 3 === 0;
  },
  6: (index: number) => {
    const fib = [1, 1, 2, 3, 5, 8, 13, 21];
    return fib.includes(index + 1);
  },
  7: (index: number) => {
    const perfectSquares = [1,4,9,16,25]; 
    return perfectSquares.includes(index+1);
  }
};

// Level configurations
export const LEVELS: Level[] = [
  {
    id: 1,
    name: "Even Squares",
    description:
      "Squares flash when their position number is even (2nd, 4th, 6th, etc.)",
    hint: "Look for squares at positions 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, and 24",
  },
  {
    id: 2,
    name: "Diagonal Lines",
    description: "Squares flash along the main diagonals of the grid",
    hint: "The pattern forms an 'X' shape across the grid - main diagonal and anti-diagonal",
  },
  {
    id: 3,
    name: "Prime Positions",
    description: "Squares flash when their position number is a prime number",
    hint: "Prime numbers are: 2, 3, 5, 7, 11, 13, 17, 19, 23 ",
  },
  {
    id: 4,
    name: "Center Cluster",
    description: "The center square and its four direct neighbors flash",
    hint: "Look for the middle square of the grid plus the squares directly above, below, left, and right of it",
  },
  {
    id: 5,
    name: "Modular Pattern",
    description: "Squares flash when (row + column) is divisible by 3",
    hint: "Add the row number and column number together. If divisible by 3, it flashes",
  },
  {
    id: 6,
    name: "Fibonacci Sequence",
    description: "Positions following the Fibonacci sequence",
    hint: "Fibonacci: 1, 1, 2, 3, 5, 8, 13, 21...",
  },
  {
    id: 7,
    name: "Perfect Squares",
    description: "Positions that are perfect squares (1, 4, 9, 16, 25)",
    hint: "Perfect squares: 1², 2², 3², 4², 5²...",
 
  },
];

export const getLevelRule = (level: number): ((index: number) => boolean) => {
  return levelRules[level] || (() => false);
};
