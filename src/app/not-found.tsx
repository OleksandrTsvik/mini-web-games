import { CaretLeft } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export default function RootNotFoundPage() {
  return (
    <div className="text-center">
      <h2 className="mb-8 font-extrabold text-9xl dark:text-zinc-400">
        <span className="sr-only">Error</span>404
      </h2>
      <h1 className="mt-4 text-5xl sm:text-7xl font-semibold tracking-tight text-balance text-zinc-950 dark:text-white">
        Page not found
      </h1>
      <p className="mt-6 text-lg sm:text-xl/8 font-medium text-pretty text-zinc-500 dark:text-zinc-400">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="/"
          className="px-3.5 py-2.5 inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold border-transparent bg-(--btn-border) dark:bg-(--btn-bg) dark:border-white/5 text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10 dark:text-white dark:[--btn-bg:var(--color-zinc-600)] dark:[--btn-hover-overlay:var(--color-white)]/5"
        >
          <CaretLeft weight="bold" />
          Go back home
        </Link>
      </div>
    </div>
  );
}
