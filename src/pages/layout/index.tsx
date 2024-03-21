import React, { useState, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import routes from '@/config/routes';
import { useNavigate, Outlet, uid, useLocation, history } from '@sihui';

const { Header, Content, Sider } = Layout;

const pathKeyMap = new Map();
const pathNameMap = new Map();
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

const getMenuItem: any = (item: Array<any>) => {
    return item.reduce((pre, cur) => {
        const { hidden = false, title, icon, path, children = [] } = cur;
        if (path === '/') {
            return children && children.length !== 0 && getMenuItem(children);
        } else {
            const key = `${uid()}&${path}`;
            const arr = getFullPath(path, key);
            keyNameMap.set(key, title); // 把侧边栏导航中的 key 和 title 对应
            pathKeyMap.set(path, arr); // 获取当前目录的 key 路径
            pathNameMap.set(path, title);
            if (hidden) return pre;
            keyNameMap.set(path, key); // 只存储侧边栏有的路由
            const newarr = [
                ...pre,
                {
                    key,
                    label: title || path,
                    path,
                    icon: (icon && React.createElement(icon as any)) || null,
                    children: children && children.length !== 0 && getMenuItem(children)
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
    const [openKeys, setOpenKeys] = useState(defaultKeys);
    const [selectedKeys, setSelectedKes] = useState(defaultKeys);
    const [navigatePath, setNavigatePath] = useState<Array<any>>([]);

    const onMenuClick = ({ key = '' }) => {
        navigate(getPathFromKey(key));
    };

    const onBreadClick = (path: string, index: number) => {
        // 如果在面包屑中多级跳转
        // 这个地方有错误，只考虑了一级一级正常跳转到目标界面的情况。跨级页面跳转后无法返回正确的路径
        const backNum = index + 1 - navigatePath.length;
        history.go(backNum);
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
        if (pathname !== '/') {
            console.log('history', history.action);
            const arr = pathKeyMap.get(pathname);
            console.log(pathKeyMap, keyNameMap, pathname);
            setOpenKeys([...openKeys, ...arr]);

            keyNameMap.get(pathname) && setSelectedKes(keyNameMap.get(pathname));
            if (arr && arr.length !== 0) {
                // 如果跳转目标路径是公用路径 // 往前跳还是往回跳？
                if (!keyNameMap.get(pathname) && arr.length == 1) {
                    let index = -1;
                    navigatePath.forEach((obj, itemIndex) => {
                        if (obj.path === pathname) index = itemIndex;
                    });
                    console.log('index', index);
                    if (index >= 0) {
                        const newarr = navigatePath.filter((item, itemIndex) => itemIndex <= index);
                        setNavigatePath(newarr);
                    } else {
                        const obj = { title: pathNameMap.get(pathname), path: pathname };
                        const newarr = [...navigatePath, obj];
                        setNavigatePath(newarr);
                    }
                } else {
                    const newArr = arr?.map((item: any) => ({
                        title: keyNameMap.get(item),
                        path: getPathFromKey(item)
                    }));
                    setNavigatePath(newArr);
                }
            }
        }
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
                        onOpenChange={(e) => {
                            setOpenKeys(e);
                        }}
                        selectedKeys={selectedKeys}
                        openKeys={openKeys}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {navigatePath?.map((item, index) => (
                            <Breadcrumb.Item key={index}>
                                <span
                                    style={{
                                        color: index !== 0 ? '#2b83ff' : '',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => onBreadClick(item.path, index)}
                                >
                                    {item.title}
                                </span>
                            </Breadcrumb.Item>
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
