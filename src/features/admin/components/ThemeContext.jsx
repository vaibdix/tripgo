import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true; // Default to dark mode
  });

  // Add accent color state
  const [accentColor, setAccentColor] = useState(() => {
    const savedColor = localStorage.getItem('accentColor');
    return savedColor || '#7C3AED'; // Default purple
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('accentColor', accentColor);
  }, [accentColor]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        accentColor,
        setAccentColor,
        colors: {
          background: darkMode ? '#0F1117' : '#F8F9FC',
          paper: darkMode ? '#222427' : '#FFFFFF',
          sidebar: darkMode ? '#222427' : '#FFFFFF',
          divider: darkMode ? '#2D3348' : '#E5E7EB',
          text: darkMode ? '#FFFFFF' : '#111827',
          textSecondary: darkMode ? '#9CA3AF' : '#6B7280',
          menuHover: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
          menuSelected: darkMode ? `${accentColor}20` : `${accentColor}10`,
          cardBg: darkMode ? '#252836' : '#FFFFFF',
          headerBg: darkMode ? '#222427' : '#F8F9FC',
          timeline: {
            line: darkMode ? '#2D3348' : '#E5E7EB',
            marker: darkMode ? '#3E4359' : '#D1D5DB',
          },
          button: {
            primary: accentColor,
            hover: darkMode ? `${accentColor}CC` : `${accentColor}E6`,
            text: '#FFFFFF',
          },
          input: {
            background: darkMode ? '#252836' : '#F5F7FA',
            border: darkMode ? '#2D3348' : '#E5E7EB',
            placeholder: darkMode ? '#6B7280' : '#9CA3AF',
          },
          card: {
            background: darkMode ? '#252836' : '#FFFFFF',
            border: darkMode ? '#2D3348' : '#E5E7EB',
            shadow: darkMode ? '0 4px 12px rgba(0, 0, 0, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
            hover: darkMode ? '#2F3446' : '#F9FAFB',
          },
          status: {
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6',
          },
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
