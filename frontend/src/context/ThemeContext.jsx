import React, { useState, useEffect } from 'react';
import { ThemeContext, THEME_STORAGE_KEY } from './themeContextDef';

export function ThemeProvider({ children }) {
  // Mode can be 'spider-verse', 'dark', 'light', or 'system'
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'spider-verse' || saved === 'dark' || saved === 'light' || saved === 'system') {
        return saved;
      }
    } catch {
      // LocalStorage might be disabled or unavailable
    }
    return 'spider-verse'; // Spider-Verse is the approved visual direction
  });

  // Calculate resolved theme based on current mode and system preference
  const getResolvedTheme = (mode) => {
    if (mode === 'system') {
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'dark';
    }
    return mode;
  };

  const [resolvedTheme, setResolvedTheme] = useState(() => getResolvedTheme(themeMode));

  // Sync data-theme attribute on <html> and react to OS changes
  useEffect(() => {
    const updateTheme = () => {
      const active = getResolvedTheme(themeMode);
      setResolvedTheme(active);
      document.documentElement.setAttribute('data-theme', active);
      document.documentElement.style.colorScheme = active === 'light' ? 'light' : 'dark';
    };

    updateTheme();

    if (themeMode === 'system' && typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemChange = () => {
        updateTheme();
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemChange);
        return () => mediaQuery.removeEventListener('change', handleSystemChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleSystemChange);
        return () => mediaQuery.removeListener(handleSystemChange);
      }
    }
  }, [themeMode]);

  const setTheme = (mode) => {
    if (mode === 'spider-verse' || mode === 'dark' || mode === 'light' || mode === 'system') {
      setThemeMode(mode);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
      } catch {
        // Ignore localStorage write errors
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: themeMode, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
