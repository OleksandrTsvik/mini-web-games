'use client';

import { useGameState } from '../_model/use-game-state';
import { GameStatus } from '../game.types';

import { GameOverOverlay } from './game-over.overlay';
import { GameCell } from './game.cell';
import { GameLayout } from './game.layout';
import { GameScore } from './game.score';
import { GameTile } from './game.tile';
import { RestartButton } from './restart.button';

export function Game() {
  const { status, size, score, bestScore, grid, handleRestart, handlePlayAfterWin } = useGameState();

  const cells = Array.from(Array(size * size).keys()).map((i) => <GameCell key={i} />);

  const showOverlay = status === GameStatus.Victory || status === GameStatus.Defeat;

  return (
    <GameLayout
      size={size}
      showOverlay={showOverlay}
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
      overlay={
        <GameOverOverlay
          status={status}
          onContinue={handlePlayAfterWin}
          onRestart={handleRestart}
        />
      }
    />
  );
}
