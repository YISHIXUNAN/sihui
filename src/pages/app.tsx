import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Link,
  s_createBrowserRouter,
} from "@sihui";
import routes from "@/config/routes";

const Home = React.lazy(
  () => import(/* webpackChunkName: "home" */ "@pages/home")
);

const Detail = React.lazy(
  () => import("@pages/detail")
)

export default () => {
  return <div>
    <h1>Home组件</h1>
    <Home />
    <Detail />
  </div>
}

// export default () => {
//   return <RouterProvider router={router} />;
// };


