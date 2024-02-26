import React, { useEffect, useState } from 'react';
import { Link, Outlet, request } from '@sihui';
import { Button } from 'antd';
import './index.less';
import style from './index.modules.css';

export default () => {
    const [data, setData] = useState('');

    const axiosTest = async () => {
        // const { data } = await request.get('http://api.uomg.com/api/comments.163?format=text');
        // setData(JSON.stringify(data));
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
