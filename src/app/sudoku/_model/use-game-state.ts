import { useLayoutEffect, useReducer } from 'react';

import { GAME_ACTIONS, gameReducer, initGameState } from './game-reducer';

export function useGameState() {
  const [{ grid }, dispatch] = useReducer(gameReducer, {}, initGameState);

  useLayoutEffect(() => {
    dispatch({ type: GAME_ACTIONS.INIT_GAME });
  }, []);

  const handleCellSelect = (index: number) => dispatch({ type: GAME_ACTIONS.SELECT_CELL, payload: index });

  return { grid, handleCellSelect };
}
