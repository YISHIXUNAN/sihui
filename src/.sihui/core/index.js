
// import routes from '@/config/routes';
import { useNavigate } from 'react-router-dom';

const s_createBrowserRouter = (routes) => {
    // 建立路径和名字映射
    const s_core_route_map = new Map();

    (function loopRoute(routes) {
        routes?.forEach(item => {
            if (item.name) s_core_route_map.set([item.name], [item.path]);
            if (item?.children?.length !== 0) loopRoute(item.children)
        })
        return;
    })(routes)

    return s_core_route_map;
}

// const routeMap = s_createBrowserRouter(routes);

const sNavigate = (name) => {
    const path = routeMap.get([name]);
    const navigate = useNavigate();
    navigate(path);
}


export { RouterProvider, createBrowserRouter, Link, useNavigate, Outlet } from 'react-router-dom';

export { s_createBrowserRouter, sNavigate };