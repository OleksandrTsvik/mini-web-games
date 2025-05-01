import { isNone } from '@/shared/lib/type-guards';

import { BotFunc, BotLevel, Player, SquareState } from '../_types/game.types';

import { easyBot } from './easy.bot';
import { hardBot } from './hard.bot';
import { normalBot } from './normal.bot';

export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === Player.X ? Player.O : Player.X;
}

export function emptySquareIndexes(board: SquareState[]): number[] {
  return board.reduce<number[]>((indexes, square, index) => (isNone(square) ? indexes.concat(index) : indexes), []);
}

export function getBotByLevel(botLevel?: BotLevel): BotFunc | undefined {
  switch (botLevel?.trim().toLowerCase()) {
    case 'easy':
      return easyBot;
    case 'normal':
      return normalBot;
    case 'hard':
      return hardBot;
    default:
      return;
  }
}
