import {
  DEFAULT_ALLOWED_MOVES,
  DEFAULT_GRID_SIZE,
  DEFAULT_INIT_TILE_COUNT,
  DEFAULT_MIN_TILE_TO_WIN,
} from '../game.constants';
import { GameMove, GameSize, GameStatus } from '../game.types';

import { Grid } from './grid';

type GameState = {
  status: GameStatus;
  isPlayAfterWin: boolean;
  score: number;
  bestScore: number;
  grid: Grid;
  allowedMoves: GameMove[];
  initTileCount: number;
  minTileToWin: number;
};

type InitGameArgument = {
  size?: GameSize;
  bestScore?: number;
  initTileCount?: number;
};

export function initGameState({
  size = DEFAULT_GRID_SIZE,
  bestScore = 0,
  initTileCount = DEFAULT_INIT_TILE_COUNT,
}: InitGameArgument): GameState {
  return {
    status: GameStatus.Active,
    isPlayAfterWin: false,
    score: 0,
    bestScore,
    grid: Grid.create(size),
    allowedMoves: DEFAULT_ALLOWED_MOVES,
    initTileCount,
    minTileToWin: DEFAULT_MIN_TILE_TO_WIN,
  };
}

export const enum GAME_ACTIONS {
  INIT_TILES,
  MOVE,
  MERGE,
  ADD_RANDOM_TILE,
  COMPUTE,
  RESTART,
  PLAY_AFTER_WIN,
}

type GameAction =
  | { type: GAME_ACTIONS.INIT_TILES }
  | { type: GAME_ACTIONS.MOVE; payload: GameMove }
  | { type: GAME_ACTIONS.MERGE }
  | { type: GAME_ACTIONS.ADD_RANDOM_TILE }
  | { type: GAME_ACTIONS.COMPUTE }
  | { type: GAME_ACTIONS.RESTART }
  | { type: GAME_ACTIONS.PLAY_AFTER_WIN };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GAME_ACTIONS.INIT_TILES:
      return { ...state, status: GameStatus.Active, grid: Grid.create(state.grid.size, state.initTileCount) };
    case GAME_ACTIONS.MOVE:
      if (!state.allowedMoves.includes(action.payload)) {
        return state;
      }

      return { ...state, status: GameStatus.Moving, grid: state.grid.clone().move(action.payload) };
    case GAME_ACTIONS.MERGE:
      return { ...state, status: GameStatus.Merging, grid: state.grid.clone().merge() };
    case GAME_ACTIONS.ADD_RANDOM_TILE:
      return { ...state, status: GameStatus.Adding, grid: state.grid.clone().addRandomTile() };
    case GAME_ACTIONS.COMPUTE:
      let status = GameStatus.Active;
      const allowedMoves = state.grid.computeAllowedMoves();

      if (!allowedMoves.length) {
        status = GameStatus.Defeat;
      } else if (!state.isPlayAfterWin && state.grid.isWin(state.minTileToWin)) {
        status = GameStatus.Victory;
      }

      return { ...state, status, allowedMoves };
    case GAME_ACTIONS.RESTART:
      return {
        ...state,
        status: GameStatus.Active,
        isPlayAfterWin: false,
        score: 0,
        grid: Grid.create(state.grid.size, state.initTileCount),
        allowedMoves: DEFAULT_ALLOWED_MOVES,
      };
    case GAME_ACTIONS.PLAY_AFTER_WIN:
      return { ...state, status: GameStatus.Active, isPlayAfterWin: true };
    default:
      return state;
  }
}
