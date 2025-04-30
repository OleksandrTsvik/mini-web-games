'use client';

import useGameState from '../_hooks/use-game-state';

import Board from './board';
import ResetButton from './reset-button';
import Status from './status';

export default function Game() {
  const { squares, currentMove, winner, winnerSequence, isDraw, handleSquareClick, handleReset } = useGameState();

  return (
    <>
      <Status
        winner={winner}
        isDraw={isDraw}
        currentMove={currentMove}
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
