import { useState } from "react";
import confetti from "canvas-confetti";
import { TURNS, initialBoard } from "./constanst";
import { checkWinner } from "./logic";
import { Square } from "./square";
import "./App.css";

function App() {
  const boardFromStorage = window.localStorage.getItem("board");
  const turnFromStorage = window.localStorage.getItem("turn");
  const [board, setBoard] = useState<Array<string | null>>(() => {
    return JSON.parse(boardFromStorage || "null") || initialBoard;
  });
  const [turn, setTurn] = useState<string>(() => {
    return JSON.parse(turnFromStorage || "null") || TURNS.X;
  });
  const [winner, setWinner] = useState<boolean | null>(null); // X, O, null
  const resetGame = () => {
    setBoard(initialBoard);
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };
  const updateBoard = (index: number) => {
    if (board[index] !== null || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner !== null) {
      setWinner(newWinner);
      confetti();
      return;
    }
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", JSON.stringify(newTurn));
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Play Again</button>
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
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner ? "Win" : "Draw"}</h2>
            {winner !== false && (
              <header className="win">
                <Square>{turn}</Square>
              </header>
            )}
            <footer>
              <button onClick={resetGame}>Play Again</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
