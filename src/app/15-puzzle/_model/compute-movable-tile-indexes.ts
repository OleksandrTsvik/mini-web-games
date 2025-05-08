import { GameSize } from '../game.types';

export function computeMovableTileIndexes(tiles: number[], emptyTile: number, size: GameSize): number[] {
  const movableTileIndexes: number[] = [];
  const emptyIndex = tiles.findIndex((tile) => tile === emptyTile);

  const upIndex = emptyIndex - size;
  const downIndex = emptyIndex + size;
  const leftIndex = emptyIndex - 1;
  const rightIndex = emptyIndex + 1;

  if (upIndex >= 0) {
    movableTileIndexes.push(upIndex);
  }

  if (downIndex < tiles.length) {
    movableTileIndexes.push(downIndex);
  }

  if (leftIndex >= 0 && emptyIndex % size !== 0) {
    movableTileIndexes.push(leftIndex);
  }

  if (rightIndex < tiles.length && (emptyIndex + 1) % size !== 0) {
    movableTileIndexes.push(rightIndex);
  }

  return movableTileIndexes;
}
