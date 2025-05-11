import { Rubik } from 'next/font/google';

import { classnames } from '@/shared/lib/class-names';
import Divider from '@/shared/ui/divider';
import Heading from '@/shared/ui/heading';
import KeyboardArrowsIcon from '@/shared/ui/icons/keyboard-arrows.icon';

import { GameSize } from '../game.types';

import styles from './game.module.scss';

const rubik = Rubik({ weight: '400', subsets: ['cyrillic', 'latin'] });

type Props = {
  size: GameSize;
  score: React.ReactNode;
  restart: React.ReactNode;
  cells: React.ReactNode;
  tiles: React.ReactNode;
};

type GridCSSProperties = React.CSSProperties & {
  '--size': GameSize;
};

const sizeMap: Record<GameSize, string> = {
  4: 'min-w-56 max-w-3/7',
};

export function GameLayout({ size, score, restart, cells, tiles }: Props) {
  const gridStyle: GridCSSProperties = { '--size': size };

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
            styles.grid,
            'bg-neutral-500 dark:bg-neutral-800 border-neutral-500 dark:border-neutral-800',
            sizeMap[size],
          )}
          style={gridStyle}
        >
          {cells}
          {tiles}
        </div>
      </div>
    </>
  );
}
