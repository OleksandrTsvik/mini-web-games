import { ThemeProvider } from 'next-themes';

type Props = React.PropsWithChildren;

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="system"
    >
      {children}
    </ThemeProvider>
  );
}
