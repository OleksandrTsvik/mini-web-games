'use client';

import useGameState from '../_hooks/use-game-state';
import { easyBot } from '../_lib/easy.bot';
// import { hardBot } from '../_lib/hard.bot';
// import { mediumBot } from '../_lib/medium.bot';

import Board from './board';
import ResetButton from './reset-button';
import Status from './status';

export default function Game() {
  const { squares, currentPlayer, winner, winnerSequence, isDraw, handleSquareClick, handleReset } =
    useGameState(easyBot);

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
