import { classnames } from '@/shared/lib/class-names';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>;

export default function Divider({ className, ...props }: Props) {
  return (
    <hr
      className={classnames('w-full border-t border-zinc-950/10 dark:border-white/10 my-6', className)}
      {...props}
    />
  );
}
