import { useEffect, useLayoutEffect, useReducer } from 'react';

import useKeyboard from '@/hooks/use-keyboard';
import { handleGameKeyboardAction } from '@/shared/lib/keyboard.utils';
import { KeyboardEventCode } from '@/shared/types';

import { TILE_MOVE_DURATION_MS } from '../game.constants';
import { GameMove, GameStatus } from '../game.types';

import { GAME_ACTIONS, gameReducer, initGameState } from './game-reducer';

export function useGameState() {
  const [{ status, score, bestScore, grid }, dispatch] = useReducer(gameReducer, {}, initGameState);

  const size = grid.size;

  useLayoutEffect(() => {
    dispatch({ type: GAME_ACTIONS.INIT_TILES });
  }, []);

  const handleKeyboardAction = (key: KeyboardEventCode) => {
    if (status !== GameStatus.Active) {
      return;
    }

    handleGameKeyboardAction(key, {
      up: () => dispatch({ type: GAME_ACTIONS.MOVE, payload: GameMove.UP }),
      down: () => dispatch({ type: GAME_ACTIONS.MOVE, payload: GameMove.DOWN }),
      left: () => dispatch({ type: GAME_ACTIONS.MOVE, payload: GameMove.LEFT }),
      right: () => dispatch({ type: GAME_ACTIONS.MOVE, payload: GameMove.RIGHT }),
      restart: () => dispatch({ type: GAME_ACTIONS.RESTART }),
    });
  };

  useKeyboard(handleKeyboardAction);

  useEffect(() => {
    switch (status) {
      case GameStatus.Moving:
        setTimeout(() => dispatch({ type: GAME_ACTIONS.MERGE }), TILE_MOVE_DURATION_MS);
        break;
      case GameStatus.Merging:
        dispatch({ type: GAME_ACTIONS.ADD_RANDOM_TILE });
        break;
      case GameStatus.Adding:
        dispatch({ type: GAME_ACTIONS.COMPUTE });
        break;
    }
  }, [status]);

  const handleRestart = () => dispatch({ type: GAME_ACTIONS.RESTART });

  return { size, score, bestScore, grid, handleRestart };
}
