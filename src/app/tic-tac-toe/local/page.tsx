import type { Metadata } from 'next';

import { Game } from './_ui';
import { BotLevel } from './game.types';

type SearchParams = Promise<{ bot?: BotLevel }>;

type Props = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe',
  description:
    'Грайте в класичну гру хрестики-нолики онлайн! Змагайтеся з друзями або штучним інтелектом, розвивайте стратегічне мислення та насолоджуйтесь простим, але захопливим геймплеєм.',
};

export default async function TicTacToeLocalPage({ searchParams }: Props) {
  const { bot } = await searchParams;

  return <Game botLevel={bot?.trim().toLowerCase() as BotLevel} />;
}
