import { Grid } from './_model/grid';
import { GAME_SIZES } from './game.constants';

export type GameSize = (typeof GAME_SIZES)[number];

export const enum GameStatus {
  Active,
  Moving,
  Merging,
  Adding,
  Victory,
  Defeat,
}

export const enum GameMove {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export type InitGamePayload = {
  isPlayAfterWin: boolean;
  score: number;
  bestScore: number;
  grid: Grid | null;
};

export type StoredGameState = {
  isPlayAfterWin: boolean;
  score: number;
  bestScore: number;
  tiles: StoredTile[] | null;
};

export type StoredTile = {
  value: number | null;
  x: number;
  y: number;
};
