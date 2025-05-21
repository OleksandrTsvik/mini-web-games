import { Badge, BadgeColor } from '@/shared/ui/badge';

import { BOT_LEVEL } from '../../game.constants';
import { BotLevel } from '../../game.types';

type Props = {
  level: BotLevel | undefined;
};

const levelConfig: Record<BotLevel | 'default', { color: BadgeColor; content: string }> = {
  [BOT_LEVEL.EASY]: { color: 'lime', content: 'easy' },
  [BOT_LEVEL.NORMAL]: { color: 'amber', content: 'normal' },
  [BOT_LEVEL.HARD]: { color: 'red', content: 'hard' },
  default: { color: 'blue', content: '1 vs 1' },
};

export function BotLevelBadge({ level }: Props) {
  const { color, content } = levelConfig[level ?? 'default'] ?? levelConfig.default;

  return (
    <Badge
      className="absolute right-[-30%] top-[-20%] rotate-20"
      color={color}
    >
      {content}
    </Badge>
  );
}
