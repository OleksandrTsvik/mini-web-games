import { useEffect, useLayoutEffect, useReducer } from 'react';

import { useClickOutside } from '@/hooks/use-click-outside';
import { useKeyboard } from '@/hooks/use-keyboard';
import { KEYBOARD_EVENT_CODE, KeyboardEventCode } from '@/shared/types';

import { GameMove } from '../game.types';

import { GAME_ACTIONS, gameReducer, initGameState } from './game-reducer';
import { loadGameState, saveGameState } from './game-storage';

export function useGameState() {
  const [{ difficulty, isWin, grid }, dispatch] = useReducer(gameReducer, {}, initGameState);

  useLayoutEffect(() => {
    try {
      dispatch({ type: GAME_ACTIONS.INIT_GAME, payload: loadGameState() });
    } catch {
      dispatch({ type: GAME_ACTIONS.INIT_GAME });
    }
  }, []);

  useEffect(() => {
    saveGameState(difficulty, grid);
  }, [difficulty, grid]);

  const handleKeyboardAction = (key: KeyboardEventCode) => {
    switch (key) {
      case KEYBOARD_EVENT_CODE.ARROW_UP:
      case KEYBOARD_EVENT_CODE.W:
        dispatch({ type: GAME_ACTIONS.SELECT_CELL, payload: { move: GameMove.UP } });
        break;
      case KEYBOARD_EVENT_CODE.ARROW_DOWN:
      case KEYBOARD_EVENT_CODE.S:
        dispatch({ type: GAME_ACTIONS.SELECT_CELL, payload: { move: GameMove.DOWN } });
        break;
      case KEYBOARD_EVENT_CODE.ARROW_LEFT:
      case KEYBOARD_EVENT_CODE.A:
        dispatch({ type: GAME_ACTIONS.SELECT_CELL, payload: { move: GameMove.LEFT } });
        break;
      case KEYBOARD_EVENT_CODE.ARROW_RIGHT:
      case KEYBOARD_EVENT_CODE.D:
        dispatch({ type: GAME_ACTIONS.SELECT_CELL, payload: { move: GameMove.RIGHT } });
        break;
      case KEYBOARD_EVENT_CODE.BACKSPACE:
      case KEYBOARD_EVENT_CODE.DELETE:
        dispatch({ type: GAME_ACTIONS.REMOVE_CELL_VALUE });
        break;
      default:
        dispatch({ type: GAME_ACTIONS.CHANGE_CELL_VALUE, payload: +key.replace(/\D+/, '') });
        break;
    }
  };

  useKeyboard(handleKeyboardAction);

  const handleClickOutsideGrid = () => dispatch({ type: GAME_ACTIONS.SELECT_CELL });

  const gridContainerRef = useClickOutside(handleClickOutsideGrid);

  const handleCellClick = (index: number) => dispatch({ type: GAME_ACTIONS.SELECT_CELL, payload: { index } });

  const handleNumberClick = (number: number) => dispatch({ type: GAME_ACTIONS.CHANGE_CELL_VALUE, payload: number });

  const handleRemoveClick = () => dispatch({ type: GAME_ACTIONS.REMOVE_CELL_VALUE });

  const handleReset = () => dispatch({ type: GAME_ACTIONS.RESET });

  const handleRestart = () => dispatch({ type: GAME_ACTIONS.RESTART });

  const handleChangeDifficulty = (difficulty: number) =>
    dispatch({ type: GAME_ACTIONS.CHANGE_DIFFICULTY, payload: difficulty });

  return {
    difficulty,
    isWin,
    grid,
    gridContainerRef,
    handleCellClick,
    handleNumberClick,
    handleRemoveClick,
    handleReset,
    handleRestart,
    handleChangeDifficulty,
  };
}
