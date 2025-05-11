import { GameMove, GameSize } from '../game.types';

import { Grid } from './grid';

type GameState = {
  score: number;
  bestScore: number;
  grid: Grid;
  initTileCount: number;
};

type InitGameArgument = {
  size?: GameSize;
  bestScore?: number;
  initTileCount?: number;
};

export function initGameState({ size = 4, bestScore = 0, initTileCount = 2 }: InitGameArgument): GameState {
  return {
    score: 0,
    bestScore,
    grid: Grid.create(size),
    initTileCount,
  };
}

export const enum GAME_ACTIONS {
  INIT_TILES,
  MOVE,
  RESTART,
}

type GameAction =
  | { type: GAME_ACTIONS.INIT_TILES }
  | { type: GAME_ACTIONS.MOVE; payload: GameMove }
  | { type: GAME_ACTIONS.RESTART };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GAME_ACTIONS.INIT_TILES:
      return { ...state, grid: Grid.create(state.grid.size, state.initTileCount) };
    case GAME_ACTIONS.MOVE:
      return { ...state, grid: state.grid.clone().move(action.payload) };
    case GAME_ACTIONS.RESTART:
      return { ...state, score: 0, grid: Grid.create(state.grid.size, state.initTileCount) };
    default:
      return state;
  }
}
