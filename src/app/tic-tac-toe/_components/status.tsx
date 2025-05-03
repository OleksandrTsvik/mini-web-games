import { isNonNullable } from '@/shared/lib/type-guards';

import { Player, SquareState } from '../_types/game.types';

import GameSymbol from './game-symbol';

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
        <GameSymbol
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
      <GameSymbol
        player={currentPlayer}
        size={18}
        weigth="bold"
      />
    </div>
  );
}
