import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { HOME_PAGE_ROUTE, LOGIN_ROUTE, REG_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REG_ROUTE,
        Component: Registration
    }
]

export const privateRoutes = [
    {
        path: HOME_PAGE_ROUTE,
        Component: HomePage
    }
]