import React, { useEffect, useState } from 'react';
import { Link, Outlet, request } from '@sihui';
import { Button } from 'antd';
import './index.less';
import style from './index.modules.css';

export default () => {
    const [data, setData] = useState('');

    const axiosTest = async () => {
        const sRequest = request as any;
        const data = await sRequest.use('default').post('/rand.qinghua?format=json');
        // const data = await request.post('/rest/v1/kb/list');

        console.log('继续执行', data);
    };

    return (
        <div className="hello">
            HOME
            <Button type="primary" onClick={axiosTest}>
                点击发起请求
            </Button>
            <div className={style.csstest}>css测试</div>
            {data}
        </div>
    );
};
