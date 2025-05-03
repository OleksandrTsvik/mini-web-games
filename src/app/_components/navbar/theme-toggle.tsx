'use client';

import { Monitor, Moon, Sun } from '@phosphor-icons/react/dist/ssr';
import { useTheme } from 'next-themes';

import useMounted from '@/hooks/use-mounted';

import ThemeButton from './theme.button';

export default function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme, systemTheme } = useTheme();

  const isDark = theme === 'dark' || ((!theme || theme === 'system') && systemTheme === 'dark');

  const handleToggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  if (!mounted) {
    return (
      <ThemeButton>
        <Monitor size={24} />
      </ThemeButton>
    );
  }

  return <ThemeButton onClick={handleToggleTheme}>{isDark ? <Moon size={24} /> : <Sun size={24} />}</ThemeButton>;
}
