import Image from 'next/image';
import Link from 'next/link';

import ThemeToggle from './theme-toggle';

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
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
