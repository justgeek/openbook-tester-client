import { Tester } from "pages/tester";

export interface AppRoute {
  path: string;
  navigationLabel?: string;
  name: string;
  children?: AppRoute[];
}

export interface AppRoutes {
  [key: string]: AppRoute;
}

export const ROUTES: AppRoutes = {
  home: { path: "/", name: "home", navigationLabel: "Home" },
  settings: { path: "/settings", name: "settings", navigationLabel: "Settings" },
};

export const HomeRoute = Tester;
