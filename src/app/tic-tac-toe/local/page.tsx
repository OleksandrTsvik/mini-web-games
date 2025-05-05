import type { Metadata } from 'next';

import { Game } from './_components';

type SearchParams = Promise<{ level?: string }>;

type Props = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe',
  description: 'Tic-Tac-Toe local game',
};

export default async function TicTacToeLocalPage({ searchParams }: Props) {
  const { level } = await searchParams;

  return <Game botLevel={level?.trim().toLowerCase()} />;
}
