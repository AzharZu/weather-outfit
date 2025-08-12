import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export const lightTheme = {
  background: '#fafafa',
  cardBg: '#ffffff',
  text: '#262626',
  textSecondary: '#8e8e8e',
  border: '#dbdbdb',
  shadow: 'rgba(0, 0, 0, 0.04)',
  accent: '#0095f6',
  surface: '#f8f9fa',
  muted: '#f5f5f5',
  primary: '#405de6',
  success: '#00ba7c',
  warning: '#ffb800',
  error: '#ed4956'
};

export const darkTheme = {
  background: '#000000',
  cardBg: '#1a1a1a',
  text: '#ffffff',
  textSecondary: '#a8a8a8',
  border: '#262626',
  shadow: 'rgba(0, 0, 0, 0.2)',
  accent: '#0095f6',
  surface: '#121212',
  muted: '#262626',
  primary: '#5b51d8',
  success: '#00ba7c',
  warning: '#ffb800',
  error: '#ed4956'
};

interface ThemeContextType {
  isDark: boolean;
  theme: typeof lightTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('weatherfit-theme');
    return saved === 'dark';
  });

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('weatherfit-theme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif';
    document.body.style.background = theme.background;
    document.body.style.minHeight = '100vh';
    document.body.style.transition = 'all 0.3s ease';
    document.body.style.color = theme.text;
    document.body.style.fontWeight = '400';
    document.body.style.lineHeight = '1.5';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
