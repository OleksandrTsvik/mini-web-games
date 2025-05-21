import { useEffect, useRef } from 'react';

type EventType = 'mousedown' | 'mouseup' | 'touchstart' | 'touchend' | 'focusin' | 'focusout';

const DEFAULT_EVENTS: EventType[] = ['mousedown', 'touchstart'];

export function useClickOutside<T extends HTMLElement = HTMLDivElement>(
  handler: () => void,
  events?: EventType[] | null,
) {
  const ref = useRef<T>(null);

  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (event: Event) => {
      const { target } = event ?? {};

      if (ref.current && target instanceof Node && !ref.current.contains(target)) {
        handlerRef.current();
      }
    };

    (events || DEFAULT_EVENTS).forEach((event) => document.addEventListener(event, listener));

    return () => {
      (events || DEFAULT_EVENTS).forEach((event) => document.removeEventListener(event, listener));
    };
  }, [events]);

  return ref;
}
