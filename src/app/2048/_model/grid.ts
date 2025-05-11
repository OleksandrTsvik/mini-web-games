import { getRandomElement } from '@/shared/lib/random.utils';

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
      grid.getRandomEmptyTile().setRandomValue();
    }

    return grid;
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

  private moveTiles(groupedTiles: Tile[][]): void {
    groupedTiles.forEach((group) => this.moveTilesInGroup(group));
  }

  private moveTilesInGroup(group: Tile[]): void {
    for (let i = 1; i < group.length; i++) {
      if (group[i].isEmpty()) {
        continue;
      }

      const currnetTile = group[i];

      let j = i - 1;
      let moveTo: Tile | null = null;

      while (j >= 0 && group[j].free(currnetTile)) {
        moveTo = group[j];
        j--;
      }

      if (moveTo) {
        currnetTile.merge(moveTo);
      }
    }
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
