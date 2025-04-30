import { isNonNullable } from '@/shared/lib/type-guards';

import { BotFunc, Player, SquareState } from '../_types/game';

import { calculateWinner } from './calculate-winner';
import { emptySquares, getNextPlayer } from './utils';

type MinimaxResult = { score: number; index?: number };

export const hardBot: BotFunc = (board, player) => {
  return minmax(board, player).index ?? -1;
};

function minmax(board: SquareState[], currentPlayer: Player, secondPlayer?: Player): MinimaxResult {
  const { winner } = calculateWinner(board);

  if (isNonNullable(winner) && winner !== currentPlayer) {
    return { score: -10 };
  }

  if (winner === currentPlayer) {
    return { score: 10 };
  }

  const availableSpots = emptySquares(board);

  if (availableSpots.length === 0) {
    return { score: 0 };
  }

  const player = secondPlayer ?? currentPlayer;
  const moves: MinimaxResult[] = [];

  for (let i = 0; i < availableSpots.length; i++) {
    const availableIndex = availableSpots[i];
    board[availableIndex] = player;

    const nextPlayer = getNextPlayer(player);
    const score = minmax(board, currentPlayer, nextPlayer).score;

    const move: MinimaxResult = { score, index: availableIndex };
    board[availableIndex] = null;

    if ((player === currentPlayer && move.score > 0) || (player !== currentPlayer && move.score < 0)) {
      return move;
    }

    moves.push(move);
  }

  let bestMoveIndex;

  if (player === currentPlayer) {
    let bestScore = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMoveIndex = i;
      }
    }
  } else {
    let bestScore = Number.POSITIVE_INFINITY;

    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMoveIndex = i;
      }
    }
  }

  return moves[bestMoveIndex!];
}
