export default [
    {
        path: '/',
        component: '@pages/layout' // 根路径不允许配置懒加载
    },
    {
        path: '/login',
        name: 'login',
        lazy: '@pages/login'
    },
    {
        name: 'detailPage',
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
