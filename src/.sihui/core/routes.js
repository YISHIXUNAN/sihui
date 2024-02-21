export default [
    {
        path: '/',
        component: () => import('@pages/layout')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@pages/login')
    },
    {
        path: '/detail1',
        component: () => import('@pages/detail')
    },
    {
        path: '/home',
        component: () => import('@pages/home'),
        children: [
            {
                path: '/home/detail',
                component: () => import('@pages/detail')
            }
        ]
    }
];
