import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { getRoutes, request } from '@sihui';
import './global/global.less';

export default () => {
    console.log('app');
    return <Suspense fallback={<div>loading^</div>}>{getRoutes()}</Suspense>;
};
