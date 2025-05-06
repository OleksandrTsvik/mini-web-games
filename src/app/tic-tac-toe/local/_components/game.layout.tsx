import Divider from '@/shared/ui/divider';

import styles from './game.module.scss';

type Props = {
  header: React.ReactNode;
  settingsLink: React.ReactNode;
  humanSelector: React.ReactNode;
  status: React.ReactNode;
  board: React.ReactNode;
  actions: React.ReactNode;
};

export function GameLayout({ header, settingsLink, humanSelector, status, board, actions }: Props) {
  return (
    <>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {header}
        <div className="flex items-center gap-2">
          {humanSelector}
          {humanSelector && (
            <Divider
              className="h-6"
              type="horizontal"
            />
          )}
          {settingsLink}
        </div>
      </div>
      <Divider />
      <div className={styles.board__status}>{status}</div>
      <div className={styles.board}>{board}</div>
      <div className="text-center mt-5">{actions}</div>
    </>
  );
}
