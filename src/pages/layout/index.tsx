import React, { useState, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import routes from '@/config/routes';
import { useNavigate, Outlet, uid, useLocation } from '@sihui';

const { Header, Content, Sider } = Layout;

const pathKeyMap = new Map();
const keyNameMap = new Map();

const getMenuItem: any = (item: Array<any>, parentKey: string = '') => {
    return item.reduce((pre, cur) => {
        const { hidden = false } = cur;
        if (hidden) return pre;
        const { title, icon, path, children = [] } = cur;
        if (path === '/') {
            return children && children.length !== 0 && getMenuItem(children);
        } else {
            const key = `${uid()}&${path}`;
            const arr = pathKeyMap.get(path) || [key];
            if (parentKey) arr.push(parentKey);
            pathKeyMap.set(path, arr);
            pathKeyMap.set(key, path);
            keyNameMap.set(key, title);
            const newarr = [
                ...pre,
                {
                    key,
                    label: title,
                    path,
                    icon: React.createElement(icon as any),
                    children: children && children.length !== 0 && getMenuItem(children, key)
                }
            ];
            return newarr;
        }
    }, []);
};

const getFirstKey: any = (item: any) => {
    console.log('hereItem', item);
    if (item.children) {
        return getFirstKey(item.children[0]);
    }
    return item.path;
};

const menuItems: MenuProps['items'] = getMenuItem(routes);
const firstItems = getFirstKey(menuItems?.[0] || {});

console.log('menuItems', menuItems, pathKeyMap, firstItems);

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const defaultKeys = pathname === '/' ? pathKeyMap.get(firstItems) : pathKeyMap.get(pathname);
    const [navigatePath, setNavigatePath] = useState<Array<any>>([]);

    const onMenuClick = ({ key = '' }) => {
        const arr = key.split('&');
        navigate(arr[1]);
    };

    useEffect(() => {
        if (pathname === '/') {
            navigate(firstItems);
        }
    }, []);

    useEffect(() => {
        const arr = pathKeyMap.get(pathname);
        const newArr = arr.map((item: any) => ({
            title: keyNameMap.get(item)
        }));
        setNavigatePath(newArr);
    }, [pathname]);

    return (
        <Layout style={{ height: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                        items={menuItems}
                        onClick={onMenuClick}
                        defaultSelectedKeys={defaultKeys}
                        defaultOpenKeys={defaultKeys}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {navigatePath?.map((item) => (
                            <Breadcrumb.Item key={item}>{item.title}</Breadcrumb.Item>
                        ))}
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
