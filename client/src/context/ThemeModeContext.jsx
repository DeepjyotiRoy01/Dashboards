import { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

const ThemeModeContext = createContext({
  toggleThemeMode: () => {},
  theme: {}
});

export const useThemeModeContext = () => useContext(ThemeModeContext);

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const storedMode = localStorage.getItem('themeMode');
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  const toggleThemeMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              // Light mode colors
              primary: {
                main: '#6366f1',
                light: '#818cf8',
                dark: '#4f46e5',
              },
              secondary: {
                main: '#10b981',
                light: '#34d399',
                dark: '#059669',
              },
              background: {
                default: '#f1f5f9',
                paper: 'rgba(255, 255, 255, 0.7)',
              },
              text: {
                primary: '#1e293b',
                secondary: '#64748b',
              },
              divider: 'rgba(0, 0, 0, 0.08)',
            }
          : {
              // Dark mode colors
              primary: {
                main: '#818cf8',
                light: '#a5b4fc',
                dark: '#4f46e5',
              },
              secondary: {
                main: '#34d399',
                light: '#6ee7b7',
                dark: '#059669',
              },
              background: {
                default: '#0f172a',
                paper: 'rgba(15, 23, 42, 0.7)',
              },
              text: {
                primary: '#f8fafc',
                secondary: '#94a3b8',
              },
              divider: 'rgba(255, 255, 255, 0.08)',
            }),
      },
      typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
          fontWeight: 600,
        },
        h2: {
          fontWeight: 600,
        },
        h3: {
          fontWeight: 600,
        },
        h4: {
          fontWeight: 600,
        },
        h5: {
          fontWeight: 600,
        },
        h6: {
          fontWeight: 600,
        },
        button: {
          fontWeight: 500,
          textTransform: 'none',
        },
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              background: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              border: mode === 'light' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: mode === 'light' 
                ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                boxShadow: mode === 'light'
                  ? '0 8px 32px 0 rgba(31, 38, 135, 0.47)'
                  : '0 8px 32px 0 rgba(0, 0, 0, 0.47)',
                transform: 'translateY(-5px)',
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
              padding: '8px 16px',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-2px)',
              },
            },
            containedPrimary: {
              background: 'linear-gradient(45deg, #6366f1 30%, #818cf8 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
              },
            },
            containedSecondary: {
              background: 'linear-gradient(45deg, #10b981 30%, #34d399 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #059669 30%, #10b981 90%)',
              },
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: mode === 'light' ? '#6366f1' : '#818cf8',
                  borderWidth: '2px',
                },
              },
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              background: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
              backdropFilter: 'blur(10px)',
              boxShadow: 'none',
              borderBottom: mode === 'light' ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              background: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRight: mode === 'light' ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              background: mode === 'light' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              color: mode === 'light' ? '#f8fafc' : '#1e293b',
              backdropFilter: 'blur(4px)',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '0.75rem',
              fontWeight: 500,
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ toggleThemeMode, theme }}>
      {children}
    </ThemeModeContext.Provider>
  );
}