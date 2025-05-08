import { classnames } from '@/shared/lib/class-names';

type Props = {
  tile: number;
  index: number;
  isEmpty: boolean;
  isCorrect: boolean;
  isMovable: boolean;
  onClick: (index: number) => void;
};

export function GameCell({ tile, index, isEmpty, isCorrect, isMovable, onClick }: Props) {
  return (
    <div
      className={classnames(
        'text-stone-900 dark:text-white text-shadow-sm dark:text-shadow-lg',
        'flex items-center justify-center aspect-square rounded-md shadow-lg select-none',
        {
          'bg-amber-500': !isEmpty,
          'bg-gray-900': isEmpty,
          'bg-amber-700': isCorrect && !isEmpty,
          'cursor-pointer': isMovable && !isEmpty,
        },
      )}
      onClick={() => onClick(index)}
    >
      {isEmpty ? null : tile}
    </div>
  );
}
