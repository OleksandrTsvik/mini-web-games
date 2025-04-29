import { SquareState } from '../_types/square-type';

import SquareContent from './square-content';

import styles from './game.module.scss';

type Props = {
  value: SquareState;
  onClick: () => void;
};

export default function Square({ value, onClick }: Props) {
  return (
    <button
      className={styles.board__square}
      onClick={onClick}
    >
      {value !== null && <SquareContent value={value} />}
    </button>
  );
}
