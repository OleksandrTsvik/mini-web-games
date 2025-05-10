import type { Metadata } from 'next';

import { Game } from './_ui';

export const metadata: Metadata = {
  title: '2048',
  description:
    'Гра 2048 – популярна логічна головоломка!' +
    ' Поєднуйте плитки з однаковими числами на дошці 4x4, щоб досягти 2048.' +
    ' Плануйте ходи, розвивайте логіку та досягайте нових рекордів.',
};

export default function Game2048Page() {
  return <Game />;
}
