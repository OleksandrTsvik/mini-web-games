import { BotFunc } from '../_types/game';

import { emptySquares } from './utils';

export const easyBot: BotFunc = (board) => {
  const availableSpots = emptySquares(board);

  // TODO: random

  return availableSpots[0];
};
