import { classnames } from '@/shared/lib/class-names';
import { isNonNullable, isNone } from '@/shared/lib/type-guards';

import { Cell, CellStatus } from '../game.types';

type Props = {
  index: number;
  cell: Cell;
  onClick: (index: number) => void;
};

const statusMap: Record<CellStatus, string> = {
  [CellStatus.Selected]: 'bg-emerald-500',
  [CellStatus.Highlighted]: 'bg-amber-500',
  [CellStatus.Same]: 'bg-indigo-500',
  [CellStatus.Wrong]: 'bg-red-500',
};

export function GameCell({ index, cell, onClick }: Props) {
  return (
    <div
      className={classnames(
        'flex items-center justify-center aspect-square rounded-sm select-none cursor-pointer',
        {
          'bg-slate-500': cell.isInit && isNone(cell.status),
          'bg-slate-400': !cell.isInit && isNone(cell.status),
        },
        isNonNullable(cell.status) && statusMap[cell.status],
      )}
      onClick={() => onClick(index)}
    >
      {cell.value}
    </div>
  );
}
