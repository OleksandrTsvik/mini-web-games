import Divider from '@/shared/ui/divider';

type Props = {
  header: React.ReactNode;
  board: React.ReactNode;
  actions: React.ReactNode;
};

export function GameLayout({ header, board, actions }: Props) {
  return (
    <>
      {header}
      <Divider />
      {board}
      <div className="text-center mt-5">{actions}</div>
    </>
  );
}
