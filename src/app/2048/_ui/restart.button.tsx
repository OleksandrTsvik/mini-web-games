import { ArrowClockwise } from '@phosphor-icons/react';

import { Button } from '@/shared/ui/button';

type Props = {
  onClick: () => void;
};

export function RestartButton({ onClick }: Props) {
  return (
    <Button
      icon={<ArrowClockwise weight="bold" />}
      variant="responsive-icon"
      color="white"
      onClick={onClick}
    >
      Нова гра
    </Button>
  );
}
