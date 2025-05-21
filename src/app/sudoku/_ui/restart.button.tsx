import { Button } from '@/shared/ui/button';

type Props = {
  onClick: () => void;
};

export function RestartButton({ onClick }: Props) {
  return (
    <Button
      className="col-span-full"
      color="lime"
      onClick={onClick}
    >
      Нова гра
    </Button>
  );
}
