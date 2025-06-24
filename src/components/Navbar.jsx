import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link as RouterLink, useLocation } from "react-router-dom";

function Navbar({ mode, setMode }) {
  const location = useLocation();
  const toggleMode = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Meezan Statement Parser
        </Typography>
        <Button
          color={location.pathname === "/upload" ? "primary" : "inherit"}
          component={RouterLink}
          to="/upload"
        >
          Upload CSV
        </Button>
        <Button
          color={location.pathname === "/stats" ? "primary" : "inherit"}
          component={RouterLink}
          to="/stats"
        >
          Show Stats
        </Button>
        <Tooltip title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}>
          <IconButton color="inherit" onClick={toggleMode}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
