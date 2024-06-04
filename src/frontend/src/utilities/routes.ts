import Home from "../pages/Home";
import About from "../pages/About";
import Error from "../pages/Error";
import {FC} from "react";

interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<any>,
    exact?: boolean
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home,
        exact: true         
    },            
    {
        key: 'about-route',
        title: 'About',
        path: '/about',
        enabled: true,
        component: About
    },
    {
        key: 'error-route',
        title: 'Error',
        path: '*',    
        enabled: false,    
        component: Error
    }
];