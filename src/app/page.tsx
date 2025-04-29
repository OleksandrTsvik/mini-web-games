import Divider from '@/shared/ui/divider';
import Heading from '@/shared/ui/heading';

import Games from './_components/games/games';

export default function HomePage() {
  return (
    <>
      <Heading>Mini web games</Heading>
      <Divider />
      <Games />
    </>
  );
}
