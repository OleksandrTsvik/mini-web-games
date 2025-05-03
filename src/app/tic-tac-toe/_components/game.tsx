'use client';

import useGameState from '../_hooks/use-game-state';
import { BotLevel } from '../_types/game.types';

import Board from './board';
import ResetButton from './reset.button';
import Status from './status';

type Props = {
  botLevel?: BotLevel;
};

export default function Game({ botLevel }: Props) {
  const { squares, currentPlayer, winner, winnerSequence, isDraw, handleSquareClick, handleReset } =
    useGameState(botLevel);

  return (
    <>
      <Status
        winner={winner}
        isDraw={isDraw}
        currentPlayer={currentPlayer}
      />
      <Board
        winner={winner}
        squares={squares}
        winnerSequence={winnerSequence}
        onSquareClick={handleSquareClick}
      />
      <div className="text-center mt-5">
        <ResetButton onClick={handleReset} />
      </div>
    </>
  );
}
