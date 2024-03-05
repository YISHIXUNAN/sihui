import React, { useEffect, useState } from 'react';
import { Link, Outlet, request } from '@sihui';
import { Button } from 'antd';
import './index.less';
import style from './index.modules.css';
import axios from 'axios';

export default () => {
    const [data, setData] = useState('');

    const axiosTest = async () => {
        const data = await request('/rest/v1/kb/list');
        console.log('继续执行', data);
    };

    useEffect(() => {
        axiosTest();
    }, []);
    return (
        <div className="hello">
            HOME
            <Button type="primary">ANTD</Button>
            <div className={style.csstest}>css测试</div>
            {data}
        </div>
    );
};
