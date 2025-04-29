import { classnames } from '@/shared/lib/class-names';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
};

function sizeMap(component: Props['as']): string {
  switch (component) {
    case 'h1':
      return 'text-2xl/8 sm:text-xl/8';
    case 'h2':
      return 'text-xl sm:text-lg';
    case 'h3':
      return 'text-lg sm:text-base';
    case 'h4':
      return 'text-base sm:text-sm';
    case 'h5':
      return 'text-sm sm:text-xs';
    default:
      return 'text-xs';
  }
}

export default function Heading({ as = 'h1', className, children, ...props }: Props) {
  const Component = as;
  const size = sizeMap(as);

  return (
    <Component
      className={classnames(size, 'font-semibold text-zinc-950 dark:text-white', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
