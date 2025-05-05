import { IconWeight } from '@phosphor-icons/react';
import { Circle, X } from '@phosphor-icons/react/dist/ssr';

import { classnames } from '@/shared/lib/class-names';

import { Player } from '../_types/game.types';

type Props = {
  player: Player;
  size?: number;
  weigth?: IconWeight;
  className?: string;
};

export function GameSymbol({ player, className, ...props }: Props) {
  const classNames = classnames(
    {
      'text-teal-500': player === Player.X,
      'text-amber-500': player === Player.O,
    },
    className,
  );

  return player === Player.X ? (
    <X
      className={classNames}
      {...props}
    />
  ) : (
    <Circle
      className={classNames}
      {...props}
    />
  );
}
