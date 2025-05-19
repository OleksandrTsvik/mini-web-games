import { HeadingWithGameControls } from '@/features/heading-with-game-controls';

export function GameHeader() {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <HeadingWithGameControls title="Sudoku" />
      difficulty
    </div>
  );
}
