import React from 'react';
import { Button } from 'antd';
import { Link, Outlet, request, useNavigate, sName, observer } from '@sihui';

export default () => {
    const navigate = useNavigate();

    const topage3 = () => {
        navigate(sName('page3_1'));
    };

    return (
        <div>
            page3 跳转到page3_1
            <div>
                <Button onClick={topage3}>点击跳转到page3_1</Button>
            </div>
        </div>
    );
};
