'use client';

import { useState } from 'react';

import { calculateWinner } from '../_lib/calculate-winner';
import { SquareState, SquareType } from '../_types/square-type';

import Board from './board';
import ResetButton from './reset-button';
import Status from './status';

const INIT_CURRENT_MOVE = SquareType.X;
const INIT_SQUARES = Array(9).fill(null);

export default function Game() {
  const [currentMove, setCurrentMove] = useState(INIT_CURRENT_MOVE);
  const [squares, setSquares] = useState<SquareState[]>(INIT_SQUARES);

  const winner = calculateWinner(squares);

  const handlePlay = (nextSquares: SquareState[]) => {
    setCurrentMove((prevState) => (prevState === SquareType.X ? SquareType.O : SquareType.X));
    setSquares(nextSquares);
  };

  const handleReset = () => {
    setCurrentMove(INIT_CURRENT_MOVE);
    setSquares(INIT_SQUARES);
  };

  return (
    <>
      <Status
        winner={winner}
        currentMove={currentMove}
      />
      <Board
        winner={winner}
        currentMove={currentMove}
        squares={squares}
        onPlay={handlePlay}
      />
      <ResetButton onClick={handleReset} />
    </>
  );
}
