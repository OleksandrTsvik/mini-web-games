import { classnames } from '@/shared/lib/class-names';

type Props<T extends React.ElementType> = React.ComponentPropsWithRef<T> & {
  component?: T;
};

export default function Button<T extends React.ElementType = 'button'>({
  component = 'button',
  className,
  children,
  ...props
}: Props<T>) {
  const Component = component;

  return (
    <Component
      className={classnames(
        'inline-flex items-center justify-center gap-x-2 font-semibold text-base/6 sm:text-sm/6 align-middle select-none text-center cursor-pointer disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed  focus:shadow-none px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] hover:shadow-md border border-zinc-950/90 rounded-lg dark:border-white/5 hover:border-white/10 text-white bg-zinc-900 dark:bg-zinc-600 hover:bg-zinc-900/90 dark:hover:bg-zinc-600/90',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
