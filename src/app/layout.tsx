import type { Metadata } from 'next';

import { Footer, Main, Navbar } from './_ui';
import { Providers } from './providers';

import '@/theme/globals.css';

type Props = React.PropsWithChildren;

export const metadata: Metadata = {
  title: 'Mini web games',
  description: 'Mini web games',
};

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className="bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950"
      suppressHydrationWarning
    >
      <body className="flex min-h-svh w-full flex-col">
        <Providers>
          <Navbar />
          <Main>{children}</Main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
