import React, { useEffect } from "react";
import Home from "@pages/home";
import { useNavigate } from "@sihui";

export default () => {
  const navigate = useNavigate();
  // 判断，如果没登陆，就跳转到登录界面，如果登陆了，就跳转到主界面
  const login = false;

  useEffect(() => {
    if (login) navigate("/login");
    else navigate("/home");
  }, []);

  return <>Layout</>;
};
