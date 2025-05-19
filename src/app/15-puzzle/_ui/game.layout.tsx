import { Pacifico } from 'next/font/google';

import { classnames } from '@/shared/lib/class-names';
import { Divider } from '@/shared/ui/divider';

import { GameSize } from '../game.types';

const pacifico = Pacifico({ weight: '400', subsets: ['cyrillic', 'latin'] });

type Props = {
  size: GameSize;
  header: React.ReactNode;
  board: React.ReactNode;
  overlay: React.ReactNode;
  actions: React.ReactNode;
};

const sizeMap: Record<GameSize, string> = {
  2: 'grid-cols-2 min-w-50 xs:max-w-1/3',
  3: 'grid-cols-3 min-w-50 xs:max-w-2/5',
  4: 'grid-cols-4 min-w-56 xs:max-w-3/7',
  5: 'grid-cols-5 min-w-68 xs:max-w-1/2',
  6: 'grid-cols-6 min-w-68 xs:max-w-4/7',
  7: 'grid-cols-7 min-w-68 xs:max-w-3/5',
  8: 'grid-cols-8 min-w-72 xs:max-w-2/3',
};

export function GameLayout({ size, header, board, overlay, actions }: Props) {
  return (
    <>
      {header}
      <Divider />
      <div className={classnames('text-lg sm:text-2xl md:text-4xl lg:text-5xl overflow-x-auto', pacifico.className)}>
        <div
          className={classnames(
            'relative grid gap-2 md:gap-3 lg:gap-4 w-full mx-auto p-2 sm:p-4 md:p-5 rounded-lg bg-gray-700',
            sizeMap[size],
          )}
        >
          {board}
          {overlay}
        </div>
      </div>
      <div className="text-center mt-5">{actions}</div>
    </>
  );
}
