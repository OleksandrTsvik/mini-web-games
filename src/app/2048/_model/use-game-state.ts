import { useLayoutEffect, useReducer } from 'react';

import useKeyboard from '@/hooks/use-keyboard';
import { handleGameMove } from '@/shared/lib/keyboard.utils';
import { KeyboardEventCode } from '@/shared/types';

import { GameSize } from '../game.types';

import { GAME_ACTIONS, gameReducer, initGameState } from './game-reducer';

export function useGameState() {
  const [{ score, bestScore, tiles }, dispatch] = useReducer(gameReducer, {}, initGameState);

  const size = Math.sqrt(tiles.length) as GameSize;

  useLayoutEffect(() => {
    dispatch({ type: GAME_ACTIONS.INIT_TILES });
  }, []);

  const handleKeyboardMove = (key: KeyboardEventCode) => {
    handleGameMove(key, {
      up: () => {
        console.log('UP');
      },
    });
  };

  useKeyboard(handleKeyboardMove);

  return { size, score, bestScore, tiles };
}
