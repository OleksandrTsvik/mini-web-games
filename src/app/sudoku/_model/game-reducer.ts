import { DEFAULT_DIFFICULTY, GRID_SIZE } from '../game.constants';

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
}

type GameAction = { type: GAME_ACTIONS.INIT_GAME } | { type: GAME_ACTIONS.SELECT_CELL; payload: number };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GAME_ACTIONS.INIT_GAME:
      const difficulty = state.difficulty;
      const grid = Grid.create(GRID_SIZE, difficulty);

      return { ...state, difficulty, grid };
    case GAME_ACTIONS.SELECT_CELL:
      if (action.payload < 0 || action.payload >= state.grid.cells.length) {
        return state;
      }

      return { ...state, grid: state.grid.clone().selectCell(action.payload), selectedCellIndex: action.payload };
    default:
      return state;
  }
}
