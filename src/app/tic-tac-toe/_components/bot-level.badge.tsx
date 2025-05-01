import Badge, { BadgeColor } from '@/shared/ui/badge';

import { BotLevel } from '../_types/game.types';

type Props = {
  level: BotLevel | undefined;
};

export default function BotLevelBadge({ level }: Props) {
  let color: BadgeColor;
  let content: string;

  switch (level) {
    case 'easy':
      color = 'lime';
      content = 'easy';
      break;
    case 'normal':
      color = 'amber';
      content = 'normal';
      break;
    case 'hard':
      color = 'red';
      content = 'hard';
      break;
    default:
      color = 'blue';
      content = '1 vs 1';
      break;
  }

  return (
    <Badge
      className="absolute right-[-30%] top-[-20%] rotate-20"
      color={color}
    >
      {content}
    </Badge>
  );
}
