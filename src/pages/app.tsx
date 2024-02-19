import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
// import {
//   RouterProvider,
//   createBrowserRouter,
//   Link,
//   s_createBrowserRouter,
// } from "@sihui";
// import routes from "@/config/routes";
const Layout = lazy(() => import("@pages/layout"));
const Home = React.lazy(
  () => import(/* webpackChunkName: "home" */ "@pages/home")
);

const Detail = React.lazy(() => import("@pages/detail"));

export default () => {
  return (
    <Suspense fallback={<div>loading^</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/detail" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

// export default () => {
//   return <RouterProvider router={router} />;
// };
