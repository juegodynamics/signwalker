import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Page from './app/nav';
import Signimator from './app/pages/signimator';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#93d7ff',
    },
    secondary: {
      main: '#de2caa',
    },
    info: {
      main: '#101010',
    },
    background: {
      default: '#303030',
    },
  },
  typography: {
    fontFamily: [
      'SuttonSignWritingOneD',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Page>
        <Signimator />
      </Page>
    </ThemeProvider>
  );
}

export default App;
