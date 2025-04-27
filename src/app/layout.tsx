import type { Metadata } from 'next';

import Footer from './footer';
import Navbar from './navbar';

import './globals.css';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Mini web games',
  description: 'Mini web games',
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
      <body className="flex min-h-svh w-full flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col lg:px-2">
          <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
            <div className="mx-auto max-w-6xl">{children}</div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
