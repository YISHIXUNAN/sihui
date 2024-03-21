[toc]
#### 技术栈

```

打包工具：webpack

开发语言：react + ts

组件库：Ant Design

状态管理：mobx

路由：react-router-dom

数据请求：axios

代码规范：eslint + prettier

git相关：.gitignore + commitlint.config.js

```

#### 目录结构


```
├── dist  生产文件
├── src
	├── .sihui   配置封装文件
        └──config    webpack 配置相关
        └──core   axios 等内容的二次封装
    ├── assets   静态文件
    ├── config
    	└── proxy.tsx 请求配置
    	└── routes.tsx 路由配置
    ├── hooks 自定义hook
    ├── pages 页面
    ├── store 状态文件
```



#### 路由配置及说明

在 `src/config/proxy` 文件 routes 中配置。

- 注意

>懒加载与非懒加载

懒加载路径前需要指明 lazy, 不需要懒加载可以使用 component

>公共界面配置说明

如果多个界面可跳转至统一界面，则称该界面为公共界面。公共界面需配置在 layout 的 children 中，且需指定 hidden 为 false。如没有按照要求配置，面包屑导航可能会出现错误。

> 子页面路径跳转

如果想让不同页面出现在同一层级，不要将新的页面放在上一集的 children 中，可以放在同一层级中。注意，此时，子路径需要包含父路径。若没有包含，面包屑导航可能会出现未知错误。

>通过路径名跳转

如果某个路径在多个页面中用到，可以使用 name指定该路径的名字。后续可以使用 title 跳转。

```javascript
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

export default [
    {
        path: '/',
        component: '@pages/layout', // 根路径不允许配置懒加载
        children: [
            {
                title: 'page1',// 路径展示明
                icon: LaptopOutlined, // 路径icon 配置
                name: 'detailPage', // 路径名字
                path: '/page1',
                children: [
                    {
                        title: 'page1_1',
                        icon: UserOutlined,
                        path: '/page1/page1_1',
                        lazy: '@pages/page1/page1_1'
                    },
                    {
                        title: 'page1_2',
                        icon: UserOutlined,
                        path: '/page1/page1_1/page1_2', // 如果有层级关系，需要包含父路径
                        lazy: '@pages/page1/page1_2',
                        hidden: true
                    }
                ]
            },
            {
                title: 'page2',
                path: '/page2',
                icon: NotificationOutlined,
                // component: '@pages/page2',
                children: [
                    {
                        name:'page2_1'
                        title: 'page2_1',
                        icon: UserOutlined,
                        path: '/page2/page2_1',
                        lazy: '@pages/page2/page2_1'
                    }
                ]
            },
             {
                title: 'page3',
                icon: LaptopOutlined,
                name: 'page3',
                path: '/page3',
                lazy: '@pages/page3',
                hidden: true
            },
            {
                title: 'page3_1',
                icon: LaptopOutlined,
                name: 'page3_1',
                path: '/page3_1',
                lazy: '@pages/page3/page3_1',
                hidden: true
            },
        ]
    },

    {
        path: '/login',
        name: 'login',
        lazy: '@pages/login',
        hidden: true
    },
    {
        path: '*',
        component: '@pages/404',
        hidden: true
    }
];

```

使用 name 跳转示例

```js
import { useNavigate, sName } from '@sihui';

export default () => {
	// ....
    const navigate = useNavigate();
    
    //...
    navigate(sName('page2_1'));
}
```

#### 请求配置及说明
>公共请求头配置

在 `src/config/proxy` 文件 `target` 中配置，可配置多个请求头。

```
export default {
    target: {
        default: {
            baseURL: 'https://api.uomg.com/api',
            timeout: 1000
        },
        name1: {}
    },
    before: [
        (config: any) => {
            console.log('proxy before');
            return config;
        }
    ],
    after: [
        (res: any) => {
            console.log('proxy after');
            return res;
        }
    ]
};
```

> 请求方式

```
import { request } from '@sihui';// 引入请求头

// ...

// 发起请求
const sRequest = request as any;
// 使用自定义 公共请求配置，暂时支持 get、post
const data = await sRequest.use('default').post('/rand.qinghua?format=json'，{});

// default 可以不使用 use 指定，可以写成如下形式，暂时支持 get、post
const data = await request.post('/rand.qinghua?format=json'，{});

// 不指定默认发起post请求
const data = await request('/rand.qinghua?format=json'，{});
```

> 自定义拦截器可以分别写在 before 数组中 和 after 数组中。注意，before 需要返回 config， res 需要返回 res，否则可能会报错。

```
export default {
   //...
   // 可以做 token 处理
    before: [
        (config: any) => {
            console.log('proxy before');
            return config;
        }
    ],
    // 请求成功后可以拿到 res， 可以对 res 中的数据进一步处理
    // 如下，默认 status 200 为请求成功，页面上可以拿到返回数据中的 data， 若改成 300 则会
    // 报错，且界面上拿不到返回值
    after: [
        (res: any) => {
            console.log('proxy after', res);
            res.status = 300;
            console.log('res', res);
            return res;
        }
    ]
};
```

#### 状态使用及说明

在 `src/store` 文件下可添加多个状态，注意在 `index.js` 中导出。

已封装为 `useStore`, 具体用法参见自定义 hook 说明。

#### 自定义 hooks 及说明

> useStore

从 hooks 导出即可。注意，涉及状态变更的页面需用 observer 包裹。详见 `test/index.tsx` 界面。

```
import { useStore } from '@/hooks';
//...
 const { common } = useStore();
 
 //...
 <div>store 的值：{common.state}</div>
```

>useStates

从 hooks 导出即可。支持回调。详见 `test/index.tsx` 界面。

```
import {  useStates } from '@/hooks';
//...
const [state, setState] = useStates({ name: 'ss', age: 10 });

// ...
setState({ name: 'QQ' }, (newval: any) => {
            const { name } = newval;
            setState({ name: name + 'TT' });
        });
        
// ...
<div>setSate 的值：{state.name}</div>
```

#### 自定义组件及说明



