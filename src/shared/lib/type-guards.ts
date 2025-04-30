import { None } from '../types';

export function isNone(value: unknown): value is None {
  return value === null || value === undefined;
}

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isObject(value: unknown): value is object {
  return isNonNullable(value) && typeof value === 'object' && !Array.isArray(value);
}

export function isArrayOfStrings(value: unknown): value is string[] {
  return isArrayOf<string>(value, isString);
}

export function isArrayOf<T>(value: unknown, check: (val: unknown) => val is T): value is T[] {
  return Array.isArray(value) && value.every(check);
}
