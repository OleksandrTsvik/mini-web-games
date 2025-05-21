import { classnames } from '@/shared/lib/class-names';
import { isNonNullable } from '@/shared/lib/type-guards';

import { Cell, CellStatus } from '../game.types';

import styles from './game.module.scss';

type Props = {
  index: number;
  cell: Cell;
  onClick: (index: number) => void;
};

const statusMap: Record<CellStatus, string> = {
  [CellStatus.Selected]: 'bg-lime-200 dark:bg-green-500/70',
  [CellStatus.Highlighted]: 'bg-zinc-300 dark:bg-neutral-700',
  [CellStatus.Same]: 'bg-sky-200 dark:bg-sky-800/80',
  [CellStatus.Wrong]: 'bg-red-200 dark:bg-red-500/70',
  [CellStatus.Victory]: 'bg-yellow-100 dark:bg-yellow-200/50',
};

export function GameCell({ index, cell, onClick }: Props) {
  return (
    <div
      className={classnames(
        styles.grid__cell,
        cell.isInit && 'text-gray-600 dark:text-gray-300',
        isNonNullable(cell.status) ? statusMap[cell.status] : 'bg-neutral-100 dark:bg-neutral-600',
      )}
      onClick={() => onClick(index)}
    >
      {cell.value}
    </div>
  );
}
