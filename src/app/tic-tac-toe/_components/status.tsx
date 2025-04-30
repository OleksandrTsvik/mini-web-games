import { isNonNullable } from '@/shared/lib/type-guards';

import { Player, SquareState } from '../_types/game';

import SquareContent from './square-content';

import styles from './game.module.scss';

type Props = {
  winner: SquareState;
  isDraw: boolean;
  currentPlayer: Player;
};

export default function Status({ winner, isDraw, currentPlayer }: Props) {
  if (isNonNullable(winner)) {
    return (
      <div className={styles.board__status}>
        Переможець:&nbsp;
        <SquareContent
          player={winner}
          size={18}
          weigth="bold"
          className={winner === Player.X ? 'text-blue-500' : 'text-red-500'}
        />
      </div>
    );
  }

  if (isDraw) {
    return <div className={styles.board__status}>Нічия</div>;
  }

  return (
    <div className={styles.board__status}>
      Хід:&nbsp;
      <SquareContent
        player={currentPlayer}
        size={18}
        weigth="bold"
      />
    </div>
  );
}
