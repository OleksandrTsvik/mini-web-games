import { isNonNullable } from '@/shared/lib/type-guards';

import { getNextPlayer } from '../_lib/utils';
import { Player } from '../game.types';

export const INIT_GAME_STATE = {
  humanPlayer: Player.X,
  currentPlayer: Player.X,
  squares: Array(9).fill(null),
};

type GameState = typeof INIT_GAME_STATE;

export const enum GAME_ACTIONS {
  MOVE,
  SET_HUMAN_PLAYER,
  RESTART,
}

type GameAction =
  | { type: GAME_ACTIONS.MOVE; payload: { index: number } }
  | { type: GAME_ACTIONS.SET_HUMAN_PLAYER; payload: Player }
  | { type: GAME_ACTIONS.RESTART };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GAME_ACTIONS.MOVE:
      const { index } = action.payload;

      if (isNonNullable(state.squares[index])) {
        return state;
      }

      return {
        ...state,
        squares: state.squares.map((square, i) => (i === index ? state.currentPlayer : square)),
        currentPlayer: getNextPlayer(state.currentPlayer),
      };
    case GAME_ACTIONS.SET_HUMAN_PLAYER:
      return { ...INIT_GAME_STATE, humanPlayer: action.payload };
    case GAME_ACTIONS.RESTART:
      return { ...INIT_GAME_STATE, humanPlayer: state.humanPlayer };
    default:
      return state;
  }
}
