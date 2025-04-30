import { Nullable } from '@/shared/types';

export enum Player {
  X,
  O,
}

export type SquareState = Nullable<Player>;

export type BotFunc = (board: SquareState[], player: Player) => number;
