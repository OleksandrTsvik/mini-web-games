export function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement<TElement>(array: TElement[]): TElement {
  const index = Math.floor(Math.random() * array.length);

  return array[index];
}
