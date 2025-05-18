import { CaretLeft } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

import { Button } from '@/shared/ui/button';

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
        <Button
          component={Link}
          href="/"
        >
          <CaretLeft weight="bold" />
          Перейти на головну сторінку
        </Button>
      </div>
    </div>
  );
}
