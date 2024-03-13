import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

export default [
    {
        path: '/',
        component: '@pages/layout', // 根路径不允许配置懒加载
        children: [
            {
                title: 'page1',
                icon: LaptopOutlined,
                name: 'detailPage',
                path: '/page1',
                // lazy: '@pages/page1'
                children: [
                    {
                        title: 'page1_1',
                        icon: UserOutlined,
                        path: '/page1/page1_1',
                        lazy: '@pages/page1/page1_1'
                    },
                    {
                        title: 'page1_2',
                        icon: UserOutlined,
                        path: '/page1/page1_1/page1_2', // 如果有层级关系，需要包含父路径
                        lazy: '@pages/page1/page1_2',
                        hidden: true
                    }
                ]
            },
            {
                title: 'page2',
                path: '/page2',
                icon: NotificationOutlined,
                // component: '@pages/page2',
                children: [
                    {
                        title: 'page2_1',
                        icon: UserOutlined,
                        path: '/page2/page2_1',
                        lazy: '@pages/page2/page2_1'
                    }
                ]
            },
            {
                title: 'page3',
                icon: LaptopOutlined,
                name: 'detailPage',
                path: '/page3',
                lazy: '@pages/page3'
            }
        ]
    },
    {
        path: '/test',
        component: '@pages/test'
    },
    {
        path: '/login',
        name: 'login',
        lazy: '@pages/login',
        hidden: true
    },
    {
        path: '*',
        component: '@pages/404',
        hidden: true
    }
];
