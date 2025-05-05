import Heading from '@/shared/ui/heading';

import { BotLevel } from '../../_types/game.types';

import { BotLevelBadge } from './bot-level.badge';

type Props = {
  botLevel?: BotLevel;
};

export function GameTitle({ botLevel }: Props) {
  return (
    <Heading className="relative">
      Tic-Tac-Toe
      <BotLevelBadge level={botLevel} />
    </Heading>
  );
}
