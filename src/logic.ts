import { WINNER_COMBINATIONS } from "./constanst";

export const checkWinner = (boardToCheck: Array<string | null>) => {
  for (const combo of WINNER_COMBINATIONS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return true;
    } else if (checkEndGame(boardToCheck)) {
      return false;
    }
  }
  return null;
};

export const checkEndGame = (boardToCheck: Array<string | null>) => {
  return boardToCheck.every((square) => square !== null);
};
