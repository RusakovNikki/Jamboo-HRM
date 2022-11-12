import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { HOME_PAGE_ROUTE, LOGIN_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]

export const privateRoutes = [
    {
        path: HOME_PAGE_ROUTE,
        Component: HomePage
    }
]