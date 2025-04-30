import { IconWeight } from '@phosphor-icons/react';
import { Circle, X } from '@phosphor-icons/react/dist/ssr';

import { SquareType } from '../_types/square-type';

type Props = {
  value: SquareType;
  size?: number;
  weigth?: IconWeight;
};

export default function SquareContent({ value, size, weigth }: Props) {
  return value === SquareType.X ? (
    <X
      size={size}
      weight={weigth}
    />
  ) : (
    <Circle
      size={size}
      weight={weigth}
    />
  );
}
