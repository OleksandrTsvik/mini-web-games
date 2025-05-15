import { useEffect, useLayoutEffect, useReducer } from 'react';

import useKeyboard from '@/hooks/use-keyboard';
import { handleGameKeyboardAction } from '@/shared/lib/keyboard.utils';
import { KeyboardEventCode } from '@/shared/types';

import { TILE_MOVE_DURATION_MS } from '../game.constants';
import { GameMove, GameStatus } from '../game.types';

import { GAME_ACTIONS, gameReducer, initGameState } from './game-reducer';
import { clearGameState, loadGameState, saveGameState } from './game-storage';

export function useGameState() {
  const [{ status, isPlayAfterWin, score, bestScore, grid }, dispatch] = useReducer(gameReducer, {}, initGameState);

  const size = grid.size;

  useLayoutEffect(() => {
    try {
      dispatch({ type: GAME_ACTIONS.INIT_GAME, payload: loadGameState() });
    } catch {
      dispatch({ type: GAME_ACTIONS.INIT_GAME });
    }
  }, []);

  useEffect(() => {
    switch (status) {
      case GameStatus.Active:
      case GameStatus.Victory:
        saveGameState(isPlayAfterWin, score, bestScore, grid);
        break;
      case GameStatus.Defeat:
        clearGameState(bestScore);
        break;
    }
  }, [bestScore, grid, isPlayAfterWin, score, status]);

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

  const handlePlayAfterWin = () => dispatch({ type: GAME_ACTIONS.PLAY_AFTER_WIN });

  return { status, size, score, bestScore, grid, handleRestart, handlePlayAfterWin };
}
