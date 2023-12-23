import { FC, ReactNode, useState } from "react";
import "./App.css";

const TURNS = { X: "X", O: "O" };
const initialBoard = Array(9).fill(null);
const WINNER_COMBINATIONS = [
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

interface SquareProps {
  children: ReactNode;
  index?: number;
  isSelected?: boolean;
  updateBoard?: (index: number) => void;
}

const Square: FC<SquareProps> = ({
  children,
  isSelected = false,
  updateBoard,
  index,
}) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  const handeClick = () => {
    if (updateBoard) {
      updateBoard(index!);
    }
  };
  return (
    <div className={className} onClick={handeClick}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState<Array<string | null>>(initialBoard);
  const [turn, setTurn] = useState<string>(TURNS.X);
  const [winner, setWinner] = useState<string | null>(null); // X, O, null
  const updateBoard = (index: number) => {
    if (board[index] !== null || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };
  const checkWinner = (boardToCheck: Array<string | null>) => {
    for (const combo of WINNER_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };
  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((__, index) => {
          return (
            <Square key={index} updateBoard={updateBoard} index={index}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
