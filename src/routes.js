import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Promo from "./components/Promo";
import Registration from "./components/Registration";
import Tasks from "./components/Tasks";
import { HOME_PAGE_ROUTE, LOGIN_ROUTE, PROMO_ROUTE, REG_ROUTE, TASKS } from "./utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REG_ROUTE,
        Component: Registration
    },
    {
        path: PROMO_ROUTE,
        Component: Promo
    }
]

export const privateRoutes = [
    {
        path: HOME_PAGE_ROUTE,
        Component: HomePage
    },
    {
        path: PROMO_ROUTE,
        Component: Promo
    },
    {
        path: TASKS,
        Component: Tasks
    }
]