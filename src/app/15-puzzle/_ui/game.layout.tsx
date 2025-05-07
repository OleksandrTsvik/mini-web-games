import { Pacifico } from 'next/font/google';

import { classnames } from '@/shared/lib/class-names';
import Divider from '@/shared/ui/divider';

const pacifico = Pacifico({ weight: '400', subsets: ['cyrillic', 'latin'] });

type Props = {
  size: number;
  header: React.ReactNode;
  board: React.ReactNode;
  overlay: React.ReactNode;
  actions: React.ReactNode;
};

const gridColsMap: Record<number, string> = {
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

export function GameLayout({ size, header, board, overlay, actions }: Props) {
  return (
    <>
      {header}
      <Divider />
      <div
        className={classnames(
          'text-lg sm:text-2xl md:text-4xl lg:text-5xl flex items-center justify-center overflow-x-auto',
          pacifico.className,
        )}
      >
        <div
          className={classnames(
            'relative grid gap-4 w-full min-w-52 max-w-3/7 p-5 rounded-lg bg-gray-700',
            gridColsMap[size],
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
