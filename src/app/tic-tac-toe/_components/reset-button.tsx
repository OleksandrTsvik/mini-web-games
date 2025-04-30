import Button from '@/shared/ui/button';

type Props = {
  onClick: () => void;
};

export default function ResetButton({ onClick }: Props) {
  return <Button onClick={onClick}>Спочатку</Button>;
}
