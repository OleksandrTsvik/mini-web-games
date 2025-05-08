import { useEffect, useRef } from 'react';

type EventType = 'mousedown' | 'mouseup' | 'touchstart' | 'touchend' | 'focusin' | 'focusout';

const DEFAULT_EVENTS: EventType[] = ['mousedown', 'touchstart'];

export function useClickOutside<T extends HTMLElement>(handler: () => void, events?: EventType[] | null) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: Event) => {
      const { target } = event ?? {};

      if (ref.current && target instanceof Node && !ref.current.contains(target)) {
        handler();
      }
    };

    (events || DEFAULT_EVENTS).forEach((event) => document.addEventListener(event, listener));

    return () => {
      (events || DEFAULT_EVENTS).forEach((event) => document.removeEventListener(event, listener));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, handler]);

  return ref;
}
