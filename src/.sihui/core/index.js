// import routes from '@/config/routes';
import React, { createElement } from 'react';
import { useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from './axios';
import routes from './routes';

let s_core_route_map = new Map();

const getRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>{loopRoute(routes)}</Routes>
        </BrowserRouter>
    );
};

const loopRoute = (routes) => {
    return routes?.map((item) => {
        const { component, lazy, path } = item;
        const Element = React.lazy(lazy);
        return (
            <Route path={path} element={component || <Element />} key={path}>
                {(item?.children?.length !== 0 && loopRoute(item.children)) || ''}
            </Route>
        );
    });

    // routes?.forEach(item => {
    //     if (item.name) s_core_route_map.set([item.name], [item.path]);
    //     if (item?.children?.length !== 0) loopRoute(item.children)
    // })
    // return;
};

// const routeMap = s_createBrowserRouter(routes);

const sNavigate = (name) => {
    const path = routeMap.get([name]);
    const navigate = useNavigate();
    navigate(path);
};

export { RouterProvider, createBrowserRouter, Link, useNavigate, Outlet } from 'react-router-dom';

export { getRoutes, sNavigate };

export { request } from './axios';
