import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import routes from '@/config/routes';
import { useNavigate, Outlet, uid } from '@sihui';

const { Header, Content, Sider } = Layout;

const getMenuItem: any = (item: Array<any>) => {
    return item.reduce((pre, cur) => {
        const { hidden = false } = cur;
        if (hidden) return pre;
        const { title, icon, path, children = [] } = cur;
        if (path === '/') {
            return children && children.length !== 0 && getMenuItem(children);
        } else {
            const newarr = [
                ...pre,
                {
                    key: `${uid()}&${path}`,
                    label: title,
                    path,
                    icon: React.createElement(icon as any),
                    children: children && children.length !== 0 && getMenuItem(children)
                }
            ];
            return newarr;
        }
    }, []);
};

const menuItems: MenuProps['items'] = getMenuItem(routes);

console.log('menuItems', menuItems);

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();
    const navigate = useNavigate();

    const onMenuClick = ({ key = '' }) => {
        const arr = key.split('&');
        navigate(arr[1]);
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={menuItems}
                        onClick={onMenuClick}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;
