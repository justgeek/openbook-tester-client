import { AppHeader } from "components/header";
import { FunctionComponent } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "theme";
import { SnackbarProvider } from "notistack";

// Any Global functionality, or behavior across the app can be handled here

export const App: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <AppHeader />
          <>{children}</>
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
};
