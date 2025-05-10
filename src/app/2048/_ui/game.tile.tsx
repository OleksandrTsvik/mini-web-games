import { classnames } from '@/shared/lib/class-names';
import { isNone } from '@/shared/lib/type-guards';

import { Tile } from '../game.types';

type Props = {
  tile: Tile;
};

const fontMap: Record<number, string> = {
  128: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  256: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  512: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  1024: 'text-base sm:text-lg md:text-xl lg:text-2xl',
  2048: 'text-base sm:text-lg md:text-xl lg:text-2xl',
};

const colorMap: Record<number, string> = {
  2: 'text-[#988876] bg-[#eee4da]',
  4: 'text-[#988876] bg-[#ede0c8]',
  8: 'text-[#f9f6f2] bg-[#f2b179]',
  16: 'text-[#f9f6f2] bg-[#f59563]',
  32: 'text-[#f9f6f2] bg-[#f67c5f]',
  64: 'text-[#f9f6f2] bg-[#f65e3b]',
  128: 'text-[#f9f6f2] bg-[#edcf72]',
  256: 'text-[#f9f6f2] bg-[#edcc61]',
  512: 'text-[#f9f6f2] bg-[#edc850]',
  1024: 'text-[#f9f6f2] bg-[#edc53f]',
  2048: 'text-[#f9f6f2] bg-[#edc22e]',
};

export function GameTile({ tile }: Props) {
  return (
    <div className="aspect-square bg-neutral-400 dark:bg-neutral-700 rounded-md">
      {!isNone(tile) && (
        <div
          className={classnames(
            'font-bold flex items-center justify-center w-full h-full rounded-md',
            fontMap[tile],
            colorMap[tile],
          )}
        >
          {tile}
        </div>
      )}
    </div>
  );
}
