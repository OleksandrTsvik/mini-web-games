import { classnames } from '@/shared/lib/class-names';

import styles from './game.module.scss';

export function GameCell() {
  return <div className={classnames(styles.grid__cell, 'bg-neutral-400 dark:bg-neutral-700')} />;
}
