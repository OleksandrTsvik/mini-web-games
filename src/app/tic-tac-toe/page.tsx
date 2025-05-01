import { Gear } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import Link from 'next/link';

import Button from '@/shared/ui/button';
import Divider from '@/shared/ui/divider';
import Heading from '@/shared/ui/heading';

import { ROUTING } from '../routing';

import BotLevelBadge from './_components/bot-level.badge';
import Game from './_components/game';
import { BotLevel } from './_types/game.types';

type SearchParams = Promise<{ level?: BotLevel }>;

type Props = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe',
  description: 'Tic-Tac-Toe game',
};

export default async function TicTacToePage({ searchParams }: Props) {
  const { level } = await searchParams;

  return (
    <>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Heading className="relative">
          Tic-Tac-Toe
          <BotLevelBadge level={level} />
        </Heading>
        <Button
          component={Link}
          href={ROUTING.TIC_TAC_TOE_SETTINGS}
          icon
        >
          <Gear size={18} />
        </Button>
      </div>
      <Divider />
      <Game botLevel={level} />
    </>
  );
}
