import React, { useEffect } from "react";
import Home from "@pages/home";
import { useNavigate } from "@sihui";
import { Row, Col } from "antd";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  // 判断，如果没登陆，就跳转到登录界面，如果登陆了，就跳转到主界面
  const login = true;

  // useEffect(() => {
  //   if (login) navigate("/login");
  //   else navigate("/home");
  // }, []);

  return (
    <>
      <div
        style={{ width: "100%", height: 60, backgroundColor: "bisque" }}
      ></div>
      <Row>
        <Col span={4}>
          <div>
            <Link to="/home">home</Link>
          </div>
          <div>
            <Link to="/detail">detail</Link>
          </div>
        </Col>
        <Col span={20}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};
