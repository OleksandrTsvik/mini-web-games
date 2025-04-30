import { useState } from 'react';

import { isNonNullable } from '@/shared/lib/type-guards';

import { calculateWinner } from '../_lib/calculate-winner';
import { SquareState, SquareType } from '../_types/square-type';

const INIT_CURRENT_MOVE = SquareType.X;
const INIT_SQUARES = Array(9).fill(null);

export default function useGameState() {
  const [currentMove, setCurrentMove] = useState(INIT_CURRENT_MOVE);
  const [squares, setSquares] = useState<SquareState[]>(INIT_SQUARES);

  const { winner, winnerSequence, isDraw } = calculateWinner(squares);

  const handleSquareClick = (index: number) => {
    if (isNonNullable(winner) || isNonNullable(squares[index])) {
      return;
    }

    const nextSquares = squares.slice();

    if (currentMove === SquareType.X) {
      nextSquares[index] = SquareType.X;
    } else {
      nextSquares[index] = SquareType.O;
    }

    setCurrentMove(currentMove === SquareType.X ? SquareType.O : SquareType.X);
    setSquares(nextSquares);
  };

  const handleReset = () => {
    setCurrentMove(INIT_CURRENT_MOVE);
    setSquares(INIT_SQUARES);
  };

  return { squares, currentMove, winner, winnerSequence, isDraw, handleSquareClick, handleReset };
}
