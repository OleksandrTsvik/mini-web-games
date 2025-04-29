import { SquareState, SquareType } from '../_types/square-type';

import SquareContent from './square-content';

import styles from './game.module.scss';

type Props = {
  winner: SquareState;
  currentMove: SquareType;
};

export default function Status({ winner, currentMove }: Props) {
  if (winner !== null) {
    return (
      <div className={styles.board__status}>
        Winner:&nbsp;
        <SquareContent
          value={winner}
          size={18}
        />
      </div>
    );
  }

  return (
    <div className={styles.board__status}>
      Next player:&nbsp;
      <SquareContent
        value={currentMove}
        size={18}
      />
    </div>
  );
}
