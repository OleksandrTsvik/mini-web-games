import { classnames } from '@/shared/lib/class-names';
import { isNone } from '@/shared/lib/type-guards';

import { Tile } from '../_model/tile';

import styles from './game.module.scss';

type Props = {
  tile: Tile;
};

type TileCSSProperties = React.CSSProperties & {
  '--x'?: number;
  '--y'?: number;
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
  const style: TileCSSProperties = { '--x': tile.x, '--y': tile.y };

  return (
    <div
      className={
        isNone(tile.value)
          ? 'hidden'
          : classnames(styles.grid__tile, 'font-bold', fontMap[tile.value], colorMap[tile.value])
      }
      style={style}
    >
      {tile.value}
    </div>
  );
}
