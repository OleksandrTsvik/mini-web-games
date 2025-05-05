import { Nullable } from '@/shared/types';

export enum Player {
  X,
  O,
}

export type SquareState = Nullable<Player>;

export type BotLevel = 'easy' | 'normal' | 'hard';

export type BotFunc = (board: SquareState[], botPlayer: Player) => number;
