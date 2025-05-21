import { Space_Mono } from 'next/font/google';

import { HeadingWithGameControls } from '@/features/heading-with-game-controls';
import { classnames } from '@/shared/lib/class-names';
import { Divider } from '@/shared/ui/divider';

import styles from './game.module.scss';

const spaceMono = Space_Mono({ weight: '400', subsets: ['latin'] });

type Props = {
  isWin: boolean;
  gridContainerRef: React.RefObject<HTMLDivElement | null>;
  actions: React.ReactNode;
  cells: React.ReactNode;
  controls: React.ReactNode;
  restart: React.ReactNode;
};

export function GameLayout({ isWin, gridContainerRef, actions, cells, controls, restart }: Props) {
  return (
    <>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <HeadingWithGameControls title="Sudoku" />
        <div className="flex items-center gap-2 flex-wrap">{actions}</div>
      </div>
      <Divider />
      <div className="overflow-x-auto">
        <div
          ref={gridContainerRef}
          className={classnames('min-w-68 xs:max-w-6/7 sm:max-w-4/7 lg:max-w-3/7 mx-auto', spaceMono.className)}
        >
          <div className={classnames(styles.grid, 'text-lg sm:text-2xl md:text-2xl lg:text-3xl border-black')}>
            {cells}
          </div>
          <div className="grid grid-cols-5 gap-1 sm:gap-2 mt-3 sm:mt-5">{isWin ? restart : controls}</div>
        </div>
      </div>
    </>
  );
}
