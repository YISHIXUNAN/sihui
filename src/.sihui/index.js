import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, Link } from '@sihui';
import routes from "../config/routes";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


const router = createBrowserRouter(routes);

root.render(
  <RouterProvider router={router} />
);
