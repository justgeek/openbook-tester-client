import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f26419",
    },
    secondary: {
      main: "#189AB4",
    },
    success: {
      main: "#66bb6a",
      contrastText: "rgba(255,255,255,0)",
    },
  },
});
