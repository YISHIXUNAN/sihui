export default [
  {
    path: "/",
    component: "@pages/layout",
  },
  {
    path: "/login",
    name: "login",
    component: "@pages/login",
  },
  {
    path: "/detail",
    component: "@pages/detail",
  },
  {
    path: "/home",
    component: "@pages/home",
    children: [
      {
        path: "/home/detail",
        component: "@pages/detail",
      },
    ],
  },
];
