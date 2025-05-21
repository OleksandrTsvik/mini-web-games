import { useEffect, useRef } from 'react';

import { KeyboardEventCode } from '@/shared/types';

type KeyboardEventType = 'keydown' | 'keyup';

const DEFAULT_EVENTS: KeyboardEventType[] = ['keydown'];

export function useKeyboard(handler: (key: KeyboardEventCode) => void, events?: KeyboardEventType[] | null) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      const { code } = event ?? {};

      if (code) {
        handlerRef.current(code as KeyboardEventCode);
      }
    };

    (events || DEFAULT_EVENTS).forEach((event) => document.addEventListener(event, listener));

    return () => {
      (events || DEFAULT_EVENTS).forEach((event) => document.removeEventListener(event, listener));
    };
  }, [events]);
}
