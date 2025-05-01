import { useState } from 'react';

import { isNonNullable, isNone } from '@/shared/lib/type-guards';

import { calculateWinner } from '../_lib/calculate-winner';
import { getNextPlayer } from '../_lib/utils';
import { BotFunc, Player, SquareState } from '../_types/game.types';

const INIT_CURRENT_PLAYER = Player.X;
const INIT_SQUARES = Array(9).fill(null);

export default function useGameState(bot?: BotFunc) {
  const [currentPlayer, setCurrentPlayer] = useState(INIT_CURRENT_PLAYER);
  const [squares, setSquares] = useState<SquareState[]>(INIT_SQUARES);

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

  const handleReset = () => {
    setCurrentPlayer(INIT_CURRENT_PLAYER);
    setSquares(INIT_SQUARES);
  };

  return { squares, currentPlayer, winner, winnerSequence, isDraw, handleSquareClick, handleReset };
}
