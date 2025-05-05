import type { Metadata } from 'next';

import { Game } from './_components';
import { BotLevel } from './game.types';

type SearchParams = Promise<{ bot?: BotLevel }>;

type Props = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe',
  description: 'Tic-Tac-Toe local game',
};

export default async function TicTacToeLocalPage({ searchParams }: Props) {
  const { bot } = await searchParams;

  return <Game botLevel={bot?.trim().toLowerCase() as BotLevel} />;
}
