import { Grid } from './_model/grid';

export type Cell = {
  value: number | null;
  isInit: boolean;
  status: CellStatus | null;
};

export const enum CellStatus {
  Selected,
  Highlighted,
  Same,
  Wrong,
  Victory,
}

export const enum GameMove {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export type InitGamePayload = {
  difficulty: number;
  grid: Grid | null;
};

export type StoredGameState = {
  difficulty: number;
  cells: StoredCell[] | null;
};

export type StoredCell = {
  value: number | null;
  isInit: boolean;
};
