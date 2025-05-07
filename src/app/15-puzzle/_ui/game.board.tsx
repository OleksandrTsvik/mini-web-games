import { Pacifico } from 'next/font/google';

import { classnames } from '@/shared/lib/class-names';

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

type Props = {
  size: number;
  children: React.ReactNode;
};

const gridColsMap: Record<number, string> = {
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

export function GameBoard({ size, children }: Props) {
  if (!size) {
    return null;
  }

  return (
    <div
      className={classnames(
        'text-lg sm:text-2xl md:text-4xl lg:text-5xl',
        'flex items-center justify-center overflow-x-auto',
        pacifico.className,
      )}
    >
      <div
        className={classnames('grid gap-4 w-full min-w-52 max-w-3/7 p-5 rounded-lg', 'bg-gray-700', gridColsMap[size])}
      >
        {children}
      </div>
    </div>
  );
}
