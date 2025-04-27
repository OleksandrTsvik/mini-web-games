import { Moon, Sun } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/logo.svg';

export default function Navbar() {
  return (
    <header className="flex items-center px-4">
      <div className="min-w-0 flex-1">
        <nav className="flex flex-1 items-center gap-4 py-2.5">
          <Link href="/">
            <Image priority src={logo} height={40} alt="Logo" />
          </Link>
          <div aria-hidden="true" className="-ml-4 flex-1" />
          <div className="flex items-center gap-3">
            <button
              className="flex items-center rounded-lg p-2 text-base/6 font-medium text-zinc-950 dark:text-white hover:bg-zinc-500 dark:hover:bg-zinc-900 cursor-pointer"
              type="button"
            >
              <Moon size={24} />
              <Sun size={24} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
