import React from "react";
import Spageshome from  '@pages/home';
export default [
    {
        path: '/',
        lazy:()=>import(/* webpackChunkName:  '@pages_layout' */ '@pages/layout')
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
