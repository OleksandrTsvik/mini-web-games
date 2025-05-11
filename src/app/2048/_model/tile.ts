import { isNone } from '@/shared/lib/type-guards';

import { GameSize } from '../game.types';

export class Tile {
  public value: number | null;
  public x: number;
  public y: number;
  private moveTo?: Tile;

  constructor(value: number | null, x: number, y: number, moveTo?: Tile) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.moveTo = moveTo;
  }

  public static createEmpty(index: number, gridSize: GameSize): Tile {
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);

    return new Tile(null, x, y);
  }

  public isEmpty(): boolean {
    return isNone(this.value);
  }

  public hasMerge(): boolean {
    return isNone(this.moveTo);
  }

  public free(tile: Tile): boolean {
    return this.isEmpty() || (!this.hasMerge() && this.value === tile.value);
  }

  public setRandomValue(): void {
    this.value = Math.random() < 0.9 ? 2 : 4;
  }

  public merge(tile: Tile): void {
    this.moveTo = tile;
  }

  public clone(): Tile {
    return new Tile(this.value, this.x, this.y, this.moveTo);
  }
}
