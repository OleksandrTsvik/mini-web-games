'use client';

import { ROUTING } from '@/app/routing';
import { isNonNullable } from '@/shared/lib/type-guards';

import { useGameState } from '../_hooks/use-game-state';
import { BotLevel } from '../game.types';

import { GameSquare } from './game-square';
import { GameStatus } from './game-status';
import { GameLayout } from './game.layout';
import { GameTitle } from './header/game.title';
import { HumanSelector } from './header/human-selector';
import { SettingsLink } from './header/settings.link';
import { RestartButton } from './restart.button';

type Props = {
  botLevel?: BotLevel;
};

export function Game({ botLevel }: Props) {
  const {
    humanPlayer,
    botPlayer,
    squares,
    currentPlayer,
    winner,
    winnerSequence,
    isDraw,
    handleHumanPlayerChange,
    handleSquareClick,
    handleRestart,
  } = useGameState(botLevel);

  return (
    <GameLayout
      header={<GameTitle botLevel={botLevel} />}
      settingsLink={<SettingsLink href={ROUTING.TIC_TAC_TOE} />}
      humanSelector={
        isNonNullable(botPlayer) ? (
          <HumanSelector
            humanPlayer={humanPlayer}
            onClick={handleHumanPlayerChange}
          />
        ) : null
      }
      status={
        <GameStatus
          winner={winner}
          isDraw={isDraw}
          currentPlayer={currentPlayer}
        />
      }
      board={squares.map((square, index) => (
        <GameSquare
          key={index}
          value={square}
          isWinner={winnerSequence?.includes(index)}
          disabled={isNonNullable(square) || isNonNullable(winner)}
          onClick={() => handleSquareClick(index)}
        />
      ))}
      actions={<RestartButton onClick={handleRestart} />}
    />
  );
}
