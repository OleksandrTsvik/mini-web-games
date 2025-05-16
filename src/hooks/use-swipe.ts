import { useEffect, useRef } from 'react';

export type SwipeActions = {
  up?: () => void;
  down?: () => void;
  left?: () => void;
  right?: () => void;
  tap?: () => void;
};

type SwipeDevice = 'mouse' | 'touch' | 'pointer';
type SwipeEventType = 'down' | 'up';

type SwipePosition = { x: number; y: number };

const events: Record<SwipeDevice, Record<SwipeEventType, string>> = {
  mouse: { down: 'mousedown', up: 'mouseup' },
  touch: { down: 'touchstart', up: 'touchend' },
  pointer: { down: 'pointerdown', up: 'pointerup' },
};

export default function useSwipe<T extends HTMLElement = HTMLDivElement>(actions: SwipeActions) {
  const containerRef = useRef<T>(null);

  const actionsRef = useRef(actions);
  actionsRef.current = actions;

  useEffect(() => {
    const container = containerRef.current || document;

    const device = getSwipeDevice();
    const start: SwipePosition = { x: 0, y: 0 };

    const handleSwipeAction = (delta: SwipePosition) => {
      if (delta.x === 0 && delta.y === 0) {
        actionsRef.current.tap?.();
        return;
      }

      const isHorizontal = Math.abs(delta.x) > Math.abs(delta.y);

      if (isHorizontal && delta.x > 0) {
        actionsRef.current.right?.();
      } else if (isHorizontal && delta.x <= 0) {
        actionsRef.current.left?.();
      } else if (delta.y > 0) {
        actionsRef.current.down?.();
      } else {
        actionsRef.current.up?.();
      }
    };

    const downListener = (event: MouseEvent | TouchEvent | PointerEvent) => {
      event.preventDefault();
      const point = 'changedTouches' in event ? event.changedTouches[0] : event;

      start.x = point.clientX;
      start.y = point.clientY;
    };

    const upListener = (event: MouseEvent | TouchEvent | PointerEvent) => {
      event.preventDefault();
      const point = 'changedTouches' in event ? event.changedTouches[0] : event;

      const delta: SwipePosition = {
        x: point.clientX - start.x,
        y: point.clientY - start.y,
      };

      handleSwipeAction(delta);
    };

    container.addEventListener(events[device].down, downListener as EventListener, { passive: false });
    container.addEventListener(events[device].up, upListener as EventListener, { passive: false });

    return () => {
      container.removeEventListener(events[device].down, downListener as EventListener);
      container.removeEventListener(events[device].up, upListener as EventListener);
    };
  }, []);

  return containerRef;
}

function getSwipeDevice(): SwipeDevice {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    return 'touch';
  }

  if (window.PointerEvent) {
    return 'pointer';
  }

  return 'mouse';
}
