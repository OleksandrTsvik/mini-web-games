import { classnames } from '@/shared/lib/class-names';
import { Color } from '@/theme';

type Props<T extends React.ElementType> = React.ComponentPropsWithRef<T> & {
  component?: T;
  icon?: boolean;
  color?: Color;
  justify?: 'justify-start' | 'justify-end' | 'justify-center' | 'justify-between' | 'justify-around';
};

const colorMap: Record<Color, string> = {
  amber: 'text-amber-950 bg-amber-500 hover:bg-amber-400 dark:bg-amber-400 dark:hover:bg-amber-400/85',
  blue: 'text-white bg-blue-700 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-600/85',
  cyan: 'text-cyan-950 bg-cyan-400 hover:bg-cyan-300 dark:bg-cyan-300 dark:hover:bg-cyan-300/85',
  emerald: 'text-white bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-600/85',
  fuchsia: 'text-white bg-fuchsia-600 hover:bg-fuchsia-500 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-500/85',
  green: 'text-white bg-green-700 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-600/85',
  indigo: 'text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-500/85',
  lime: 'text-lime-950 bg-lime-400 hover:bg-lime-300 dark:bg-lime-300 dark:hover:bg-lime-300/85',
  orange: 'text-white bg-orange-600 hover:bg-orange-500 dark:bg-orange-500 dark:hover:bg-orange-500/85',
  pink: 'text-white bg-pink-600 hover:bg-pink-500 dark:bg-pink-500 dark:hover:bg-pink-500/85',
  purple: 'text-white bg-purple-600 hover:bg-purple-500 dark:bg-purple-500 dark:hover:bg-purple-500/85',
  red: 'text-white bg-red-700 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-600/85',
  rose: 'text-white bg-rose-600 hover:bg-rose-500 dark:bg-rose-500 dark:hover:bg-rose-500/85',
  sky: 'text-white bg-sky-600 hover:bg-sky-600 dark:bg-sky-500 dark:hover:bg-sky-500/85',
  violet: 'text-white bg-violet-600 hover:bg-violet-500 dark:bg-violet-500 dark:hover:bg-violet-500/85',
  white: 'text-zinc-950 bg-white hover:bg-white/85',
  yellow: 'text-yellow-950 bg-yellow-400 hover:bg-yellow-300 dark:bg-yellow-300 dark:hover:bg-yellow-300/85',
  zinc: 'text-white bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-700/85',
};

export default function Button<T extends React.ElementType = 'button'>({
  component = 'button',
  icon,
  color = 'zinc',
  justify = 'justify-center',
  className,
  children,
  ...props
}: Props<T>) {
  const Component = component;

  return (
    <Component
      className={classnames(
        'inline-flex items-center text-center gap-x-2 font-semibold align-middle select-none cursor-pointer shadow-sm hover:shadow-md disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed focus:shadow-none border rounded-lg border-zinc-300/30 hover:border-zinc-300/60 dark:border-white/5 dark:hover:border-white/10',
        {
          'text-base/6 sm:text-sm/6 px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]':
            !icon,
          'p-2.5 sm:p-2': icon,
        },
        justify,
        colorMap[color as Color],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
