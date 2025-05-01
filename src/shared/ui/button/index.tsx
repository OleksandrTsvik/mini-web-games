import { classnames } from '@/shared/lib/class-names';
import { TailwindColor } from '@/tailwind/tailwind.types';

type Props<T extends React.ElementType> = React.ComponentPropsWithRef<T> & {
  component?: T;
  color?: TailwindColor;
  justify?: 'justify-start' | 'justify-end' | 'justify-center' | 'justify-between' | 'justify-around';
};

function getColor(text: string, color: TailwindColor, light: number, dark: number): string {
  return `${text} bg-${color}-${light} hover:bg-${color}-${light - 100} dark:bg-${color}-${dark} dark:hover:bg-${color}-${dark}/85`;
}

const colorMap: Record<TailwindColor, string> = {
  amber: getColor('text-amber-950', 'amber', 500, 400),
  blue: getColor('text-white', 'blue', 700, 600),
  cyan: getColor('text-cyan-950', 'cyan', 400, 300),
  emerald: getColor('text-white', 'emerald', 700, 600),
  fuchsia: getColor('text-white', 'fuchsia', 600, 500),
  green: getColor('text-white', 'green', 700, 600),
  indigo: getColor('text-white', 'indigo', 600, 500),
  lime: getColor('text-lime-950', 'lime', 400, 300),
  orange: getColor('text-white', 'orange', 600, 500),
  pink: getColor('text-white', 'pink', 600, 500),
  purple: getColor('text-white', 'purple', 600, 500),
  red: getColor('text-white', 'red', 700, 600),
  rose: getColor('text-white', 'rose', 600, 500),
  sky: getColor('text-white', 'sky', 600, 500),
  violet: getColor('text-white', 'violet', 600, 500),
  white: 'text-zinc-950 bg-white hover:bg-white/85',
  yellow: getColor('text-yellow-950', 'yellow', 400, 300),
  zinc: getColor('text-white', 'zinc', 900, 700),
};

export default function Button<T extends React.ElementType = 'button'>({
  component = 'button',
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
        'inline-flex items-center text-center gap-x-2 font-semibold text-base/6 sm:text-sm/6 align-middle select-none cursor-pointer shadow-sm hover:shadow-md disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed focus:shadow-none px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] border rounded-lg border-zinc-300 hover:border-zinc-300/80 dark:border-white/5 dark:hover:border-white/10',
        justify,
        colorMap[color as TailwindColor],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
