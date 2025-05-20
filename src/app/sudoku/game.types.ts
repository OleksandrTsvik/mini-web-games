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
}

export const enum GameMove {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}
