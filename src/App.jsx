import { useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import UploadCSVPage from "./pages/UploadCSVPage";
import Navbar from "./components/Navbar";

function App() {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar mode={mode} setMode={setMode} />
      <UploadCSVPage />
    </ThemeProvider>
  );
}

export default App;
