import { isNonNullable } from '@/shared/lib/type-guards';

import { SquareState, SquareType } from '../_types/square-type';

import SquareContent from './square-content';

import styles from './game.module.scss';

type Props = {
  winner: SquareState;
  isDraw: boolean;
  currentMove: SquareType;
};

export default function Status({ winner, isDraw, currentMove }: Props) {
  if (isNonNullable(winner)) {
    return (
      <div className={styles.board__status}>
        Переможець:&nbsp;
        <SquareContent
          value={winner}
          size={18}
          weigth="bold"
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
        value={currentMove}
        size={18}
        weigth="bold"
      />
    </div>
  );
}
