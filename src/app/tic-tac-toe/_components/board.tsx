import { isNonNullable } from '@/shared/lib/type-guards';

import { SquareState } from '../_types/game';

import Square from './square';

import styles from './game.module.scss';

type Props = {
  winner: SquareState;
  squares: SquareState[];
  winnerSequence?: number[];
  onSquareClick: (index: number) => void;
};

export default function Board({ winner, squares, winnerSequence, onSquareClick }: Props) {
  return (
    <div className={styles.board}>
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          winner={winner}
          isWinner={winnerSequence?.includes(index)}
          disabled={isNonNullable(square) || isNonNullable(winner)}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}
