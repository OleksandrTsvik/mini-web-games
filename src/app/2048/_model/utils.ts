import { isNone } from '@/shared/lib/type-guards';

import { Tile } from '../game.types';

export function generateTile() {
  return Math.random() < 0.9 ? 2 : 4;
}

export function emptyTileIndexes(tiles: Tile[]): number[] {
  return tiles.reduce<number[]>((indexes, tile, index) => (isNone(tile) ? indexes.concat(index) : indexes), []);
}
