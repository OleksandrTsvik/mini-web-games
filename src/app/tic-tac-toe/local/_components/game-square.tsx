import { classnames } from '@/shared/lib/class-names';
import { isNonNullable } from '@/shared/lib/type-guards';

import { SquareState } from '../_types/game.types';

import { GameSymbol } from './game-symbol';

import styles from './game.module.scss';

type Props = {
  value: SquareState;
  isWinner?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export function GameSquare({ value, isWinner, disabled, onClick }: Props) {
  return (
    <button
      className={classnames(
        styles.board__square,
        'rounded-md cursor-pointer disabled:cursor-default disabled:hover:opacity-60',
        {
          'bg-zinc-200 dark:bg-black hover:bg-zinc-300 dark:hover:bg-zinc-800': !isWinner,
          'bg-orange-600/10': isWinner,
        },
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {isNonNullable(value) && <GameSymbol player={value} />}
    </button>
  );
}
