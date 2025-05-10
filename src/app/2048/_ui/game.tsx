'use client';

import { useGameState } from '../_model/use-game-state';

import { GameLayout } from './game.layout';
import { GameScore } from './game.score';
import { GameTile } from './game.tile';
import { RestartButton } from './restart.button';

export function Game() {
  const { size, score, bestScore, tiles } = useGameState();

  const grid = null;

  return (
    <GameLayout
      size={size}
      score={
        <GameScore
          score={score}
          bestScore={bestScore}
        />
      }
      restart={<RestartButton />}
      grid={grid}
      tiles={tiles.map((tile, index) => (
        <GameTile
          key={index}
          tile={tile}
        />
      ))}
    />
  );
}
