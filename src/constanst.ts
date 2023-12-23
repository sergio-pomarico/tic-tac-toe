export const TURNS = { X: "❌", O: "⚪️" };
export const initialBoard = Array(9).fill(null);
export const WINNER_COMBINATIONS = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // diagonals
  [0, 4, 8],
  [2, 4, 6],
];
