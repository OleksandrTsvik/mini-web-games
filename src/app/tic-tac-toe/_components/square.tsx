import { classnames } from '@/shared/lib/class-names';
import { isNonNullable } from '@/shared/lib/type-guards';

import { SquareState } from '../_types/square-type';

import SquareContent from './square-content';

import styles from './game.module.scss';

type Props = {
  value: SquareState;
  isWinner?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export default function Square({ value, isWinner, disabled, onClick }: Props) {
  return (
    <button
      className={classnames(styles.board__square, 'cursor-pointer disabled:cursor-default disabled:hover:opacity-60', {
        'bg-zinc-200 dark:bg-black hover:bg-zinc-300 dark:hover:bg-zinc-800': !isWinner,
        'bg-green-500': isWinner,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {isNonNullable(value) && <SquareContent value={value} />}
    </button>
  );
}
