import HeadingWithGameControls from '@/features/heading-with-game-controls';
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
      <HeadingWithGameControls title="15 Puzzle" />
      <Select
        className="min-w-25"
        value={size}
        options={OPTIONS}
        onChange={onSizeChange}
      />
    </div>
  );
}
