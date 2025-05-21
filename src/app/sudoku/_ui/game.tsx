'use client';

import { Space_Mono } from 'next/font/google';

import { classnames } from '@/shared/lib/class-names';
import { Divider } from '@/shared/ui/divider';

import { useGameState } from '../_model/use-game-state';

import { GameCell } from './game.cell';
import { GameControls } from './game.controls';
import { GameHeader } from './game.header';
import { RestartButton } from './restart.button';

import styles from './game.module.scss';

const spaceMono = Space_Mono({ weight: '400', subsets: ['latin'] });

export function Game() {
  const { isWin, grid, gridContainerRef, handleCellClick, handleNumberClick, handleRemoveClick, handleRestart } =
    useGameState();

  return (
    <>
      <GameHeader />
      <Divider />
      <div className="overflow-x-auto">
        <div
          ref={gridContainerRef}
          className={classnames('min-w-68 xs:max-w-6/7 sm:max-w-4/7 lg:max-w-3/7 mx-auto', spaceMono.className)}
        >
          <div className={classnames(styles.grid, 'text-lg sm:text-2xl md:text-2xl lg:text-3xl border-black')}>
            {grid.cells.map((cell, index) => (
              <GameCell
                key={index}
                index={index}
                cell={cell}
                onClick={handleCellClick}
              />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1 sm:gap-2 mt-3 sm:mt-5">
            {isWin ? (
              <RestartButton onClick={handleRestart} />
            ) : (
              <GameControls
                onNumberClick={handleNumberClick}
                onRemoveClick={handleRemoveClick}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
