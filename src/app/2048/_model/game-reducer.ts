import { getRandomElement } from '@/shared/lib/random.utils';

import { GameSize, Tile } from '../game.types';

import { emptyTileIndexes, generateTile } from './utils';

type GameState = {
  score: number;
  bestScore: number;
  tiles: Tile[];
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
    tiles: Array(size * size).fill(null),
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
  | { type: GAME_ACTIONS.MOVE; payload: number }
  | { type: GAME_ACTIONS.RESTART };

export function gameReducer(state: GameState, action: GameAction): GameState {
  const size = Math.sqrt(state.tiles.length);

  switch (action.type) {
    case GAME_ACTIONS.INIT_TILES:
      return { ...state, tiles: initTiles(size, state.initTileCount) };
    case GAME_ACTIONS.MOVE:
      return state;
    case GAME_ACTIONS.RESTART:
      return { ...state, score: 0, tiles: initTiles(size, state.initTileCount) };
    default:
      return state;
  }
}

export function initTiles(size: number, tileCount: number): Tile[] {
  const tiles = Array(size * size).fill(null);

  for (let i = 0; i < tileCount; i++) {
    const randomIndex = getRandomElement(emptyTileIndexes(tiles));
    tiles[randomIndex] = generateTile();
  }

  return tiles;
}
