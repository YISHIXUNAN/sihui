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
    path: "login",
    name: "login",
    element: <Login />,
  },
  {
    path: "detail",
    element: <Detail />,
  },
  {
    path: "home",
    element: <Home />,
    children: [
      {
        path: "detail",
        element: <Detail />,
      },
    ],
  },
];

export default router;
