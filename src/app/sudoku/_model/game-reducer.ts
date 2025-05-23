import { isNonNullable, isNone } from '@/shared/lib/type-guards';

import { DEFAULT_DIFFICULTY, GRID_SIZE, SUDOKU_NUMBERS } from '../game.constants';
import { GameMove, InitGamePayload } from '../game.types';

import { Grid } from './grid';

type GameState = {
  difficulty: number;
  isWin: boolean;
  grid: Grid;
  selectedCellIndex: number | null;
};

type InitGameStateArgument = {
  difficulty?: number;
};

export function initGameState({ difficulty = DEFAULT_DIFFICULTY }: InitGameStateArgument): GameState {
  return {
    difficulty,
    isWin: false,
    grid: Grid.createEmpty(GRID_SIZE),
    selectedCellIndex: null,
  };
}

export const enum GAME_ACTIONS {
  INIT_GAME,
  CHANGE_DIFFICULTY,
  SELECT_CELL,
  CHANGE_CELL_VALUE,
  REMOVE_CELL_VALUE,
  RESET,
  RESTART,
}

type GameAction =
  | { type: GAME_ACTIONS.INIT_GAME; payload?: InitGamePayload }
  | { type: GAME_ACTIONS.CHANGE_DIFFICULTY; payload: number }
  | { type: GAME_ACTIONS.SELECT_CELL; payload?: { index?: number; move?: GameMove } }
  | { type: GAME_ACTIONS.CHANGE_CELL_VALUE; payload: number }
  | { type: GAME_ACTIONS.REMOVE_CELL_VALUE }
  | { type: GAME_ACTIONS.RESET }
  | { type: GAME_ACTIONS.RESTART };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GAME_ACTIONS.INIT_GAME: {
      const difficulty = updateDifficulty(state, action.payload?.difficulty);
      const grid = updateGrid(state, action.payload?.grid, difficulty);
      const isWin = updateIsWin(grid);

      return { ...state, difficulty, isWin, grid };
    }
    case GAME_ACTIONS.CHANGE_DIFFICULTY: {
      const difficulty = updateDifficulty(state, action.payload);
      const grid = updateGrid(state, null, difficulty);

      return { ...state, difficulty, isWin: false, grid };
    }
    case GAME_ACTIONS.SELECT_CELL: {
      const selectedCellIndex = updateSelectedCellIndex(state, action.payload?.index, action.payload?.move);

      if (!canSelectCell(state, selectedCellIndex)) {
        return state;
      }

      return { ...state, grid: state.grid.clone().selectCell(selectedCellIndex), selectedCellIndex };
    }
    case GAME_ACTIONS.CHANGE_CELL_VALUE: {
      if (!canChangeCellValue(state, action.payload)) {
        return state;
      }

      const grid = state.grid.clone().changeCellValue(state.selectedCellIndex!, action.payload);
      const isWin = updateIsWin(grid);

      return { ...state, isWin, grid };
    }
    case GAME_ACTIONS.REMOVE_CELL_VALUE: {
      if (!canRemoveCellValue(state)) {
        return state;
      }

      return { ...state, grid: state.grid.clone().removeCellValue(state.selectedCellIndex!) };
    }
    case GAME_ACTIONS.RESET: {
      return { ...state, isWin: false, grid: state.grid.clone().reset(), selectedCellIndex: null };
    }
    case GAME_ACTIONS.RESTART: {
      return { ...state, isWin: false, grid: updateGrid(state), selectedCellIndex: null };
    }
    default: {
      return state;
    }
  }
}

function updateSelectedCellIndex(state: GameState, index?: number, move?: GameMove): number | null {
  if (isNonNullable(index)) {
    return index;
  }

  if (isNone(move)) {
    return null;
  }

  if (isNone(state.selectedCellIndex)) {
    return 0;
  }

  switch (move) {
    case GameMove.UP:
      return state.selectedCellIndex - state.grid.size;
    case GameMove.DOWN:
      return state.selectedCellIndex + state.grid.size;
    case GameMove.LEFT:
      return state.selectedCellIndex - 1;
    case GameMove.RIGHT:
      return state.selectedCellIndex + 1;
  }
}

function updateDifficulty(state: GameState, difficulty: number | undefined): number {
  if (isNone(difficulty) || difficulty <= 0 || difficulty >= state.grid.cells.length) {
    return state.difficulty;
  }

  return difficulty;
}

function updateGrid(state: GameState, grid?: Grid | null, difficulty?: number): Grid {
  if (isNone(grid) || grid.cells.length !== state.grid.cells.length) {
    return Grid.create(state.grid.size, difficulty ?? state.difficulty);
  }

  return grid;
}

function updateIsWin(grid: Grid): boolean {
  const isWin = grid.isWin();

  if (isWin) {
    grid.applyVictoryStatus();
  }

  return isWin;
}

function canSelectCell(state: GameState, index: number | null): boolean {
  if (state.isWin || index === state.selectedCellIndex) {
    return false;
  }

  if (isNone(index)) {
    return true;
  }

  return index >= 0 && index < state.grid.cells.length;
}

function canChangeCellValue(state: GameState, value: number): boolean {
  return (
    !state.isWin &&
    SUDOKU_NUMBERS.includes(value) &&
    isNonNullable(state.selectedCellIndex) &&
    !state.grid.cells[state.selectedCellIndex].isInit &&
    state.grid.cells[state.selectedCellIndex].value !== value
  );
}

function canRemoveCellValue(state: GameState): boolean {
  return (
    !state.isWin &&
    isNonNullable(state.selectedCellIndex) &&
    !state.grid.cells[state.selectedCellIndex].isInit &&
    isNonNullable(state.grid.cells[state.selectedCellIndex].value)
  );
}
