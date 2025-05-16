import { Rubik } from 'next/font/google';

import HeadingWithGameControls from '@/features/heading-with-game-controls';
import { classnames } from '@/shared/lib/class-names';
import Divider from '@/shared/ui/divider';

import { GameSize } from '../game.types';

import styles from './game.module.scss';

const rubik = Rubik({ weight: '400', subsets: ['cyrillic', 'latin'] });

type Props = {
  size: GameSize;
  showOverlay: boolean;
  gridContainerRef: React.RefObject<HTMLDivElement | null>;
  score: React.ReactNode;
  restart: React.ReactNode;
  cells: React.ReactNode;
  tiles: React.ReactNode;
  overlay: React.ReactNode;
};

type GridCSSProperties = React.CSSProperties & {
  '--size': GameSize;
};

const minWidthMap: Record<GameSize, string> = {
  4: 'min-w-56',
};

const maxWidthMap: Record<GameSize, string> = {
  4: 'xs:max-w-3/7',
};

export function GameLayout({ size, showOverlay, gridContainerRef, score, restart, cells, tiles, overlay }: Props) {
  const gridStyle: GridCSSProperties = { '--size': size };

  return (
    <>
      <div className={classnames(styles.header, rubik.className)}>
        <HeadingWithGameControls title="2048" />
        <div className="flex items-center justify-center gap-4">{score}</div>
        {restart}
      </div>
      <Divider />
      <div
        className={classnames(
          'relative text-xl sm:text-2xl md:text-4xl lg:text-5xl flex items-center justify-center overflow-x-auto',
          rubik.className,
        )}
      >
        <div
          ref={gridContainerRef}
          className={classnames(
            styles.grid,
            'bg-neutral-500 dark:bg-neutral-800 border-neutral-500 dark:border-neutral-800 cursor-default',
            minWidthMap[size],
            maxWidthMap[size],
          )}
          style={gridStyle}
        >
          {cells}
          {tiles}
        </div>
        {showOverlay && (
          <div
            className={classnames(
              'absolute flex flex-col items-center justify-center gap-6 w-full h-full',
              'p-5 rounded text-white text-shadow-md bg-gray-800/80 backdrop-blur-[2px]',
              minWidthMap[size],
            )}
          >
            {overlay}
          </div>
        )}
      </div>
    </>
  );
}
