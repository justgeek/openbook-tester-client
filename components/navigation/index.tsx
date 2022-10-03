import Link from "next/link";
import { Link as MUILink } from "@mui/material";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { AppRoute, ROUTES } from "routes";
import "./styles.scss";

export const NavigationMenu: FunctionComponent = () => {
  const router = useRouter();

  const isRouteActive = (route: AppRoute) => {
    return router.pathname == route.path;
  };

  return (
    <>
      {Object.values(ROUTES).map((route: AppRoute) => {
        const { name, path, navigationLabel } = route;
        return (
          <Link href={path} key={name}>
            <MUILink underline="none" color={isRouteActive(route) ? "primary" : ""} className="nav-link">
              {navigationLabel}
            </MUILink>
          </Link>
        );
      })}
    </>
  );
};
