type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ThemeButton({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="flex items-center rounded-lg p-2 text-base/6 font-medium text-zinc-950 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 cursor-pointer"
      type="button"
    >
      {children}
    </button>
  );
}
