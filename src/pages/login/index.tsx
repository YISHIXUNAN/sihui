import React from 'react';
import './index.less';
import { SCenter } from '@sihui/component';
import logo from '@/assets/image/logo.png';
import { Button, Checkbox, Form, Input } from 'antd';

export default () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    // const onFinish = (values: any) => {};

    let str: string = 'tt';

    return (
        <div className="loginContainer">
            <SCenter style={{ height: '80vh' }}>
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <img src={logo} width={160}></img>
                    </div>
                    <br />
                    <br />
                    <div>
                        <Form
                            name="basic"
                            labelCol={{ span: 0 }}
                            wrapperCol={{ span: 24 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            // onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                                style={{ width: 300 }}
                            >
                                <Input placeholder="请输入用户名" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                                style={{ width: 300 }}
                            >
                                <Input.Password placeholder="请输入用密码" />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{ offset: 0, span: 16 }}
                            >
                                <Checkbox>保持登录</Checkbox>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: 300, borderRadius: 25 }}
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </SCenter>
        </div>
    );
};
