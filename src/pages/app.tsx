import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Link,
  s_createBrowserRouter,
} from "@sihui";
import routes from "@/config/routes";

const router = createBrowserRouter(routes);

console.log("s_createBrowserRouter", s_createBrowserRouter(routes));

export default () => {
  return <RouterProvider router={router} />;
};


