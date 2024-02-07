import React from "react";
import Layout from "@pages/layout";
import Home from "@pages/home";
import Login from "@pages/login";
import Detail from "@pages/detail";

const router = [
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <Detail />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];

export default router;
