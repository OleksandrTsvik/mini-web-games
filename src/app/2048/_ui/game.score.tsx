type Props = {
  score: number;
  bestScore: number;
};

export function GameScore({ score, bestScore }: Props) {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-w-20 py-1.5 px-4
          text-white bg-neutral-500 dark:text-white dark:bg-neutral-500 rounded-lg"
      >
        <span className="uppercase font-medium text-[12px] leading-[12px]">Score</span>
        <span className="font-bold text-[24px] leading-[24px]">{score}</span>
      </div>
      <div
        className="flex flex-col items-center justify-center min-w-20 py-1.5 px-4
          text-white bg-neutral-400 dark:text-white dark:bg-neutral-600
          -outline-offset-2 outline-2 outline-neutral-500 dark:outline-neutral-500 rounded-lg"
      >
        <span className="uppercase font-medium text-[12px] leading-[12px]">Best</span>
        <span className="font-bold text-[24px] leading-[24px]">{bestScore}</span>
      </div>
    </>
  );
}
