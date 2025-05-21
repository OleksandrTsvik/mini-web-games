import { Backspace } from '@phosphor-icons/react/dist/ssr';

import { Button } from '@/shared/ui/button';

import { SUDOKU_NUMBERS } from '../game.constants';

type Props = {
  onNumberClick: (number: number) => void;
  onRemoveClick: () => void;
};

export function GameControls({ onNumberClick, onRemoveClick }: Props) {
  return (
    <div className="grid grid-cols-5 gap-1 sm:gap-2 mt-3 sm:mt-5">
      {SUDOKU_NUMBERS.map((number) => (
        <Button
          key={number}
          onClick={() => onNumberClick(number)}
        >
          {number}
        </Button>
      ))}
      <Button onClick={onRemoveClick}>
        <Backspace size={20} />
      </Button>
    </div>
  );
}
