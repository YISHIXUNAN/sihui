import React, { useEffect, useState } from 'react';
import { Link, Outlet } from '@sihui';
import { Button } from 'antd';
import './index.less';
import style from './index.modules.css';
import axios from 'axios';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDdXJyZW50VXNlciI6eyJpZCI6MSwiY29tcGFueV9pZCI6MSwibmFtZSI6IuWFrOWPuDAxIiwiY3JlYXRlZF9hdCI6MTcwNjU4MzEyNywidXBkYXRlZF9hdCI6MTcwNjU4MzEyN30sImV4cCI6MTcwOTYyMTk3MX0.wpaV5IcNTealpKhsy-fGVJ-p7N5Hc-KJvsyjMs_jSeY';

axios.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json';
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    () => {}
);
export default () => {
    const [data, setData] = useState('');

    const axiosTest = async () => {
        // const { data } = await request.get('comments.163?format=text');
        // setData(JSON.stringify(data));
        // const { data } = await request('');
        axios({
            method: 'POST',
            url: 'https://callbotapi.uincall.com/rest/v1/kb/list',
            // url: 'http://www.webxml.com.cn/WebServices/WeatherWebService.asmx/getWeatherbyCityName',
            data: {
                theCityName: '西安'
            }
        }).then(function (res) {
            console.log(res.data);
        });
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
