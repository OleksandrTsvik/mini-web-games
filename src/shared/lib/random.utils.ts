export function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement<TElement>(array: TElement[]): TElement {
  const randomIndex = getRandomIndex(array);

  return array[randomIndex];
}

export function getRandomIndex<TElement>(array: TElement[]): number {
  return Math.floor(Math.random() * array.length);
}

/**
 * Fisher–Yates shuffle
 */
export function shuffle<TElement>(array: TElement[]): TElement[];
export function shuffle<TElement>(array: TElement[], mutate: true): void;
export function shuffle<TElement>(array: TElement[], mutate?: true): TElement[] | void {
  const target = mutate ? array : [...array];

  for (let i = target.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [target[i], target[randomIndex]] = [target[randomIndex], target[i]];
  }

  if (!mutate) {
    return target;
  }
}
