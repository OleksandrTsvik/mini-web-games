import { Nullable } from '@/shared/types';

import { BOT_LEVEL } from './game.constants';

export enum Player {
  X,
  O,
}

export type SquareState = Nullable<Player>;

export type BotLevel = (typeof BOT_LEVEL)[keyof typeof BOT_LEVEL];

export type BotFunc = (board: SquareState[], botPlayer: Player) => number;
