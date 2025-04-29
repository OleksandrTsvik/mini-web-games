import type { Metadata } from 'next';

import Divider from '@/shared/ui/divider';
import Heading from '@/shared/ui/heading';

import Game from './_components/game';

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe',
  description: 'Tic-Tac-Toe game',
};

export default function TicTacToePage() {
  return (
    <>
      <Heading>Tic-Tac-Toe</Heading>
      <Divider />
      <Game />
    </>
  );
}
