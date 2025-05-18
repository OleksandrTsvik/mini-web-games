import { getRandomElement } from '@/shared/lib/random.utils';

import { BotFunc } from '../game.types';

import { calculateWinner } from './calculate-winner';
import { emptySquareIndexes } from './utils';

export const easyBot: BotFunc = (board, botPlayer) => {
  const availableSquareIndexes = emptySquareIndexes(board);

  for (let i = 0; i < availableSquareIndexes.length; i++) {
    const availableIndex = availableSquareIndexes[i];
    board[availableIndex] = botPlayer;

    const { winner } = calculateWinner(board);
    board[availableIndex] = null;

    if (winner === botPlayer) {
      return availableIndex;
    }
  }

  return getRandomElement(availableSquareIndexes);
};
