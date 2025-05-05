import { isNone } from '@/shared/lib/type-guards';

import { BOT_LEVEL } from '../game.constants';
import { BotFunc, Player, SquareState } from '../game.types';

import { easyBot } from './easy.bot';
import { hardBot } from './hard.bot';
import { normalBot } from './normal.bot';

export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === Player.X ? Player.O : Player.X;
}

export function emptySquareIndexes(board: SquareState[]): number[] {
  return board.reduce<number[]>((indexes, square, index) => (isNone(square) ? indexes.concat(index) : indexes), []);
}

export function getBotByLevel(botLevel?: string): BotFunc | undefined {
  switch (botLevel?.trim().toLowerCase()) {
    case BOT_LEVEL.EASY:
      return easyBot;
    case BOT_LEVEL.NORMAL:
      return normalBot;
    case BOT_LEVEL.HARD:
      return hardBot;
    default:
      return;
  }
}
