import { useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UploadCSVPage from "./pages/UploadCSVPage";
import ShowStatsPage from "./pages/ShowStatsPage";
import Navbar from "./components/Navbar";

function App() {
  const [mode, setMode] = useState("dark");
  const [statement, setStatement] = useState(null);

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
      <Router basename="/meezan-statement-parser-and-expense-tracker">
        <Navbar mode={mode} setMode={setMode} />
        <Routes>
          <Route path="/" element={<Navigate to="/upload" replace />} />
          <Route
            path="/upload"
            element={
              <UploadCSVPage
                statement={statement}
                setStatement={setStatement}
              />
            }
          />
          <Route
            path="/stats"
            element={<ShowStatsPage statement={statement} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
