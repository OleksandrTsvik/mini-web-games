import { Divider } from '@/shared/ui/divider';
import { Heading } from '@/shared/ui/heading';
import { KeyboardArrowsIcon } from '@/shared/ui/icons/keyboard-arrows.icon';

type Props = {
  title: string;
};

export function HeadingWithGameControls({ title }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Heading>{title}</Heading>
      <Divider
        className="hidden xs:block h-6"
        type="horizontal"
      />
      <KeyboardArrowsIcon className="hidden xs:block text-black dark:text-white size-10" />
    </div>
  );
}
