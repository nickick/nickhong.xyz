import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { childrenProps } from './utils/propTypes';

export const ThemeContext = createContext();

const serifFonts = ['Cormorant Garamond', 'serif'].join(',');
const sansSerifFonts = ['Red Hat Display', 'serif'].join(',');

const themeShared = {
  typography: {
    fontFamily: sansSerifFonts,
    h1: {
      fontFamily: serifFonts,
      fontSize: '8rem',
    },
    h2: {
      fontSize: '4rem',
      fontFamily: serifFonts,
    },
    overline: {
      fontFamily: serifFonts,
      fontSize: '2rem',
    },
    body: {
      fontSize: '2rem',
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
        disableGutters: true,
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          '&.Mui-focused': {
            color: 'rgba(255, 255, 255, 0.87)',
          },
          '&:after': {
            borderBottom: '1px solid white',
          },
          '&:autofill': {
            background: 'black',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          '&.Mui-focused': {
            color: 'rgba(255, 255, 255, 0.87)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
  },
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  ...themeShared,
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#36364B',
    },
    background: {
      default: '#080808',
    },
    text: {
      primary: '#ffffff',
    },
    mode: 'dark',
  },
  ...themeShared,
});

function getActiveTheme(themeMode) {
  return themeMode === 'light' ? lightTheme : darkTheme;
}

export default function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState(darkTheme);
  const [selectedTheme, setSelectedTheme] = useState('dark');

  const toggleTheme = useCallback(() => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';

    setSelectedTheme(desiredTheme);
  }, [selectedTheme]);

  const providerValue = useMemo(() => ({
    toggleTheme,
    selectedTheme,
  }), [toggleTheme, selectedTheme]);

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme));
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={providerValue}>
      <MUIThemeProvider theme={activeTheme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: childrenProps.isRequired,
};
