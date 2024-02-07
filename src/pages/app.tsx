import React from "react";
import style from "./app.less";
import Home from "@pages/home/index";
import Detail from "@pages/detail/index";
import { Button } from "antd";
import { RouterProvider, createBrowserRouter, Link } from "@sihui";
import routes from "@/config/routes";

const router = createBrowserRouter(routes);

export default () => {
  return <RouterProvider router={router} />;
};
