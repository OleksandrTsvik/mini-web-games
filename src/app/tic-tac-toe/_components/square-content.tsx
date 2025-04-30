import { IconWeight } from '@phosphor-icons/react';
import { Circle, X } from '@phosphor-icons/react/dist/ssr';

import { Player } from '../_types/game';

type Props = {
  player: Player;
  size?: number;
  weigth?: IconWeight;
  className?: string;
};

export default function SquareContent({ player: value, ...props }: Props) {
  return value === Player.X ? <X {...props} /> : <Circle {...props} />;
}
