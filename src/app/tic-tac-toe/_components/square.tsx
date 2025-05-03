import { classnames } from '@/shared/lib/class-names';
import { isNonNullable } from '@/shared/lib/type-guards';

import { Player, SquareState } from '../_types/game.types';

import GameSymbol from './game-symbol';

import styles from './game.module.scss';

type Props = {
  value: SquareState;
  winner: SquareState;
  isWinner?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export default function Square({ value, winner, isWinner, disabled, onClick }: Props) {
  return (
    <button
      className={classnames(styles.board__square, 'cursor-pointer disabled:cursor-default disabled:hover:opacity-60', {
        'bg-zinc-200 dark:bg-black hover:bg-zinc-300 dark:hover:bg-zinc-800': !isWinner,
        'bg-blue-500': isWinner && winner === Player.X,
        'bg-red-500': isWinner && winner === Player.O,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {isNonNullable(value) && <GameSymbol player={value} />}
    </button>
  );
}
