import { GameMove, GameSize, GameStatus } from '../game.types';

import { Grid } from './grid';

type GameState = {
  status: GameStatus;
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
    status: GameStatus.Active,
    score: 0,
    bestScore,
    grid: Grid.create(size),
    initTileCount,
  };
}

export const enum GAME_ACTIONS {
  INIT_TILES,
  MOVE,
  MERGE,
  ADD_RANDOM_TILE,
  COMPUTE,
  RESTART,
}

type GameAction =
  | { type: GAME_ACTIONS.INIT_TILES }
  | { type: GAME_ACTIONS.MOVE; payload: GameMove }
  | { type: GAME_ACTIONS.MERGE }
  | { type: GAME_ACTIONS.ADD_RANDOM_TILE }
  | { type: GAME_ACTIONS.COMPUTE }
  | { type: GAME_ACTIONS.RESTART };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GAME_ACTIONS.INIT_TILES:
      return { ...state, status: GameStatus.Active, grid: Grid.create(state.grid.size, state.initTileCount) };
    case GAME_ACTIONS.MOVE:
      return { ...state, status: GameStatus.Moving, grid: state.grid.clone().move(action.payload) };
    case GAME_ACTIONS.MERGE:
      return { ...state, status: GameStatus.Merging, grid: state.grid.clone().merge() };
    case GAME_ACTIONS.ADD_RANDOM_TILE:
      return { ...state, status: GameStatus.Adding, grid: state.grid.clone().addRandomTile() };
    case GAME_ACTIONS.COMPUTE:
      return { ...state, status: GameStatus.Active };
    case GAME_ACTIONS.RESTART:
      return { ...state, status: GameStatus.Active, score: 0, grid: Grid.create(state.grid.size, state.initTileCount) };
    default:
      return state;
  }
}
