import { isNonNullable } from '@/shared/lib/type-guards';

import { Player } from '../_types/game.types';

import { GameSymbol } from './game-symbol';

type Props = {
  winner?: Player;
  isDraw: boolean;
  currentPlayer: Player;
};

export function GameStatus({ winner, isDraw, currentPlayer }: Props) {
  if (isNonNullable(winner)) {
    return (
      <>
        Переможець:&nbsp;
        <GameSymbol
          player={winner}
          size={18}
          weigth="bold"
        />
      </>
    );
  }

  if (isDraw) {
    return 'Нічия';
  }

  return (
    <>
      Хід:&nbsp;
      <GameSymbol
        player={currentPlayer}
        size={18}
        weigth="bold"
      />
    </>
  );
}
