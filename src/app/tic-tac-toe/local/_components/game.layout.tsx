import Divider from '@/shared/ui/divider';

import styles from './game.module.scss';

type Props = {
  header: React.ReactNode;
  headerActions: React.ReactNode;
  status: React.ReactNode;
  squares: React.ReactNode;
  actions: React.ReactNode;
};

export function GameLayout({ header, headerActions, status, squares, actions }: Props) {
  return (
    <>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {header}
        <div>{headerActions}</div>
      </div>
      <Divider />
      <div className={styles.board__status}>{status}</div>
      <div className={styles.board}>{squares}</div>
      <div className="text-center mt-5">{actions}</div>
    </>
  );
}
