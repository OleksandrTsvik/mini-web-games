import { shuffle } from '@/shared/lib/random.utils';

import { SUDOKU_NUMBERS } from '../game.constants';

export function getRandomNumbers(): number[] {
  return shuffle(SUDOKU_NUMBERS);
}
