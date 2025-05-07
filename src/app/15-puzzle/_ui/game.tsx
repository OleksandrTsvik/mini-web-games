'use client';

import { useGameState } from '../_model/use-game-state';

import { GameBoard } from './game.board';
import { GameCell } from './game.cell';
import { GameHeader } from './game.header';
import { GameLayout } from './game.layout';
import { ShuffleButton } from './shuffle.button';

export function Game() {
  const { size, tiles, handleShuffle } = useGameState();

  return (
    <GameLayout
      header={<GameHeader />}
      board={
        <GameBoard size={size}>
          {tiles.map((tile, index) => (
            <GameCell
              key={index}
              tile={tile}
              isEmpty={tile === tiles.length}
              isCorrect={tile === index + 1}
              isMovable={tile % 2 === 0}
            />
          ))}
        </GameBoard>
      }
      actions={<ShuffleButton onClick={handleShuffle} />}
    />
  );
}
