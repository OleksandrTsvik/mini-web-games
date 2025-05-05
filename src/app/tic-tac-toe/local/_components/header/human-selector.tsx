import { classnames } from '@/shared/lib/class-names';
import Button from '@/shared/ui/button';

import { Player } from '../../game.types';
import { GameSymbol } from '../game-symbol';

type Props = {
  humanPlayer: Player;
  onClick: (player: Player) => void;
};

export function HumanSelector({ humanPlayer, onClick }: Props) {
  return (
    <>
      {[Player.X, Player.O].map((player) => (
        <Button
          key={player}
          className={classnames({ 'outline-2 outline-blue-500': player === humanPlayer })}
          icon
          onClick={() => onClick(player)}
        >
          <GameSymbol
            player={player}
            size={20}
          />
        </Button>
      ))}
    </>
  );
}
