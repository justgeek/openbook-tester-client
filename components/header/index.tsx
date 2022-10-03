import { Paper } from "@mui/material";
import { Logo } from "components/logo";
import { NavigationMenu } from "components/navigation";
import "./style.scss";
import { useTheme } from "@mui/material/styles";

export const AppHeader = () => {
  const theme = useTheme();

  return (
    <Paper square={true} elevation={0} className="header">
      <Logo />
      <nav>
        <NavigationMenu />
      </nav>
    </Paper>
  );
};
