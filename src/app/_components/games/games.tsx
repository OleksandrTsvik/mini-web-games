import { ROUTING } from '@/app/routing';

import GameCard from './game.card';

import fifteenPuzzle from '@/assets/games/15-puzzle.svg';
import ticTacToe from '@/assets/games/tic-tac-toe.svg';

const GAME_LIST = [
  { title: 'Tic-Tac-Toe', href: ROUTING.TIC_TAC_TOE, src: ticTacToe },
  { title: '15 Puzzle', href: ROUTING.FIFTEEN_PUZZLE, src: fifteenPuzzle },
];

export default function Games() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 xl:gap-x-8 gap-y-10">
      {GAME_LIST.map(({ href, src, title }, index) => (
        <GameCard
          key={index}
          href={href}
          src={src}
          title={title}
        />
      ))}
    </div>
  );
}
