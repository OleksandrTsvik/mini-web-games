'use client';

export default function RootErrorPage() {
  return (
    <div className="text-center">
      <h2 className="mb-8 font-extrabold text-9xl dark:text-zinc-400">
        <span className="sr-only">Error</span>500
      </h2>
      <h1 className="mt-4 text-5xl sm:text-7xl font-semibold tracking-tight text-balance text-zinc-950 dark:text-white">
        Internal Server Error
      </h1>
      <p className="mt-6 text-lg sm:text-xl/8 font-medium text-pretty text-zinc-500 dark:text-zinc-400">
        We are already working to solve the problem.
      </p>
    </div>
  );
}
