import { SquareState, SquareType } from '../_types/square-type';

import Square from './square';

import styles from './game.module.scss';

type Props = {
  winner: SquareState;
  currentMove: SquareType;
  squares: SquareState[];
  onPlay: (nextSquares: SquareState[]) => void;
};

export default function Board({ winner, currentMove, squares, onPlay }: Props) {
  const handleSquareClick = (index: number) => {
    if (winner !== null || squares[index] !== null) {
      return;
    }

    const nextSquares = squares.slice();

    if (currentMove === SquareType.X) {
      nextSquares[index] = SquareType.X;
    } else {
      nextSquares[index] = SquareType.O;
    }

    onPlay(nextSquares);
  };

  const renderSquare = (row: number, col: number) => {
    const index = row * 3 + col;

    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => handleSquareClick(index)}
      />
    );
  };

  return [0, 1, 2].map((row) => (
    <div
      key={row}
      className={styles.board__row}
    >
      {[0, 1, 2].map((col) => renderSquare(row, col))}
    </div>
  ));
}
