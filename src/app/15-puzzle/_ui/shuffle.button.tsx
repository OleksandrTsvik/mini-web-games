import Button from '@/shared/ui/button';

type Props = {
  onClick: () => void;
};

export function ShuffleButton({ onClick }: Props) {
  return (
    <Button
      color="amber"
      onClick={onClick}
    >
      Перемішати
    </Button>
  );
}
