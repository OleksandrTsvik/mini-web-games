'use client';

import { useGameState } from '../_model/use-game-state';

import { GameOverOverlay } from './game-over.overlay';
import { GameCell } from './game.cell';
import { GameHeader } from './game.header';
import { GameLayout } from './game.layout';
import { ShuffleButton } from './shuffle.button';

export function Game() {
  const { tiles, size, emptyTile, movableTileIndexes, isSolved, handleSizeChange, handleMove, handleShuffle } =
    useGameState();

  return (
    <GameLayout
      size={size}
      header={
        <GameHeader
          size={size}
          onSizeChange={handleSizeChange}
        />
      }
      board={tiles.map((tile, index) => (
        <GameCell
          key={index}
          tile={tile}
          index={index}
          isEmpty={tile === emptyTile}
          isCorrect={tile === index + 1}
          isMovable={movableTileIndexes.includes(index)}
          onClick={handleMove}
        />
      ))}
      overlay={<GameOverOverlay isOpen={isSolved} />}
      actions={<ShuffleButton onClick={handleShuffle} />}
    />
  );
}
