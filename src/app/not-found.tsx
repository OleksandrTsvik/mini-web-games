import { CaretLeft } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export default function RootNotFoundPage() {
  return (
    <div className="text-center">
      <h2 className="mb-8 font-extrabold text-9xl dark:text-zinc-400">
        <span className="sr-only">Помилка</span>404
      </h2>
      <h1 className="mt-4 text-5xl sm:text-7xl font-semibold tracking-tight text-balance text-zinc-950 dark:text-white">
        Сторінку не знайдено
      </h1>
      <p className="mt-6 text-lg sm:text-xl/8 font-medium text-pretty text-zinc-500 dark:text-zinc-400">
        Неправильно набрано адресу або такої сторінки на сайті не існує.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="/"
          className="px-3.5 py-2.5 inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold border-transparent bg-zinc-900 dark:bg-zinc-600 text-white dark:text-white hover:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          <CaretLeft weight="bold" />
          Перейти на головну сторінку
        </Link>
      </div>
    </div>
  );
}
