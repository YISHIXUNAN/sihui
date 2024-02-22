import React from "react";
import Spageslayout from  '@pages/layout';
import Spageshome from  '@pages/home';
export default [
    {
        path: '/',
        component:<Spageslayout />
    },
    {
        path: '/login',
        name: 'login',
        lazy:()=>import(/* webpackChunkName:  '@pages_login' */ '@pages/login')
    },
    {
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
