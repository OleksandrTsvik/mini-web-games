import { getRandomElement } from '@/shared/lib/random.utils';
import { isNonNullable } from '@/shared/lib/type-guards';

import { GameMove, GameSize } from '../game.types';

import { Tile } from './tile';

export class Grid {
  public tiles: Tile[];
  public size: GameSize;

  constructor(tiles: Tile[]) {
    this.tiles = tiles;
    this.size = Math.sqrt(tiles.length) as GameSize;
  }

  public static create(size: GameSize, randomTileCount: number = 0): Grid {
    const tiles = Array.from({ length: size * size }, (_, i) => Tile.createEmpty(i, size));
    const grid = new Grid(tiles);

    for (let i = 0; i < randomTileCount; i++) {
      grid.addRandomTile();
    }

    return grid;
  }

  public addRandomTile(): Grid {
    this.getRandomEmptyTile().setRandomValue();

    return this;
  }

  public getRandomEmptyTile(): Tile {
    const emptyTiles = this.tiles.filter((tile) => tile.isEmpty());

    return getRandomElement(emptyTiles);
  }

  public move(type: GameMove): Grid {
    switch (type) {
      case GameMove.UP:
        this.moveTiles(this.groupTilesByColumn());
        break;
      case GameMove.DOWN:
        this.moveTiles(this.groupTilesByReversedColumn());
        break;
      case GameMove.LEFT:
        this.moveTiles(this.groupTilesByRow());
        break;
      case GameMove.RIGHT:
        this.moveTiles(this.groupTilesByReversedRow());
        break;
    }

    return this;
  }

  public merge(): Grid {
    this.tiles.forEach((tile) => tile.merge());

    return this;
  }

  public computeAllowedMoves(): GameMove[] {
    const allowedMoves: GameMove[] = [];

    if (this.canMoveTiles(this.groupTilesByColumn())) {
      allowedMoves.push(GameMove.UP);
    }

    if (this.canMoveTiles(this.groupTilesByReversedColumn())) {
      allowedMoves.push(GameMove.DOWN);
    }

    if (this.canMoveTiles(this.groupTilesByRow())) {
      allowedMoves.push(GameMove.LEFT);
    }

    if (this.canMoveTiles(this.groupTilesByReversedRow())) {
      allowedMoves.push(GameMove.RIGHT);
    }

    return allowedMoves;
  }

  public isWin(minTileToWin: number): boolean {
    return this.tiles.some((tile) => isNonNullable(tile.value) && tile.value >= minTileToWin);
  }

  private moveTiles(groupedTiles: Tile[][]): void {
    groupedTiles.forEach((group) => this.moveTilesInGroup(group));
  }

  private moveTilesInGroup(group: Tile[]): void {
    for (let i = 1; i < group.length; i++) {
      if (group[i].isEmpty() || group[i].willBeMerged) {
        continue;
      }

      const currnetTile = group[i];

      let j = i - 1;
      let freeTile: Tile | null = null;

      while (j >= 0 && group[j].free(currnetTile)) {
        freeTile = group[j];
        j--;
      }

      if (!freeTile) {
        continue;
      }

      if (freeTile.isEmpty() || freeTile.willBeMerged) {
        currnetTile.swapCoordinates(freeTile);
        [group[i], group[j + 1]] = [group[j + 1], group[i]];
      } else {
        currnetTile.setMergeTarget(freeTile);
        [group[i], group[i - 1]] = [group[i - 1], group[i]];
      }
    }
  }

  private canMoveTiles(groupedTiles: Tile[][]): boolean {
    return groupedTiles.some((group) => this.canMoveTilesInGroup(group));
  }

  private canMoveTilesInGroup(group: Tile[]): boolean {
    return group.some((tile, index) => {
      if (index === 0) {
        return false;
      }

      if (tile.isEmpty()) {
        return false;
      }

      return group[index - 1].free(tile);
    });
  }

  private groupTilesByColumn(): Tile[][] {
    return this.tiles.reduce<Tile[][]>((groupedTiles, tile) => {
      groupedTiles[tile.x] = groupedTiles[tile.x] ?? [];
      groupedTiles[tile.x][tile.y] = tile;

      return groupedTiles;
    }, []);
  }

  private groupTilesByReversedColumn(): Tile[][] {
    return this.groupTilesByColumn().map((column) => column.reverse());
  }

  private groupTilesByRow(): Tile[][] {
    return this.tiles.reduce<Tile[][]>((groupedTiles, tile) => {
      groupedTiles[tile.y] = groupedTiles[tile.y] ?? [];
      groupedTiles[tile.y][tile.x] = tile;

      return groupedTiles;
    }, []);
  }

  private groupTilesByReversedRow(): Tile[][] {
    return this.groupTilesByRow().map((column) => column.reverse());
  }

  public clone(): Grid {
    return new Grid([...this.tiles]);
  }
}
