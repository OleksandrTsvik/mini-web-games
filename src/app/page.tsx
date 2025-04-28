import Divider from '@/shared/ui/divider';

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 4_000));

  return (
    <>
      <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">Mini web games</h1>
      <Divider className="mt-6" />
    </>
  );
}
