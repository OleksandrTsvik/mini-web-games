'use client';

import { useGameState } from '../_model/use-game-state';

import { GameCell } from './game.cell';
import { GameLayout } from './game.layout';
import { GameScore } from './game.score';
import { GameTile } from './game.tile';
import { RestartButton } from './restart.button';

export function Game() {
  const { size, score, bestScore, grid, handleRestart } = useGameState();

  const cells = Array.from(Array(size * size).keys()).map((i) => <GameCell key={i} />);

  return (
    <GameLayout
      size={size}
      score={
        <GameScore
          score={score}
          bestScore={bestScore}
        />
      }
      restart={<RestartButton onClick={handleRestart} />}
      cells={cells}
      tiles={grid.tiles.map((tile, index) => (
        <GameTile
          key={index}
          tile={tile}
        />
      ))}
    />
  );
}
