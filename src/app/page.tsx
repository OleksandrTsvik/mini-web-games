export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 4_000));

  return (
    <>
      <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">Mini web games</h1>
      <hr className="mt-6 w-full border-t border-zinc-950/10 dark:border-white/10" />
    </>
  );
}
