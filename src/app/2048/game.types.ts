import { GAME_SIZES } from './game.constants';

export type GameSize = (typeof GAME_SIZES)[number];

export const enum GameMove {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}
