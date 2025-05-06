import { useCallback, useEffect, useReducer } from 'react';

import { isNonNullable } from '@/shared/lib/type-guards';

import { calculateWinner } from '../_lib/calculate-winner';
import { getBotByLevel, getNextPlayer } from '../_lib/utils';
import { BOT_MOVE_DELAY_MS } from '../game.constants';
import { BotLevel, Player } from '../game.types';

import { GAME_ACTIONS, INIT_GAME_STATE, gameReducer } from './game-reducer';

export function useGameState(botLevel?: BotLevel) {
  const [{ humanPlayer, currentPlayer, squares }, dispatch] = useReducer(gameReducer, INIT_GAME_STATE);

  const bot = getBotByLevel(botLevel);
  const botPlayer = bot ? getNextPlayer(humanPlayer) : null;

  const { winner, winnerSequence, isDraw } = calculateWinner(squares);

  const handleRestart = () => dispatch({ type: GAME_ACTIONS.RESTART });

  const handleHumanPlayerChange = (player: Player) =>
    dispatch({ type: GAME_ACTIONS.SET_HUMAN_PLAYER, payload: player });

  const handleMove = useCallback(
    (index: number) => {
      if (isNonNullable(winner) || isNonNullable(squares[index]) || isDraw) {
        return;
      }

      dispatch({ type: GAME_ACTIONS.MOVE, payload: { index } });
    },
    [isDraw, squares, winner],
  );

  const handleSquareClick = (index: number) => {
    if (currentPlayer === botPlayer) {
      return;
    }

    handleMove(index);
  };

  useEffect(() => {
    if (!bot || currentPlayer !== botPlayer) {
      return;
    }

    const timeout = setTimeout(() => {
      const botIndex = bot(squares, botPlayer);
      handleMove(botIndex);
    }, BOT_MOVE_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [bot, botPlayer, currentPlayer, handleMove, squares]);

  return {
    humanPlayer,
    botPlayer,
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
