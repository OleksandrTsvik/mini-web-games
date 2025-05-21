import { arrayRange } from '@/shared/lib/array.utils';
import { getRandomElement } from '@/shared/lib/random.utils';
import { isNonNullable, isNone } from '@/shared/lib/type-guards';

import { BOX_SIZE } from '../game.constants';
import { Cell, CellStatus } from '../game.types';

import { getRandomNumbers } from './utils';

export class Grid {
  public cells: Cell[];
  public size: number;

  constructor(cells: Cell[]) {
    this.cells = cells;
    this.size = Math.sqrt(cells.length);
  }

  public static createEmpty(size: number): Grid {
    const cells = Array.from({ length: size * size }, () => ({ value: null, isInit: true, status: null }));
    const grid = new Grid(cells);

    return grid;
  }

  public static create(size: number, difficulty: number): Grid {
    const grid = Grid.createEmpty(size);

    grid.applyRandomValues();
    grid.applyDifficulty(difficulty);

    return grid;
  }

  public selectCell(index: number | null): Grid {
    if (isNone(index)) {
      this.cells.forEach((cell) => (cell.status = null));
      return this;
    }

    const selectedCell = this.cells[index];

    const rowIndexes = this.getRowIndexes(index);
    const columnIndexes = this.getColumnIndexes(index);
    const boxIndexes = this.getBoxIndexes(index);

    for (let i = 0; i < this.cells.length; i++) {
      if (i === index) {
        this.cells[i].status = CellStatus.Selected;
      } else if (
        !selectedCell.isInit &&
        (rowIndexes.includes(i) || columnIndexes.includes(i) || boxIndexes.includes(i))
      ) {
        this.cells[i].status = CellStatus.Highlighted;
      } else if (isNonNullable(this.cells[i].value) && this.cells[i].value === selectedCell.value) {
        this.cells[i].status = CellStatus.Same;
      } else {
        this.cells[i].status = null;
      }
    }

    return this;
  }

  public changeCellValue(index: number, value: number): Grid {
    const rowIndexes = this.getRowIndexes(index);
    const columnIndexes = this.getColumnIndexes(index);
    const boxIndexes = this.getBoxIndexes(index);

    const activeIndexes = [...rowIndexes, ...columnIndexes, ...boxIndexes];

    for (const i of activeIndexes) {
      if (i === index) {
        continue;
      }

      if (this.cells[i].value === value) {
        this.cells[i].status = CellStatus.Wrong;
      } else {
        this.cells[i].status = CellStatus.Highlighted;
      }
    }

    if (activeIndexes.every((i) => this.cells[i].value !== value)) {
      this.cells[index].value = value;

      this.cells.forEach((cell, i) => {
        if (i === index) {
          return;
        } else if (cell.status === CellStatus.Same) {
          cell.status = null;
        } else if (cell.value === value) {
          cell.status = CellStatus.Same;
        }
      });
    }

    return this;
  }

  public removeCellValue(index: number): Grid {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].status === CellStatus.Wrong) {
        this.cells[i].status = CellStatus.Highlighted;
      } else if (this.cells[i].status === CellStatus.Same) {
        this.cells[i].status = null;
      }
    }

    this.cells[index].value = null;

    return this;
  }

  public isWin(): boolean {
    return this.cells.every((cell) => isNonNullable(cell.value));
  }

  public applyVictoryStatus(): void {
    for (const cell of this.cells) {
      cell.status = CellStatus.Victory;
    }
  }

  public getRowIndexes(index: number): number[] {
    const start = Math.floor(index / this.size) * this.size;
    const stop = start + this.size - 1;

    return arrayRange(start, stop);
  }

  public getColumnIndexes(index: number): number[] {
    const start = index % this.size;
    const stop = start + (this.size - 1) * this.size;

    return arrayRange(start, stop, this.size);
  }

  public getBoxIndexes(index: number): number[] {
    const indexes: number[] = [];

    const row = Math.floor(index / this.size);
    const column = index % this.size;

    const firstRowInBox = row - (row % BOX_SIZE);
    const firstColumnInBox = column - (column % BOX_SIZE);

    const startIndex = firstRowInBox * this.size + firstColumnInBox;

    for (let i = 0; i < BOX_SIZE; i++) {
      const start = startIndex + this.size * i;
      const stop = start + BOX_SIZE - 1;

      indexes.push(...arrayRange(start, stop));
    }

    return indexes;
  }

  public findEmptyCellIndex(): number {
    return this.cells.findIndex((cell) => isNone(cell.value));
  }

  private applyRandomValues(): boolean {
    const emptyCellIndex = this.findEmptyCellIndex();

    if (emptyCellIndex < 0) {
      return true;
    }

    const randomNumbers = getRandomNumbers();

    for (const number of randomNumbers) {
      if (!this.validate(emptyCellIndex, number)) {
        continue;
      }

      this.cells[emptyCellIndex].value = number;

      if (this.applyRandomValues()) {
        return true;
      }

      this.cells[emptyCellIndex].value = null;
    }

    return false;
  }

  private applyDifficulty(difficulty: number): void {
    let clearCellCount = 0;

    while (clearCellCount < difficulty) {
      const cell = getRandomElement(this.cells);

      if (isNone(cell.value)) {
        continue;
      }

      cell.value = null;
      cell.isInit = false;

      clearCellCount++;
    }
  }

  private validate(index: number, value: number): boolean {
    return (
      this.validateIndexes(this.getRowIndexes(index), index, value) &&
      this.validateIndexes(this.getColumnIndexes(index), index, value) &&
      this.validateIndexes(this.getBoxIndexes(index), index, value)
    );
  }

  private validateIndexes(indexes: number[], index: number, value: number): boolean {
    return indexes.every((i) => this.cells[i].value !== value || i === index);
  }

  public clone(): Grid {
    return new Grid([...this.cells]);
  }
}
