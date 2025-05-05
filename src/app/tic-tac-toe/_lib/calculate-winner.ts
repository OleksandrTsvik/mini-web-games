import { isNonNullable } from '@/shared/lib/type-guards';

import { Player, SquareState } from '../_types/game.types';

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

export function calculateWinner(board: SquareState[]): {
  winner?: Player;
  winnerSequence?: number[];
  isDraw: boolean;
} {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];

    if (isNonNullable(board[a]) && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winnerSequence: WINNING_COMBINATIONS[i],
        isDraw: false,
      };
    }
  }

  const isDraw = board.every((square) => isNonNullable(square));

  return { isDraw };
}
