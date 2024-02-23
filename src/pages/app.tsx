import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { getRoutes, request } from '@sihui';

export default () => {
    const [data, setData] = useState('');

    const axiosTest = async () => {
        const { data } = await request.get('http://api.uomg.com/api/comments.163?format=text');
        setData(JSON.stringify(data));
    };

    useEffect(() => {
        axiosTest();
    }, []);

    console.log('app');
    return <Suspense fallback={<div>loading^</div>}>{getRoutes()}</Suspense>;
};
