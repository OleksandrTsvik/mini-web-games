type Props = {
  score: number;
  bestScore: number;
};

export function GameScore({ score, bestScore }: Props) {
  return (
    <>
      <div
        className="flex sm:flex-col items-center justify-between sm:justify-center grow sm:min-w-25
          py-2 sm:py-1.5 px-2 sm:px-4 gap-2 sm:gap-0
          text-white bg-neutral-500 dark:text-white dark:bg-neutral-500 rounded-lg"
      >
        <span className="uppercase font-medium text-[12px] leading-[12px]">Score</span>
        <span className="font-semibold sm:font-bold text-[18px] sm:text-[24px] leading-[18px] sm:leading-[24px]">
          {score}
        </span>
      </div>
      <div
        className="flex sm:flex-col items-center justify-between sm:justify-center grow sm:min-w-25
          py-2 sm:py-1.5 px-2 sm:px-4 gap-2 sm:gap-0
          text-white bg-neutral-400 dark:text-white dark:bg-neutral-600
          -outline-offset-2 outline-2 outline-neutral-500 dark:outline-neutral-500 rounded-lg"
      >
        <span className="uppercase font-medium text-[12px] leading-[12px]">Best</span>
        <span className="font-semibold sm:font-bold text-[18px] sm:text-[24px] leading-[18px] sm:leading-[24px]">
          {bestScore}
        </span>
      </div>
    </>
  );
}
