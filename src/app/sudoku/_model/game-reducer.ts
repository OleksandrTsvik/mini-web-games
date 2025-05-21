import { isNonNullable, isNone } from '@/shared/lib/type-guards';

import { DEFAULT_DIFFICULTY, GRID_SIZE, SUDOKU_NUMBERS } from '../game.constants';
import { GameMove } from '../game.types';

import { Grid } from './grid';

type GameState = {
  difficulty: number;
  grid: Grid;
  selectedCellIndex: number | null;
};

type InitGameStateArgument = {
  difficulty?: number;
};

export function initGameState({ difficulty = DEFAULT_DIFFICULTY }: InitGameStateArgument): GameState {
  return {
    difficulty,
    grid: Grid.createEmpty(GRID_SIZE),
    selectedCellIndex: null,
  };
}

export const enum GAME_ACTIONS {
  INIT_GAME,
  SELECT_CELL,
  CHANGE_CELL_VALUE,
  REMOVE_CELL_VALUE,
}

type GameAction =
  | { type: GAME_ACTIONS.INIT_GAME }
  | { type: GAME_ACTIONS.SELECT_CELL; payload?: { index?: number; move?: GameMove } }
  | { type: GAME_ACTIONS.CHANGE_CELL_VALUE; payload: number }
  | { type: GAME_ACTIONS.REMOVE_CELL_VALUE };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GAME_ACTIONS.INIT_GAME:
      const difficulty = state.difficulty;
      const grid = Grid.create(GRID_SIZE, difficulty);

      return { ...state, difficulty, grid };
    case GAME_ACTIONS.SELECT_CELL:
      const selectedCellIndex = updateSelectedCellIndex(state, action.payload?.index, action.payload?.move);

      if (!canSelectCell(state, selectedCellIndex)) {
        return state;
      }

      return { ...state, grid: state.grid.clone().selectCell(selectedCellIndex), selectedCellIndex };
    case GAME_ACTIONS.CHANGE_CELL_VALUE:
      if (!canChangeCellValue(state, action.payload)) {
        return state;
      }

      return { ...state, grid: state.grid.clone().changeCellValue(state.selectedCellIndex!, action.payload) };
    case GAME_ACTIONS.REMOVE_CELL_VALUE:
      if (!canRemoveCellValue(state)) {
        return state;
      }

      return { ...state, grid: state.grid.clone().removeCellValue(state.selectedCellIndex!) };
    default:
      return state;
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

function canSelectCell(state: GameState, index: number | null): boolean {
  if (index === state.selectedCellIndex) {
    return false;
  }

  if (isNone(index)) {
    return true;
  }

  return index >= 0 && index < state.grid.cells.length;
}

function canChangeCellValue(state: GameState, value: number): boolean {
  return (
    SUDOKU_NUMBERS.includes(value) &&
    isNonNullable(state.selectedCellIndex) &&
    !state.grid.cells[state.selectedCellIndex].isInit &&
    state.grid.cells[state.selectedCellIndex].value !== value
  );
}

function canRemoveCellValue(state: GameState): boolean {
  return (
    isNonNullable(state.selectedCellIndex) &&
    !state.grid.cells[state.selectedCellIndex].isInit &&
    isNonNullable(state.grid.cells[state.selectedCellIndex].value)
  );
}
