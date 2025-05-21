import { Backspace } from '@phosphor-icons/react/dist/ssr';

import { Button } from '@/shared/ui/button';

import { SUDOKU_NUMBERS } from '../game.constants';

type Props = {
  onNumberClick: (number: number) => void;
  onRemoveClick: () => void;
};

export function GameControls({ onNumberClick, onRemoveClick }: Props) {
  return (
    <>
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
    </>
  );
}
