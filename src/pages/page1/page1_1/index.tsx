import React from 'react';
import { useNavigate } from '@sihui';
import { Button } from 'antd';

export default () => {
    const navigate = useNavigate();
    return (
        <div>
            page1_1
            <Button onClick={() => navigate('/page1/page1_1/page1_2')}>跳转到page1_2</Button>
        </div>
    );
};
