import { isNone } from '@/shared/lib/type-guards';

import { Player, SquareState } from '../_types/game';

export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === Player.X ? Player.O : Player.X;
}

export function emptySquares(board: SquareState[]): number[] {
  return board.reduce<number[]>((array, square, index) => (isNone(square) ? array.concat(index) : array), []);
}
