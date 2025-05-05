import { Skull } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import Link from 'next/link';

import { ROUTING } from '@/app/routing';
import Button from '@/shared/ui/button';
import Divider from '@/shared/ui/divider';
import Heading from '@/shared/ui/heading';

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe',
  description: 'Select the difficulty level for the Tic-Tac-Toe game.',
};

export default function TicTacToePage() {
  return (
    <>
      <Heading>Tic-Tac-Toe</Heading>
      <Divider />
      <Heading
        as="h3"
        className="text-center mb-6"
      >
        Гравці
      </Heading>
      <div className="flex flex-col gap-4 max-w-[400px] mx-auto">
        <Button
          component={Link}
          href={ROUTING.TIC_TAC_TOE_LOCAL()}
          color="sky"
        >
          1 vs 1 (local)
        </Button>
      </div>
      <Heading
        as="h3"
        className="text-center mt-8 mb-6"
      >
        Бот
      </Heading>
      <div className="flex flex-col gap-4 max-w-[400px] mx-auto">
        <Button
          component={Link}
          href={ROUTING.TIC_TAC_TOE_LOCAL('easy')}
          color="green"
        >
          Легкий
        </Button>
        <Button
          component={Link}
          href={ROUTING.TIC_TAC_TOE_LOCAL('normal')}
          color="amber"
        >
          Нормальний
        </Button>
        <Button
          component={Link}
          href={ROUTING.TIC_TAC_TOE_LOCAL('hard')}
          justify="justify-between"
          color="red"
        >
          <Skull size={28} />
          Складний
          <Skull size={28} />
        </Button>
      </div>
    </>
  );
}
