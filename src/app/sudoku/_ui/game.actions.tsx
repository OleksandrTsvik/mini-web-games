import { ArrowClockwise, Broom } from '@phosphor-icons/react/dist/ssr';

import { Button } from '@/shared/ui/button';
import { OptionType, Select } from '@/shared/ui/select';

type Props = {
  difficulty: number;
  onChangeDifficulty: (difficulty: number) => void;
  onReset: () => void;
  onRestart: () => void;
};

const OPTIONS: OptionType<number>[] = [
  { label: 'Дуже легкий', value: 10 },
  { label: 'Легкий', value: 20 },
  { label: 'Нормальний', value: 30 },
  { label: 'Складний', value: 40 },
  { label: 'Дуже складний', value: 55 },
];

export function GameActions({ difficulty, onChangeDifficulty, onReset, onRestart }: Props) {
  return (
    <>
      <Select
        className="min-w-40"
        value={difficulty}
        options={OPTIONS}
        onChange={onChangeDifficulty}
      />
      <Button
        variant="icon"
        color="sky"
        onClick={onReset}
      >
        <Broom weight="bold" />
      </Button>
      <Button
        variant="icon"
        color="yellow"
        onClick={onRestart}
      >
        <ArrowClockwise weight="bold" />
      </Button>
    </>
  );
}
