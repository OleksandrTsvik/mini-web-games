import { BotFunc, Player, SquareState } from '../game.types';

import { calculateWinner } from './calculate-winner';
import { emptySquareIndexes, getNextPlayer } from './utils';

const PRIORITY_SQUARES = [4, 0, 2, 6, 8, 1, 3, 5, 7];

export const normalBot: BotFunc = (board, botPlayer) => {
  const availableSquareIndexes = emptySquareIndexes(board);

  const botWinningSquareIndex = getWinningSquareIndex(board, availableSquareIndexes, botPlayer);

  if (botWinningSquareIndex > -1) {
    return botWinningSquareIndex;
  }

  const nextPlayer = getNextPlayer(botPlayer);
  const nextPlayerWinningSquareIndex = getWinningSquareIndex(board, availableSquareIndexes, nextPlayer);

  if (nextPlayerWinningSquareIndex > -1) {
    return nextPlayerWinningSquareIndex;
  }

  for (let i = 0; i < PRIORITY_SQUARES.length; i++) {
    const priorityIndex = PRIORITY_SQUARES[i];

    if (availableSquareIndexes.includes(priorityIndex)) {
      return priorityIndex;
    }
  }

  return availableSquareIndexes[0];
};

function getWinningSquareIndex(board: SquareState[], availableSquareIndexes: number[], player: Player): number {
  for (let i = 0; i < availableSquareIndexes.length; i++) {
    const availableIndex = availableSquareIndexes[i];
    board[availableIndex] = player;

    const { winner } = calculateWinner(board);
    board[availableIndex] = null;

    if (winner === player) {
      return availableIndex;
    }
  }

  return -1;
}
