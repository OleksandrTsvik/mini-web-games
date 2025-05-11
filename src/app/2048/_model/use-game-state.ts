import { useLayoutEffect, useReducer } from 'react';

import useKeyboard from '@/hooks/use-keyboard';
import { handleGameKeyboardAction } from '@/shared/lib/keyboard.utils';
import { KeyboardEventCode } from '@/shared/types';

import { GameMove } from '../game.types';

import { GAME_ACTIONS, gameReducer, initGameState } from './game-reducer';

export function useGameState() {
  const [{ score, bestScore, grid }, dispatch] = useReducer(gameReducer, {}, initGameState);

  const size = grid.size;

  useLayoutEffect(() => {
    dispatch({ type: GAME_ACTIONS.INIT_TILES });
  }, []);

  const handleKeyboardAction = (key: KeyboardEventCode) => {
    handleGameKeyboardAction(key, {
      up: () => dispatch({ type: GAME_ACTIONS.MOVE, payload: GameMove.UP }),
      down: () => dispatch({ type: GAME_ACTIONS.MOVE, payload: GameMove.DOWN }),
      left: () => dispatch({ type: GAME_ACTIONS.MOVE, payload: GameMove.LEFT }),
      right: () => dispatch({ type: GAME_ACTIONS.MOVE, payload: GameMove.RIGHT }),
      restart: () => dispatch({ type: GAME_ACTIONS.RESTART }),
    });
  };

  useKeyboard(handleKeyboardAction);

  const handleRestart = () => dispatch({ type: GAME_ACTIONS.RESTART });

  return { size, score, bestScore, grid, handleRestart };
}
