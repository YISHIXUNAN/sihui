// import routes from '@/config/routes';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { v4 as uid } from 'uuid';
import routes from './routes';
import { Spin } from 'antd';

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
        const Element = lazy && React.lazy(lazy);
        let showElement = component ? (
            component
        ) : lazy ? (
            <Suspense
                fallback={
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                }
            >
                <Element />
            </Suspense>
        ) : (
            <Outlet />
        );
        if (item.name) s_core_route_map.set(item.name, item.path);
        return (
            <Route path={path} element={showElement} key={path}>
                {(item?.children?.length !== 0 && loopRoute(item.children)) || ''}
            </Route>
        );
    });
};

// const routeMap = s_createBrowserRouter(routes);

const sName = (name) => {
    return s_core_route_map.get(name);
};

export {
    RouterProvider,
    createBrowserRouter,
    Link,
    useNavigate,
    Outlet,
    useLocation
} from 'react-router-dom';

export { uid };

export { getRoutes, sName };

export { request } from './axios';
