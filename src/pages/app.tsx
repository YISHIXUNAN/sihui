import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { getRoutes, request } from "@sihui";
import routes from "@/config/routes";
import axios from "axios";
// const Layout = lazy(() => import("@pages/layout"));
// const Home = React.lazy(
//   () => import(/* webpackChunkName: "home" */ "@pages/home")
// );

// const Detail = React.lazy(() => import("@pages/detail"));

// export default () => {
//   return (
//     <Suspense fallback={<div>loading^</div>}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route path="/home" element={<Home />} />
//             <Route path="/detail" element={<Detail />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </Suspense>
//   );
// };
console.log("getRoutes", getRoutes(routes));
export default () => {
  const [data, setData] = useState("");

  const axiosTest = async () => {
    const data = await request.get(
      "http://api.uomg.com/api/comments.163?format=text"
    );
    setData(JSON.stringify(data));
  };

  useEffect(() => {
    axiosTest();
  }, []);
  return (
    <Suspense fallback={<div>loading^</div>}>
      <h1>{data}</h1>
      {getRoutes(routes)}
    </Suspense>
  );
};
