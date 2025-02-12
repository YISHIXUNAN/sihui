import React from "react";
import Spageslayout from  '@pages/layout';
import Spagespage2 from  '@pages/page2';
import Spagestest from  '@pages/test';
import Spages404 from  '@pages/404';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

export default [
    {
        path: '/',
        component:<Spageslayout />, // 根路径不允许配置懒加载
        children: [
            {
                title: 'page1',
                icon: LaptopOutlined,
                name: 'page1',
                path: '/page1',
                // lazy:()=>import(/* webpackChunkName:  '@pages_page1' */ '@pages/page1')
                children: [
                    {
                        title: 'page1_1',
                        icon: UserOutlined,
                        path: '/page1/page1_1',
                        lazy:()=>import(/* webpackChunkName:  '@pages_page1_page1_1' */ '@pages/page1/page1_1')
                    },
                    {
                        title: 'page1_2',
                        name: 'page1_2',
                        icon: UserOutlined,
                        path: '/page1/page1_1/page1_2', // 如果有层级关系，需要包含父路径
                        lazy:()=>import(/* webpackChunkName:  '@pages_page1_page1_2' */ '@pages/page1/page1_2'),
                        hidden: true
                    }
                ]
            },
            {
                title: 'page2',
                path: '/page2',
                icon: NotificationOutlined,
                // component:<Spagespage2 />,
                children: [
                    {
                        title: 'page2_1',
                        name: 'page2_1',
                        icon: UserOutlined,
                        path: '/page2/page2_1',
                        lazy:()=>import(/* webpackChunkName:  '@pages_page2_page2_1' */ '@pages/page2/page2_1')
                    }
                ]
            },
            {
                title: 'page3',
                icon: LaptopOutlined,
                name: 'page3',
                path: '/page3',
                lazy:()=>import(/* webpackChunkName:  '@pages_page3' */ '@pages/page3'),
                hidden: true
            },
            {
                title: 'page3_1',
                icon: LaptopOutlined,
                name: 'page3_1',
                path: '/page3_1',
                lazy:()=>import(/* webpackChunkName:  '@pages_page3_page3_1' */ '@pages/page3/page3_1'),
                hidden: true
            },
            {
                title: 'test',
                path: '/test',
                component:<Spagestest />
            }
        ]
    },

    {
        path: '/login',
        name: 'login',
        lazy:()=>import(/* webpackChunkName:  '@pages_login' */ '@pages/login'),
        hidden: true
    },
    {
        path: '*',
        component:<Spages404 />,
        hidden: true
    }
];
