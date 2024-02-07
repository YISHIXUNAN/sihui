import React from "react";
import { Link, Outlet } from "@sihui";

export default () => (
  <div>
    HOME<Link to="/home/detail">About Us</Link>
    <Outlet />
  </div>
);
