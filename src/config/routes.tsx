const router1 = [
  {
    path: "/",
    component: () => import("@pages/layout"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@pages/login"),
  },
  {
    path: "/detail",
    component: () => import("@pages/detail"),
  },
  {
    path: "/home",
    component: () => import("@pages/home"),
    children: [
      {
        path: "/home/detail",
        component: () => import("@pages/detail"),
      },
    ],
  },
];

const router = [
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

export default router1;
