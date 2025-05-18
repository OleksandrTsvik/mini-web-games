import { Button } from '@/shared/ui/button';

type Props = {
  onClick: () => void;
};

export function RestartButton({ onClick }: Props) {
  return <Button onClick={onClick}>Нова гра</Button>;
}
