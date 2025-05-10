import { Rubik } from 'next/font/google';

import { classnames } from '@/shared/lib/class-names';
import Divider from '@/shared/ui/divider';
import Heading from '@/shared/ui/heading';
import KeyboardArrowsIcon from '@/shared/ui/icons/keyboard-arrows.icon';

import { GameSize } from '../game.types';

const rubik = Rubik({ weight: '400', subsets: ['cyrillic', 'latin'] });

type Props = {
  size: GameSize;
  score: React.ReactNode;
  restart: React.ReactNode;
  grid: React.ReactNode;
  tiles: React.ReactNode;
};

const sizeMap: Record<GameSize, string> = {
  4: 'grid-cols-4 min-w-56 max-w-3/7',
};

export function GameLayout({ size, score, restart, grid, tiles }: Props) {
  return (
    <>
      <div className={classnames('flex items-center justify-between gap-2 flex-wrap', rubik.className)}>
        <div className="flex items-center gap-2">
          <Heading>2048</Heading>
          <Divider
            className="h-6"
            type="horizontal"
          />
          <KeyboardArrowsIcon className="text-black dark:text-white size-10" />
        </div>
        <div className="flex items-center justify-center gap-4">{score}</div>
        {restart}
      </div>
      <Divider />
      <div
        className={classnames(
          'text-lg sm:text-2xl md:text-4xl lg:text-5xl flex items-center justify-center overflow-x-auto',
          rubik.className,
        )}
      >
        <div
          className={classnames(
            'relative grid gap-2 md:gap-3 lg:gap-4 w-full p-2 sm:p-4 md:p-5 rounded-lg',
            'bg-neutral-500 dark:bg-neutral-800',
            sizeMap[size],
          )}
        >
          {grid}
          {tiles}
        </div>
      </div>
    </>
  );
}
