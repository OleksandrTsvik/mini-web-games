import { ArrowClockwise, Play } from '@phosphor-icons/react/dist/ssr';

import Button from '@/shared/ui/button';

import { GameStatus } from '../game.types';

type Props = {
  status: GameStatus;
  onContinue: () => void;
  onRestart: () => void;
};

export function GameOverOverlay({ status, onContinue, onRestart }: Props) {
  switch (status) {
    case GameStatus.Victory:
      return (
        <>
          Чудово!
          <div className="flex gap-4">
            <Button
              variant="icon"
              color="green"
              onClick={onContinue}
            >
              <Play weight="bold" />
            </Button>
            <Button
              variant="icon"
              color="yellow"
              onClick={onRestart}
            >
              <ArrowClockwise weight="bold" />
            </Button>
          </div>
        </>
      );
    case GameStatus.Defeat:
      return 'Гру завершено!';
    default:
      return null;
  }
}
