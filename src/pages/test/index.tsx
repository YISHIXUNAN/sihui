import React, { useEffect, useState } from 'react';
import { Link, Outlet, request, useNavigate, sName } from '@sihui';
import { Button } from 'antd';
import './index.less';
import { useStore } from '@/hooks';
import style from './index.modules.css';
import { observer } from 'mobx-react';

const Page = () => {
    const [data, setData] = useState('');
    const navigate = useNavigate();

    const { common } = useStore();

    const axiosTest = async () => {
        const sRequest = request as any;
        const data = await sRequest
            .use('default')
            .post('/rand.qinghua?format=json', { name: 'rr' });
        // const data = await request.post('/rest/v1/kb/list',{});
        setData(JSON.stringify(data));
    };

    const handleStoreChange = () => {
        common.changeState();
    };

    const topage2_1 = () => {
        navigate(sName('page1_2'));
    };

    return (
        <div>
            <Button type="primary" onClick={axiosTest}>
                点击发起请求
            </Button>
            <div>请求结果：{data}</div>
            <div>***********************************</div>
            <Button onClick={topage2_1}>点击跳转到page1_2</Button>
            <div>***********************************</div>
            <div>store 的值：{common.state}</div>
            <Button type="primary" onClick={handleStoreChange}>
                点击修改store的值
            </Button>
        </div>
    );
};

export default observer(Page);
