import Divider from '@/shared/ui/divider';
import Heading from '@/shared/ui/heading';
import KeyboardArrowsIcon from '@/shared/ui/icons/keyboard-arrows.icon';
import Select, { OptionType } from '@/shared/ui/select';

import { GAME_SIZES } from '../game.constants';
import { GameSize } from '../game.types';

type Props = {
  size: GameSize;
  onSizeChange: (size: GameSize) => void;
};

const OPTIONS: OptionType<GameSize>[] = GAME_SIZES.map((size) => ({ label: `${size}x${size}`, value: size }));

export function GameHeader({ size, onSizeChange }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <Heading>15 Puzzle</Heading>
        <Divider
          className="h-6"
          type="horizontal"
        />
        <KeyboardArrowsIcon className="text-black dark:text-white size-10" />
      </div>
      <Select
        className="min-w-25"
        value={size}
        options={OPTIONS}
        onChange={onSizeChange}
      />
    </div>
  );
}
