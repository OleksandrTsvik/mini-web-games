import { Faders } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

import Button from '@/shared/ui/button';

type Props = {
  href: string;
};

export function SettingsLink({ href }: Props) {
  return (
    <Button
      component={Link}
      href={href}
      icon
    >
      <Faders size={18} />
    </Button>
  );
}
