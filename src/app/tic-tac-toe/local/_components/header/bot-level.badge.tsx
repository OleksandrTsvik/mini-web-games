import Badge, { BadgeColor } from '@/shared/ui/badge';

import { BOT_LEVEL } from '../../game.constants';

type Props = {
  level: string | undefined;
};

const levelConfig: Record<string, { color: BadgeColor; content: string }> = {
  [BOT_LEVEL.EASY]: { color: 'lime', content: 'easy' },
  [BOT_LEVEL.NORMAL]: { color: 'amber', content: 'normal' },
  [BOT_LEVEL.HARD]: { color: 'red', content: 'hard' },
  default: { color: 'blue', content: '1 vs 1' },
};

export function BotLevelBadge({ level }: Props) {
  const { color, content } = levelConfig[level ?? 'default'];

  return (
    <Badge
      className="absolute right-[-30%] top-[-20%] rotate-20"
      color={color}
    >
      {content}
    </Badge>
  );
}
