type Props = React.PropsWithChildren;

export default function Main({ children }: Props) {
  return (
    <main className="flex flex-1 flex-col lg:px-2">
      <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </main>
  );
}
