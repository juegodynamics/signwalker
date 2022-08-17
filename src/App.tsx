import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Page from "./app/nav";
import SignWriter from "./app/pages/signwrite";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#93d7ff",
    },
    secondary: {
      main: "#de2caa",
    },
    background: {
      default: "#303030",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Page>
        <SignWriter />
      </Page>
    </ThemeProvider>
  );
}

export default App;
