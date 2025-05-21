'use client';

import { useGameState } from '../_model/use-game-state';

import { GameActions } from './game.actions';
import { GameCell } from './game.cell';
import { GameControls } from './game.controls';
import { GameLayout } from './game.layout';
import { RestartButton } from './restart.button';

export function Game() {
  const {
    difficulty,
    isWin,
    grid,
    gridContainerRef,
    handleCellClick,
    handleNumberClick,
    handleRemoveClick,
    handleReset,
    handleRestart,
    handleChangeDifficulty,
  } = useGameState();

  return (
    <GameLayout
      isWin={isWin}
      gridContainerRef={gridContainerRef}
      actions={
        <GameActions
          difficulty={difficulty}
          onChangeDifficulty={handleChangeDifficulty}
          onReset={handleReset}
          onRestart={handleRestart}
        />
      }
      cells={grid.cells.map((cell, index) => (
        <GameCell
          key={index}
          index={index}
          cell={cell}
          onClick={handleCellClick}
        />
      ))}
      controls={
        <GameControls
          onNumberClick={handleNumberClick}
          onRemoveClick={handleRemoveClick}
        />
      }
      restart={<RestartButton onClick={handleRestart} />}
    />
  );
}
