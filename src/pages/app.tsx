import React from "react";
import style from "./app.less";
import Home from "./home/index";
import { Button } from "antd";

export default () => (
  <h1 className={style.hello}>
    APP
    <Button type="primary">Button</Button>
    <Home />
  </h1>
);
