import React from "react";
import { Link, Outlet } from "@sihui";
import { Button } from "antd";
import "./index.less";
import style from "./index.modules.css";

export default () => (
  <div className="hello">
    HOME
    {/* <Link to="/home/detail">About Us</Link> */}
    <Outlet />
    <Button type="primary">ANTD</Button>
    <div className={style.csstest}>css测试</div>
  </div>
);
