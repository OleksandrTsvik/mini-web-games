import { isNonNullable, isNone } from '@/shared/lib/type-guards';

import { GameSize } from '../game.types';

export class Tile {
  public value: number | null;
  public x: number;
  public y: number;

  private _willBeMerged: boolean;
  private _mergeTarget: Tile | null;
  private _originalX: number;
  private _originalY: number;

  constructor(value: number | null, x: number, y: number, mergeTarget: Tile | null = null) {
    this.value = value;
    this.x = x;
    this.y = y;

    this._willBeMerged = false;
    this._mergeTarget = mergeTarget;
    this._originalX = x;
    this._originalY = y;
  }

  public static createEmpty(index: number, gridSize: GameSize): Tile {
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);

    return new Tile(null, x, y);
  }

  public get willBeMerged(): boolean {
    return this._willBeMerged;
  }

  public isEmpty(): boolean {
    return isNone(this.value);
  }

  public hasMerge(): boolean {
    return isNonNullable(this._mergeTarget);
  }

  public free(tile: Tile): boolean {
    return this.isEmpty() || this.willBeMerged || (!this.hasMerge() && this.value === tile.value);
  }

  public setRandomValue(): void {
    this.value = Math.random() < 0.9 ? 2 : 4;
  }

  public setCoordinates(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public swapCoordinates(tile: Tile): void {
    if (tile.willBeMerged) {
      [this.x, tile._originalX] = [tile._originalX, this.x];
      [this.y, tile._originalY] = [tile._originalY, this.y];

      this._originalX = this.x;
      this._originalY = this.y;
    } else {
      [this.x, tile.x] = [tile.x, this.x];
      [this.y, tile.y] = [tile.y, this.y];

      this.swapOriginalCoordinates(tile);
    }
  }

  public setMergeTarget(tile: Tile): void {
    this._mergeTarget = tile;
    tile.markForMerge();
    this.setCoordinates(tile.x, tile.y);
    this.swapOriginalCoordinates(tile);
  }

  public merge(): number {
    let score = 0;

    if (!this._mergeTarget) {
      return score;
    }

    if (isNone(this.value)) {
      this.value = this._mergeTarget.value;
    } else if (isNonNullable(this._mergeTarget.value)) {
      this.value += this._mergeTarget.value;
      score = this.value;
    }

    this._mergeTarget.value = null;
    this._mergeTarget.revertToOriginalCoordinates();
    this._mergeTarget.unmarkForMerge();
    this._mergeTarget = null;

    return score;
  }

  public clone(): Tile {
    return new Tile(this.value, this.x, this.y, this._mergeTarget);
  }

  private markForMerge(): void {
    this._willBeMerged = true;
  }

  private unmarkForMerge(): void {
    this._willBeMerged = false;
  }

  private swapOriginalCoordinates(tile: Tile): void {
    [this._originalX, tile._originalX] = [tile._originalX, this._originalX];
    [this._originalY, tile._originalY] = [tile._originalY, this._originalY];
  }

  private revertToOriginalCoordinates(): void {
    this.x = this._originalX;
    this.y = this._originalY;
  }
}
