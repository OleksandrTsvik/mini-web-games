import { Circle, X } from '@phosphor-icons/react/dist/ssr';

import { SquareType } from '../_types/square-type';

type Props = {
  value: SquareType;
  size?: number;
};

export default function SquareContent({ value, size }: Props) {
  return value === SquareType.X ? <X size={size} /> : <Circle size={size} />;
}
