import { classnames } from '@/shared/lib/class-names';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
  color?: 'default' | 'blue' | 'green' | 'amber';
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

function colorMap(component: Props['color']): string {
  switch (component) {
    case 'blue':
      return 'text-blue-500';
    case 'green':
      return 'text-green-500';
    case 'amber':
      return 'text-amber-500';
    default:
      return 'text-zinc-950 dark:text-white';
  }
}

export default function Heading({ as = 'h1', color, className, children, ...props }: Props) {
  const Component = as;

  const sizeClassNames = sizeMap(as);
  const colorClassNames = colorMap(color);

  return (
    <Component
      className={classnames(sizeClassNames, colorClassNames, 'font-semibold', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
