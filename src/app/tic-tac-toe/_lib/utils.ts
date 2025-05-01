import { isNone } from '@/shared/lib/type-guards';

import { Player, SquareState } from '../_types/game.types';

export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === Player.X ? Player.O : Player.X;
}

export function emptySquareIndexes(board: SquareState[]): number[] {
  return board.reduce<number[]>((indexes, square, index) => (isNone(square) ? indexes.concat(index) : indexes), []);
}
