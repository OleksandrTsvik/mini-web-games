'use client';

import { Lora } from 'next/font/google';

import { classnames } from '@/shared/lib/class-names';
import { Divider } from '@/shared/ui/divider';

import { useGameState } from '../_model/use-game-state';

import { GameCell } from './game.cell';
import { GameHeader } from './game.header';

import styles from './game.module.scss';

const lora = Lora({ weight: '400', subsets: ['latin'] });

export function Game() {
  const { grid, gridContainerRef, handleCellClick } = useGameState();

  return (
    <>
      <GameHeader />
      <Divider />
      <div className="overflow-x-auto">
        <div
          ref={gridContainerRef}
          className={classnames(
            styles.grid,
            'text-lg sm:text-2xl md:text-2xl lg:text-3xl',
            'min-w-68 xs:max-w-6/7 sm:max-w-4/7 lg:max-w-3/7 border-black mx-auto',
            lora.className,
          )}
        >
          {grid.cells.map((cell, index) => (
            <GameCell
              key={index}
              index={index}
              cell={cell}
              onClick={handleCellClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}
