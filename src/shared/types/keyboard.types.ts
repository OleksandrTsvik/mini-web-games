export const KEYBOARD_EVENT_CODE = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  W: 'KeyW',
  S: 'KeyS',
  A: 'KeyA',
  D: 'KeyD',
  R: 'KeyR',
  NUMPAD_8: 'Numpad8',
  NUMPAD_2: 'Numpad2',
  NUMPAD_4: 'Numpad4',
  NUMPAD_6: 'Numpad6',
} as const;

export type KeyboardEventCode = (typeof KEYBOARD_EVENT_CODE)[keyof typeof KEYBOARD_EVENT_CODE];
