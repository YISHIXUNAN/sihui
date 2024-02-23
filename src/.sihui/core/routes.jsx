import React from "react";
import Spageslayout from  '@pages/layout';
import Spageshome from  '@pages/home';
export default [
    {
        path: '/',
        component:<Spageslayout /> // 根路径不允许配置懒加载
    },
    {
        path: '/login',
        name: 'login',
        lazy:()=>import(/* webpackChunkName:  '@pages_login' */ '@pages/login')
    },
    {
        name: 'detailPage',
        path: '/detail',
        lazy:()=>import(/* webpackChunkName:  '@pages_detail' */ '@pages/detail')
    },
    {
        path: '/home',
        component:<Spageshome />,
        children: [
            {
                path: '/home/detail',
                lazy:()=>import(/* webpackChunkName:  '@pages_detail' */ '@pages/detail')
            }
        ]
    }
];
