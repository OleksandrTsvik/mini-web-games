import type { Metadata } from 'next';

import { Game } from './_ui';

export const metadata: Metadata = {
  title: '15 Puzzle',
  description: '15 Puzzle | 15 головоломка - пересувайте плитки, щоб розташувати їх у зростаючому порядку.',
};

export default function FifteenPuzzlePage() {
  return <Game />;
}
