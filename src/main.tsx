import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Routes from './routes';
import './i18n';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Provider store={store}>
        <Routes setDarkMode={setDarkMode} darkMode={darkMode} />
      </Provider>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
