import { Cell, InitGamePayload, StoredGameState } from '../game.types';

import { Grid } from './grid';

const LOCAL_STORAGE_GAME_STATE_KEY = 'sudoku:state';

export function saveGameState(difficulty: number, grid: Grid): void {
  const cells = grid.cells.map((cell) => ({ value: cell.value, isInit: cell.isInit }));

  const data: StoredGameState = { difficulty, cells };
  const json = JSON.stringify(data);

  localStorage.setItem(LOCAL_STORAGE_GAME_STATE_KEY, json);
}

export function loadGameState(): InitGamePayload | undefined {
  const json = localStorage.getItem(LOCAL_STORAGE_GAME_STATE_KEY);

  if (!json) {
    return;
  }

  const data = JSON.parse(json) as StoredGameState;
  const cells = data.cells?.map<Cell>((cell) => ({ value: cell.value, isInit: cell.isInit, status: null }));

  return {
    difficulty: data.difficulty,
    grid: cells ? new Grid(cells) : null,
  };
}
