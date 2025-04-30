import { isNonNullable } from '@/shared/lib/type-guards';

import { SquareState } from '../_types/square-type';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(squares: SquareState[]): {
  winner: SquareState | null;
  winnerSequence?: number[];
  isDraw: boolean;
} {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];

    if (isNonNullable(squares[a]) && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winnerSequence: WINNING_COMBINATIONS[i],
        isDraw: false,
      };
    }
  }

  const isDraw = squares.every((square) => isNonNullable(square));

  return { winner: null, isDraw };
}
