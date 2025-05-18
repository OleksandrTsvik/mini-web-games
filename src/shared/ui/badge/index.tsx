import { classnames } from '@/shared/lib/class-names';
import { Color } from '@/theme';

export type BadgeColor = Exclude<Color, 'white'>;

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
  color?: BadgeColor;
};

const colorMap: Record<BadgeColor, string> = {
  amber:
    'bg-amber-400/20 text-amber-700 hover:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:hover:bg-amber-400/15',
  blue: 'bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:text-blue-400 dark:hover:bg-blue-500/25',
  cyan: 'bg-cyan-400/20 text-cyan-700 hover:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:hover:bg-cyan-400/15',
  emerald:
    'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20',
  fuchsia:
    'bg-fuchsia-400/15 text-fuchsia-700 hover:bg-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:hover:bg-fuchsia-400/20',
  green:
    'bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20',
  indigo: 'bg-indigo-500/15 text-indigo-700 hover:bg-indigo-500/25 dark:text-indigo-400 dark:hover:bg-indigo-500/20',
  lime: 'bg-lime-400/20 text-lime-700 hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:hover:bg-lime-400/15',
  orange:
    'bg-orange-500/15 text-orange-700 hover:bg-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20',
  pink: 'bg-pink-400/15 text-pink-700 hover:bg-pink-400/25 dark:bg-pink-400/10 dark:text-pink-400 dark:hover:bg-pink-400/20',
  purple: 'bg-purple-500/15 text-purple-700 hover:bg-purple-500/25 dark:text-purple-400 dark:hover:bg-purple-500/20',
  red: 'bg-red-500/15 text-red-700 hover:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20',
  rose: 'bg-rose-400/15 text-rose-700 hover:bg-rose-400/25 dark:bg-rose-400/10 dark:text-rose-400 dark:hover:bg-rose-400/20',
  sky: 'bg-sky-500/15 text-sky-700 hover:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/20',
  violet: 'bg-violet-500/15 text-violet-700 hover:bg-violet-500/25 dark:text-violet-400 dark:hover:bg-violet-500/20',
  yellow:
    'bg-yellow-400/20 text-yellow-700 hover:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:hover:bg-yellow-400/15',
  zinc: 'bg-zinc-600/10 text-zinc-700 hover:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10',
};

export function Badge({ color, className, children, ...props }: Props) {
  return (
    <span
      className={classnames(
        'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
        colorMap[color as BadgeColor],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
