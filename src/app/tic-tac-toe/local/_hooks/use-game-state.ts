import { useCallback, useEffect, useState } from 'react';

import { isNonNullable } from '@/shared/lib/type-guards';

import { calculateWinner } from '../_lib/calculate-winner';
import { getBotByLevel, getNextPlayer } from '../_lib/utils';
import { BotLevel, Player, SquareState } from '../game.types';

const INIT_CURRENT_PLAYER = Player.X;
const INIT_SQUARES = Array(9).fill(null);

export function useGameState(botLevel?: BotLevel) {
  const [humanPlayer, setHumanPlayer] = useState(INIT_CURRENT_PLAYER);
  const [currentPlayer, setCurrentPlayer] = useState(INIT_CURRENT_PLAYER);
  const [squares, setSquares] = useState<SquareState[]>(INIT_SQUARES);

  const bot = getBotByLevel(botLevel);
  const botPlayer = bot ? getNextPlayer(humanPlayer) : null;

  const { winner, winnerSequence, isDraw } = calculateWinner(squares);

  const handleRestart = () => {
    setCurrentPlayer(INIT_CURRENT_PLAYER);
    setSquares(INIT_SQUARES);
  };

  const handleHumanPlayerChange = (player: Player) => {
    setHumanPlayer(player);
    handleRestart();
  };

  const handleMove = useCallback(
    (player: Player, index: number) => {
      if (isNonNullable(winner) || isNonNullable(squares[index]) || isDraw) {
        return;
      }

      const nextPlayer = getNextPlayer(player);
      const nextSquares = squares.slice();

      nextSquares[index] = player;

      setCurrentPlayer(nextPlayer);
      setSquares(nextSquares);
    },
    [isDraw, squares, winner],
  );

  const handleSquareClick = (index: number) => {
    if (currentPlayer === botPlayer) {
      return;
    }

    handleMove(currentPlayer, index);
  };

  useEffect(() => {
    if (!bot || currentPlayer !== botPlayer) {
      return;
    }

    const timeout = setTimeout(() => {
      const botIndex = bot(squares, botPlayer);
      handleMove(botPlayer, botIndex);
    }, 400);

    return () => clearTimeout(timeout);
  }, [bot, botPlayer, currentPlayer, handleMove, squares]);

  return {
    humanPlayer,
    squares,
    currentPlayer,
    winner,
    winnerSequence,
    isDraw,
    handleHumanPlayerChange,
    handleSquareClick,
    handleRestart,
  };
}
