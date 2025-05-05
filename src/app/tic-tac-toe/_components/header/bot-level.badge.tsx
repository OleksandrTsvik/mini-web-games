import Badge, { BadgeColor } from '@/shared/ui/badge';

import { BotLevel } from '../../_types/game.types';

type Props = {
  level: BotLevel | undefined;
};

const levelConfig: Record<BotLevel | 'default', { color: BadgeColor; content: string }> = {
  easy: { color: 'lime', content: 'easy' },
  normal: { color: 'amber', content: 'normal' },
  hard: { color: 'red', content: 'hard' },
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
