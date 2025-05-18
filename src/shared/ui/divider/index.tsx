import { classnames } from '@/shared/lib/class-names';

type DividerType = 'horizontal' | 'vertical';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement> & {
  type?: DividerType;
};

const typeMap: Record<DividerType, string> = {
  horizontal: 'w-px bg-zinc-950/10 dark:bg-white/10',
  vertical: 'w-full border-t border-zinc-950/10 dark:border-white/10 my-6',
};

export function Divider({ type = 'vertical', className, ...props }: Props) {
  return (
    <div
      className={classnames(typeMap[type], className)}
      role="separator"
      {...props}
    />
  );
}
