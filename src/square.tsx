import { FC, ReactNode } from "react";

interface SquareProps {
  children: ReactNode;
  index?: number;
  isSelected?: boolean;
  updateBoard?: (index: number) => void;
}

export const Square: FC<SquareProps> = ({
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
