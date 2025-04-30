import { Nullable } from '../types';

import { isString } from './type-guards';

type ClassName = Nullable<string | Record<string, Nullable<boolean>>>;

export function classnames(...classNames: ClassName[]): string {
  const classes: string[] = [];

  for (let i = 0; i < classNames.length; i++) {
    const className = classNames[i];

    if (!className) {
      continue;
    }

    if (isString(className)) {
      classes.push(className);
      continue;
    }

    const filteredClassNames = Object.entries(className)
      .filter(([className, condition]) => className && condition)
      .map(([className]) => className);

    classes.push(...filteredClassNames);
  }

  return classes.join(' ');
}
