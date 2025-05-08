import { useLayoutEffect, useState } from 'react';

import { shuffle } from '@/shared/lib/random.utils';

import { GAME_SIZES } from '../game.constants';
import { GameSize } from '../game.types';

import { computeMovableTileIndexes } from './compute-movable-tile-indexes';

function initTiles(size: GameSize): number[] {
  const length = size * size;

  return Array(length).fill(length);
}

export function useGameState(initSize: GameSize = 4) {
  const [tiles, setTiles] = useState(() => initTiles(initSize));

  const size = Math.sqrt(tiles.length) as GameSize;
  const emptyTile = tiles.length;
  const movableTileIndexes = computeMovableTileIndexes(tiles, emptyTile, size);
  const isSolved = tiles.every((tile, index) => tile === index + 1);

  useLayoutEffect(() => {
    const length = initSize * initSize;
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

  const handleSizeChange = (size: GameSize) => {
    if (!GAME_SIZES.includes(size)) {
      return;
    }

    setTiles(shuffle(Array.from({ length: size * size }, (_, index) => index + 1)));
  };

  return {
    tiles,
    size,
    emptyTile,
    movableTileIndexes,
    isSolved,
    handleSizeChange,
    handleCellClick,
    handleShuffle,
  };
}
