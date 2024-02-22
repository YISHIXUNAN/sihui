export default [
    {
        path: '/',
        component: () => import(/* webpackChunkName:  '@pages_layout' */ '@pages/layout')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName:  '@pages_login' */ '@pages/login')
    },
    {
        path: '/detail',
        component: () => import(/* webpackChunkName:  '@pages_detail' */ '@pages/detail')
    },
    {
        path: '/home',
        component: () => import(/* webpackChunkName:  '@pages_home' */ '@pages/home'),
        children: [
            {
                path: '/home/detail',
                component: () => import(/* webpackChunkName:  '@pages_detail' */ '@pages/detail')
            }
        ]
    }
];
