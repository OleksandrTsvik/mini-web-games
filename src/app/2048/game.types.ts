import { GAME_SIZES } from './game.constants';

export type GameSize = (typeof GAME_SIZES)[number];

export type Tile = number | null;
