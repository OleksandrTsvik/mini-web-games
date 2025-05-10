import { ArrowClockwise } from '@phosphor-icons/react';

import Button from '@/shared/ui/button';

export function RestartButton() {
  return (
    <Button
      icon={<ArrowClockwise weight="bold" />}
      variant="responsive-icon"
      color="white"
    >
      Нова гра
    </Button>
  );
}
