import Heading from '@/shared/ui/heading';

import { BotLevelBadge } from './bot-level.badge';

type Props = {
  botLevel?: string;
};

export function GameTitle({ botLevel }: Props) {
  return (
    <Heading className="relative">
      Tic-Tac-Toe
      <BotLevelBadge level={botLevel} />
    </Heading>
  );
}
