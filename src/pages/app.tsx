import React from "react";
import { RouterProvider, createBrowserRouter, Link } from "@sihui";
import routes from "@/config/routes";

const router = createBrowserRouter(routes);

export default () => {
  return <RouterProvider router={router} />;
};
