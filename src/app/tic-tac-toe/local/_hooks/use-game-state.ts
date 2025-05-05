import { useState } from 'react';

import { isNonNullable, isNone } from '@/shared/lib/type-guards';

import { calculateWinner } from '../_lib/calculate-winner';
import { getBotByLevel, getNextPlayer } from '../_lib/utils';
import { Player, SquareState } from '../game.types';

const INIT_CURRENT_PLAYER = Player.X;
const INIT_SQUARES = Array(9).fill(null);

export function useGameState(botLevel?: string) {
  const [currentPlayer, setCurrentPlayer] = useState(INIT_CURRENT_PLAYER);
  const [squares, setSquares] = useState<SquareState[]>(INIT_SQUARES);

  const bot = getBotByLevel(botLevel);
  const { winner, winnerSequence, isDraw } = calculateWinner(squares);

  const handleSquareClick = (index: number) => {
    if (isNonNullable(winner) || isNonNullable(squares[index])) {
      return;
    }

    const nextPlayer = getNextPlayer(currentPlayer);
    const nextSquares = squares.slice();

    nextSquares[index] = currentPlayer;

    if (!bot) {
      setCurrentPlayer(nextPlayer);
      setSquares(nextSquares);
      return;
    }

    const result = calculateWinner(nextSquares);

    if (isNone(result.winner) && !result.isDraw) {
      const botIndex = bot(nextSquares, nextPlayer);
      nextSquares[botIndex] = nextPlayer;
    }

    setSquares(nextSquares);
  };

  const handleRestart = () => {
    setCurrentPlayer(INIT_CURRENT_PLAYER);
    setSquares(INIT_SQUARES);
  };

  return { squares, currentPlayer, winner, winnerSequence, isDraw, handleSquareClick, handleRestart };
}
