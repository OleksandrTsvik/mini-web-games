import { useLayoutEffect, useState } from 'react';

import { shuffle } from '@/shared/lib/random.utils';

import { computeMovableTileIndexes } from './compute-movable-tile-indexes';

function initTiles(length: number): number[] {
  return Array(length).fill(length);
}

export function useGameState(length: number = 16) {
  const [tiles, setTiles] = useState(() => initTiles(length));

  const size = Math.sqrt(tiles.length);
  const emptyTile = tiles.length;
  const movableTileIndexes = computeMovableTileIndexes(tiles, emptyTile, size);
  const isSolved = tiles.every((tile, index) => tile === index + 1);

  useLayoutEffect(() => {
    setTiles(shuffle(Array.from({ length }, (_, index) => index + 1)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShuffle = () => {
    setTiles(shuffle(tiles));
  };

  const handleCellClick = (index: number) => {
    if (!movableTileIndexes.includes(index)) {
      return;
    }

    const nextTiles = tiles.slice();
    const emptyIndex = nextTiles.findIndex((tile) => tile === emptyTile);

    nextTiles[emptyIndex] = nextTiles[index];
    nextTiles[index] = emptyTile;

    setTiles(nextTiles);
  };

  return { tiles, size, emptyTile, movableTileIndexes, isSolved, handleCellClick, handleShuffle };
}
