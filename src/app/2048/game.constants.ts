import { GameMove, GameSize } from './game.types';

export const DEFAULT_GRID_SIZE: GameSize = 4;
export const DEFAULT_INIT_TILE_COUNT = 2;
export const DEFAULT_ALLOWED_MOVES: GameMove[] = [GameMove.UP, GameMove.DOWN, GameMove.LEFT, GameMove.RIGHT];
export const DEFAULT_MIN_TILE_TO_WIN = 2048;

export const GAME_SIZES = [4] as const;

export const TILE_MOVE_DURATION_MS = 150;
export const TILE_SPAWN_DURATION_MS = 150;
