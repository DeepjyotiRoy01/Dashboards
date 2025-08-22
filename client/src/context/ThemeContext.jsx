import { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  default: {
    name: 'Default',
    primary: '#1976d2',
    secondary: '#dc004e',
  },
  ocean: {
    name: 'Ocean Blue',
    primary: '#0277bd',
    secondary: '#00acc1',
  },
  forest: {
    name: 'Forest Green',
    primary: '#388e3c',
    secondary: '#689f38',
  },
  sunset: {
    name: 'Sunset Orange',
    primary: '#f57c00',
    secondary: '#ff5722',
  },
  purple: {
    name: 'Royal Purple',
    primary: '#7b1fa2',
    secondary: '#8e24aa',
  },
  minimal: {
    name: 'Minimal Gray',
    primary: '#424242',
    secondary: '#616161',
  },
};

const createCustomTheme = (themeConfig) => {
  const selectedTheme = themes[themeConfig.theme] || themes.default;
  
  return createTheme({
    palette: {
      mode: themeConfig.darkMode ? 'dark' : 'light',
      primary: {
        main: selectedTheme.primary,
      },
      secondary: {
        main: selectedTheme.secondary,
      },
      background: {
        default: themeConfig.darkMode ? '#0a0e27' : '#f5f5f5',
        paper: themeConfig.darkMode ? '#1e293b' : '#ffffff',
      },
    },
    typography: {
      fontSize: themeConfig.fontSize || 14,
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: themeConfig.borderRadius || 8,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: themeConfig.borderRadius || 8,
            transition: themeConfig.animations ? 'all 0.3s ease-in-out' : 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: themeConfig.borderRadius || 8,
            transition: themeConfig.animations ? 'all 0.3s ease-in-out' : 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: themeConfig.borderRadius || 8,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: themeConfig.borderRadius || 8,
            margin: themeConfig.compactMode ? '2px 4px' : '4px 8px',
            padding: themeConfig.compactMode ? '6px 12px' : '8px 16px',
          },
        },
      },
    },
  });
};

export const ThemeProvider = ({ children }) => {
  const [themeConfig, setThemeConfig] = useState({
    theme: 'default',
    darkMode: false,
    fontSize: 14,
    borderRadius: 8,
    animations: true,
    compactMode: false,
    accentColor: '#1976d2',
  });

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeConfig');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setThemeConfig(parsedTheme);
      } catch (error) {
        console.error('Error parsing saved theme:', error);
      }
    }
  }, []);

  const updateTheme = (newConfig) => {
    const updatedConfig = { ...themeConfig, ...newConfig };
    setThemeConfig(updatedConfig);
    localStorage.setItem('themeConfig', JSON.stringify(updatedConfig));
  };

  const resetTheme = () => {
    const defaultConfig = {
      theme: 'default',
      darkMode: false,
      fontSize: 14,
      borderRadius: 8,
      animations: true,
      compactMode: false,
      accentColor: '#1976d2',
    };
    setThemeConfig(defaultConfig);
    localStorage.setItem('themeConfig', JSON.stringify(defaultConfig));
  };

  const muiTheme = createCustomTheme(themeConfig);

  const value = {
    themeConfig,
    updateTheme,
    resetTheme,
    themes,
    currentTheme: themes[themeConfig.theme] || themes.default,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;