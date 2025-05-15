import { InitGamePayload, StoredGameState } from '../game.types';

import { Grid } from './grid';
import { Tile } from './tile';

const LOCAL_STORAGE_GAME_STATE_KEY = '2048:state';

export function saveGameState(isPlayAfterWin: boolean, score: number, bestScore: number, grid: Grid): void {
  const data: StoredGameState = { isPlayAfterWin, score, bestScore, tiles: grid.serialize() };
  const json = JSON.stringify(data);

  localStorage.setItem(LOCAL_STORAGE_GAME_STATE_KEY, json);
}

export function loadGameState(): InitGamePayload | undefined {
  const json = localStorage.getItem(LOCAL_STORAGE_GAME_STATE_KEY);

  if (!json) {
    return;
  }

  const data = JSON.parse(json) as StoredGameState;
  const tiles = data.tiles?.map((tile) => new Tile(tile.value, tile.x, tile.y));

  return {
    isPlayAfterWin: data.isPlayAfterWin,
    score: data.score,
    bestScore: data.bestScore,
    grid: tiles ? new Grid(tiles) : null,
  };
}

export function clearGameState(bestScore: number): void {
  const data: StoredGameState = { isPlayAfterWin: false, score: 0, bestScore, tiles: null };
  const json = JSON.stringify(data);

  localStorage.setItem(LOCAL_STORAGE_GAME_STATE_KEY, json);
}
