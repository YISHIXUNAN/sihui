import React from 'react';
import { Button } from 'antd';
import { Link, Outlet, request, useNavigate, sName, observer } from '@sihui';

export default () => {
    const navigate = useNavigate();

    const topage3 = () => {
        navigate(sName('page3'));
    };

    return (
        <div>
            page1_2 跳转到page3
            <div>
                <Button onClick={topage3}>点击跳转到page3</Button>
            </div>
        </div>
    );
};
