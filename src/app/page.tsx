import { Divider } from '@/shared/ui/divider';
import { Heading } from '@/shared/ui/heading';

import { Games } from './_ui';

export default function HomePage() {
  return (
    <>
      <Heading>Mini web games</Heading>
      <Divider />
      <Games />
    </>
  );
}
