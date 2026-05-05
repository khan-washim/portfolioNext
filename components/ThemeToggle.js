'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle({ className = '' }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 animate-pulse ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200 group ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5">
        <Sun
          size={18}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100 text-amber-500'
          }`}
        />
        <Moon
          size={18}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100 text-indigo-400' : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
      </div>
    </button>
  );
}