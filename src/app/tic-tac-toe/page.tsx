import type { Metadata } from 'next';

import { Game } from './_components';
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

  return <Game botLevel={level} />;
}
