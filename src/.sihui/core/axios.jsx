import axios, { AxiosError }  from 'axios';
import proxy from '@/config/proxy';
import { message } from 'antd';

const { target = {} } = proxy;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDdXJyZW50VXNlciI6eyJpZCI6MSwiY29tcGFueV9pZCI6MSwibmFtZSI6IuWFrOWPuDAxIiwiY3JlYXRlZF9hdCI6MTcwNjU4MzEyNywidXBkYXRlZF9hdCI6MTcwNjU4MzEyN30sImV4cCI6MTcwOTcxMzM5OH0.2Fwu88weZqPolR2dh3sAgmZewUvTETvQH00cdkPaEgk'

const reqSuccess = (config) => {
    // 1.请求的调整 2.配置用户标识
    if (config.method === 'post') {
        config.headers['Content-Type'] = 'application/json';
    }
    // config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    // config.headers.authorization = `Bearer ${token}`;


    return config;
};

const reqFailed = (err) => {
    return Promise.reject(err);
};

const resSuccess = (response) => {
    return response
};

const resFaild = (err) => {
    const errmsg = handleNetworkError(err.response.status)
    // Promise.reject(err.response)
    return Promise.reject(new AxiosError(errmsg));
}

const handleAuthError = (errno) => {
	const authErrMap = {
	  '10031': '登录失效，需要重新登录', // token 失效
	  '10032': '您太久没登录，请重新登录~', // token 过期
	  '10033': '账户未绑定角色，请联系管理员绑定角色',
	  '10034': '该用户未注册，请联系管理员注册用户',
	  '10035': 'code 无法获取对应第三方平台用户',
	  '10036': '该账户未关联员工，请联系管理员做关联',
	  '10037': '账号已无效',
	  '10038': '账号未找到',
	}
	
	if (authErrMap.hasOwnProperty(errno)) {
		message.error(authErrMap[errno])
		// 授权错误，登出账户
		logout()
		return false
	}

	return true
}

const handleNetworkError = (errStatus) => {
    let errMessage = '未知错误'
    if (errStatus) {
        switch (errStatus) {
            case 400:
                errMessage = '错误的请求'
                break
            case 401:
                errMessage = '未授权，请重新登录'
                break
            case 403:
                errMessage = '拒绝访问'
                break
            case 404:
                errMessage = '请求错误,未找到该资源'
                break
            case 405:
                errMessage = '请求方法未允许'
                break
            case 408:
                errMessage = '请求超时'
                break
            case 500:
                errMessage = '服务器端出错'
                break
            case 501:
                errMessage = '网络未实现'
                break
            case 502:
                errMessage = '网络错误'
                break
            case 503:
                errMessage = '服务不可用'
                break
            case 504:
                errMessage = '网络超时'
                break
            case 505:
                errMessage = 'http版本不支持该请求'
                break
            default:
                errMessage = `其他连接错误 --${errStatus}`
        }
    } else {
        errMessage = `无法连接到服务器！`
    }
    message.error(errMessage)
    return errMessage;
}

const handleGeneralError = (errno, errmsg) => {
    if (errno !== '0') {
        message.error(errmsg)
        return false
    }

    return true
}

const instanceMap = new Map();

for (let key in target) {
    const instance = axios.create(target[key]);
    // 添加拦截器
    instance.interceptors.request.use(reqSuccess,reqFailed);
    instance.interceptors.response.use(resSuccess, resFaild);
    instanceMap.set(key, instance);
}

const post =  (url,params={},name="default") => {
    const instance = instanceMap.get(name);
    return new Promise((resolve,reject) => {
        instance.post(url, params).then((res) => {
            if (res?.status === 200) {
                let { data } = res?.data || {};
                resolve(data);
            } else {
                const { statusText = '数据请求失败' } = res || {};
                message.error(statusText)
                // reject(statusText);
            }
        }).catch(e => {
            console.log('e',e)
            // message.error(e);
        })
    })
};

const get = (url,params,name="default") => {
    const instance = instanceMap.get(name);
    return instance.get(url, params);
};

const request = post;

// request.get = get;
// request.post = post;

// request.use = (name) => instanceMap.get(name);


export { request };

// 支持三种  request(url,params) request.post(url,params) request.get(url)
