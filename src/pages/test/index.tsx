import React, { useEffect, useState } from 'react';
import { Link, Outlet, request, useNavigate, sName, observer } from '@sihui';
import { Button } from 'antd';
import './index.less';
import { useStore, useStates } from '@/hooks';
import style from './index.modules.css';
console.log('observer page');

const Page = () => {
    const [data, setData] = useState('');
    const [state, setState] = useStates({ name: 'ss', age: 10 });
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

    const handleStateChange = () => {
        setState({ name: 'QQ' }, (newval: any) => {
            const { name } = newval;
            setState({ name: name + 'TT' });
        });
    };

    const topage3 = () => {
        navigate(sName('page3'));
    };

    return (
        <div>
            <Button type="primary" onClick={axiosTest}>
                点击发起请求
            </Button>
            <div>请求结果：{data}</div>
            <div>***********************************</div>
            <Button onClick={topage3}>点击跳转到page3</Button>
            <div>***********************************</div>
            <div>store 的值：{common.state}</div>
            <Button type="primary" onClick={handleStoreChange}>
                点击修改store的值
            </Button>
            <div>setSate 的值：{state.name}</div>
            <Button type="primary" onClick={handleStateChange}>
                点击修改state的值
            </Button>
        </div>
    );
};

export default observer(Page);
