import { useLayoutEffect, useState } from 'react';

import { shuffle } from '@/shared/lib/random.utils';

function initTiles(length: number): number[] {
  return Array(length).fill(length);
}

export function useGameState(length: number = 16) {
  const [tiles, setTiles] = useState(() => initTiles(length));

  const size = tiles ? Math.sqrt(tiles.length) : 0;

  useLayoutEffect(() => {
    setTiles(shuffle(Array.from({ length }, (_, index) => index + 1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShuffle = () => {
    setTiles(shuffle(tiles));
  };

  return { size, tiles, handleShuffle };
}
