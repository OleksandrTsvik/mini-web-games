import {
  DEFAULT_ALLOWED_MOVES,
  DEFAULT_GRID_SIZE,
  DEFAULT_INIT_TILE_COUNT,
  DEFAULT_MIN_TILE_TO_WIN,
} from '../game.constants';
import { GameMove, GameSize, GameStatus, InitGamePayload } from '../game.types';

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
  INIT_GAME,
  MOVE,
  MERGE,
  ADD_RANDOM_TILE,
  COMPUTE,
  RESTART,
  PLAY_AFTER_WIN,
}

type GameAction =
  | { type: GAME_ACTIONS.INIT_GAME; payload?: InitGamePayload }
  | { type: GAME_ACTIONS.MOVE; payload: GameMove }
  | { type: GAME_ACTIONS.MERGE }
  | { type: GAME_ACTIONS.ADD_RANDOM_TILE }
  | { type: GAME_ACTIONS.COMPUTE }
  | { type: GAME_ACTIONS.RESTART }
  | { type: GAME_ACTIONS.PLAY_AFTER_WIN };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GAME_ACTIONS.INIT_GAME: {
      const isPlayAfterWin = action.payload?.isPlayAfterWin ?? state.isPlayAfterWin;
      const score = action.payload?.score ?? state.score;
      const bestScore = action.payload?.bestScore ?? state.bestScore;

      const grid = action.payload?.grid ?? Grid.create(state.grid.size, state.initTileCount);
      const allowedMoves = grid.computeAllowedMoves();
      const status = updateStatus(allowedMoves, grid, isPlayAfterWin, state.minTileToWin);

      return { ...state, status, isPlayAfterWin, score, bestScore, grid, allowedMoves };
    }
    case GAME_ACTIONS.MOVE: {
      if (!canMove(state, action.payload)) {
        return state;
      }

      return { ...state, status: GameStatus.Moving, grid: state.grid.clone().move(action.payload) };
    }
    case GAME_ACTIONS.MERGE: {
      const grid = state.grid.clone();
      const score = state.score + grid.merge();
      const bestScore = Math.max(state.bestScore, score);

      return { ...state, status: GameStatus.Merging, score, bestScore, grid };
    }
    case GAME_ACTIONS.ADD_RANDOM_TILE: {
      return { ...state, status: GameStatus.Adding, grid: state.grid.clone().addRandomTile() };
    }
    case GAME_ACTIONS.COMPUTE: {
      const allowedMoves = state.grid.computeAllowedMoves();
      const status = updateStatus(allowedMoves, state.grid, state.isPlayAfterWin, state.minTileToWin);

      return { ...state, status, allowedMoves };
    }
    case GAME_ACTIONS.RESTART: {
      if (!canRestart(state)) {
        return state;
      }

      return {
        ...state,
        status: GameStatus.Active,
        isPlayAfterWin: false,
        score: 0,
        grid: Grid.create(state.grid.size, state.initTileCount),
        allowedMoves: DEFAULT_ALLOWED_MOVES,
      };
    }
    case GAME_ACTIONS.PLAY_AFTER_WIN: {
      return { ...state, status: GameStatus.Active, isPlayAfterWin: true };
    }
    default: {
      return state;
    }
  }
}

function updateStatus(allowedMoves: GameMove[], grid: Grid, isPlayAfterWin: boolean, minTileToWin: number): GameStatus {
  let status = GameStatus.Active;

  if (!allowedMoves.length) {
    status = GameStatus.Defeat;
  } else if (!isPlayAfterWin && grid.isWin(minTileToWin)) {
    status = GameStatus.Victory;
  }

  return status;
}

function canMove(state: GameState, move: GameMove): boolean {
  return state.status === GameStatus.Active && state.allowedMoves.includes(move);
}

function canRestart(state: GameState): boolean {
  return (
    state.status === GameStatus.Active || state.status === GameStatus.Victory || state.status === GameStatus.Defeat
  );
}
