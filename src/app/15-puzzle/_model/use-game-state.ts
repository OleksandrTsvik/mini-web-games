import { useLayoutEffect, useState } from 'react';

import useKeyboard from '@/hooks/use-keyboard';
import { handleGameKeyboardAction } from '@/shared/lib/keyboard.utils';
import { shuffle } from '@/shared/lib/random.utils';
import { KeyboardEventCode } from '@/shared/types';

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
  }, [initSize]);

  const handleKeyboardMove = (key: KeyboardEventCode) => {
    const emptyIndex = tiles.findIndex((tile) => tile === emptyTile);

    handleGameKeyboardAction(key, {
      up: () => handleMove(emptyIndex + size),
      down: () => handleMove(emptyIndex - size),
      left: () => handleMove(emptyIndex + 1),
      right: () => handleMove(emptyIndex - 1),
    });
  };

  useKeyboard(handleKeyboardMove);

  const handleShuffle = () => {
    setTiles(shuffle(tiles));
  };

  const handleMove = (index: number) => {
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
    handleMove,
    handleShuffle,
  };
}
