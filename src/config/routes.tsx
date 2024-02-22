export default [
    {
        path: '/',
        lazy: '@pages/layout'
    },
    {
        path: '/login',
        name: 'login',
        lazy: '@pages/login'
    },
    {
        path: '/detail',
        lazy: '@pages/detail'
    },
    {
        path: '/home',
        component: '@pages/home',
        children: [
            {
                path: '/home/detail',
                lazy: '@pages/detail'
            }
        ]
    }
];
