import React, { useState, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import routes from '@/config/routes';
import { useNavigate, Outlet, uid, useLocation } from '@sihui';

const { Header, Content, Sider } = Layout;

const pathKeyMap = new Map();
const keyNameMap = new Map();
const curPathArr: Array<any> = [];

const getFullPath = (path: string, key: string) => {
    const index = path.lastIndexOf('/');
    const lastPath = path.substring(0, index);
    if (lastPath && pathKeyMap.get(lastPath)) {
        const arr = pathKeyMap.get(lastPath);
        const newArr = [...arr, key];
        return newArr;
    }
    return [key];
};

const getMenuItem: any = (item: Array<any>, parentKey: string = '') => {
    return item.reduce((pre, cur) => {
        const { hidden = false, title, icon, path, children = [] } = cur;
        if (path === '/') {
            return children && children.length !== 0 && getMenuItem(children);
        } else {
            const key = `${uid()}&${path}`;
            const arr = getFullPath(path, key);
            keyNameMap.set(key, title); // 把侧边栏导航中的 key 和 title 对应
            pathKeyMap.set(path, arr); // 获取当前目录的 key 路径
            if (hidden) return pre;
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
    curPathArr.push({ path: item.path, title: item.label });
    if (item.children) {
        return getFirstKey(item.children[0]);
    }
    return item.path;
};

const menuItems: MenuProps['items'] = getMenuItem(routes);
const firstItems = getFirstKey(menuItems?.[0] || {});

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const defaultKeys = pathname === '/' ? pathKeyMap.get(firstItems) : pathKeyMap.get(pathname);
    const [navigatePath, setNavigatePath] = useState<Array<any>>(curPathArr);

    const onMenuClick = ({ key = '' }) => {
        navigate(getPathFromKey(key));
    };

    const getPathFromKey = (key: string) => {
        const arr = key.split('&');
        return arr[1];
    };

    useEffect(() => {
        if (pathname === '/') {
            navigate(firstItems);
        }
    }, []);

    useEffect(() => {
        const arr = pathKeyMap.get(pathname);
        // 如果 arr 有值，说明点击的是侧边导航栏的内容
        if (arr && arr.length !== 0) {
            const newArr = arr?.map((item: any) => ({
                title: keyNameMap.get(item),
                path: getPathFromKey(item)
            }));
            setNavigatePath(newArr);
        }
    }, [pathname]);

    console.log('navigatePath', navigatePath, defaultKeys);

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
