import { KEYBOARD_EVENT_CODE, KeyboardEventCode } from '../types';

export type GameKeyboardActions = {
  up?: () => void;
  down?: () => void;
  left?: () => void;
  right?: () => void;
  restart?: () => void;
};

export function handleGameKeyboardAction(key: KeyboardEventCode, actions: GameKeyboardActions): void {
  switch (key) {
    case KEYBOARD_EVENT_CODE.ARROW_UP:
    case KEYBOARD_EVENT_CODE.W:
    case KEYBOARD_EVENT_CODE.NUMPAD_8:
      actions.up?.();
      break;
    case KEYBOARD_EVENT_CODE.ARROW_DOWN:
    case KEYBOARD_EVENT_CODE.S:
    case KEYBOARD_EVENT_CODE.NUMPAD_2:
      actions.down?.();
      break;
    case KEYBOARD_EVENT_CODE.ARROW_LEFT:
    case KEYBOARD_EVENT_CODE.A:
    case KEYBOARD_EVENT_CODE.NUMPAD_4:
      actions.left?.();
      break;
    case KEYBOARD_EVENT_CODE.ARROW_RIGHT:
    case KEYBOARD_EVENT_CODE.D:
    case KEYBOARD_EVENT_CODE.NUMPAD_6:
      actions.right?.();
      break;
    case KEYBOARD_EVENT_CODE.R:
      actions.restart?.();
      break;
  }
}
