import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

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
  isDarkMode: boolean;
  theme: typeof lightTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  isDarkMode: false,
  theme: lightTheme,
  toggleTheme: () => {}
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDifferent');
    return savedTheme === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isDifferent', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ 
      isDark: isDarkMode,
      isDarkMode, 
      theme: currentTheme,
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
