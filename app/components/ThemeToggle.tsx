'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
      aria-label="Cambiar tema"
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 50,
        padding: '.5rem 1rem',
        borderRadius: '.75rem',
        border: '1px solid var(--border)',
        background: 'var(--card)',
        color: 'var(--fg)',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '.85rem',
        boxShadow: '0 2px 8px var(--shadow)',
        transition: 'all .2s ease',
      }}
    >
      {theme === 'light' ? 'Tokyo Night' : 'Solaris Light'}
    </button>
  );
}
