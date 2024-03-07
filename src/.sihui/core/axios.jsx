import axios, { AxiosError }  from 'axios';
import proxy from '@/config/proxy';
import { message } from 'antd';

const { target = {} } = proxy;
const cancelMap = new Map();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDdXJyZW50VXNlciI6eyJpZCI6MSwiY29tcGFueV9pZCI6MSwibmFtZSI6IuWFrOWPuDAxIiwiY3JlYXRlZF9hdCI6MTcwNjU4MzEyNywidXBkYXRlZF9hdCI6MTcwNjU4MzEyN30sImV4cCI6MTcwOTc4MDgxMH0.bOGCSgdhqrMSDdvSbFqS2y2X8JPOtmuOb5MxNf_9Z60'


const cancelRequest = (url)=> {
    cancelMap.get(url)?.abort()
    cancelMap.delete(url)
}

const reqHeaderControll = (config) => {
 // 1.请求的调整 2.配置用户标识
    if (config.method === 'post') {
        config.headers['Content-Type'] = 'application/json';
    }
    // config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    // config.headers.authorization = `Bearer ${token}`;
    return config;
};

const requestCancelControll = config => {
    const url = config.url || '';
    console.log('发起请求了')
    if (cancelMap.get(url)) {
       cancelRequest(url);
    } 
    const controller = new AbortController();
    config.signal = controller.signal;
    cancelMap.set(url, controller);
    return config;
}
// 第一次请求的时候，map 没有值，需要添加一个值
// 第二次请求的时候， 如果上个 请求还没有结束，或者没有请求成功，就应该结束请求


const reqFailed = (err) => {
    return Promise.reject(err);
};

const resSuccess = (response) => {
    console.log('请求成功了')
    const url = response.config.url || ''
    cancelMap.delete(url)
    return response
};

const resFaild = (err) => {
    // 无任何返回数据暂设为请求取消
    if (err?.response) {
        const errmsg = handleNetworkError(err?.response?.status)
        // Promise.reject(err.response)
        return Promise.reject(new AxiosError(errmsg));
    }
    
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
    instance.interceptors.request.use(reqHeaderControll, reqFailed);
    instance.interceptors.request.use(requestCancelControll);
    instance.interceptors.response.use(resSuccess, resFaild);
    instanceMap.set(key, instance);
}

const handleRequest = (method,propsInstance) => {
    return function (url, params = {}, name = "default") {
        const instance = propsInstance || instanceMap.get(name);
        return new Promise((resolve,reject) => {
            instance[method](url, params).then((res) => {
                console.log('typeof res', typeof res);
                if (res?.status === 200) {
                    let { data } = res?.data || {};
                    resolve(data);
                } else {
                    const { statusText = '数据请求失败' } = res || {};
                    console.log(statusText)
                    // message.error(statusText)
                    // reject(statusText);
                }
            }).catch(e => {
                message.error(e.message);
            })
        })
    }
    
};

const request = handleRequest('post');

request.get = handleRequest('get');
request.post = handleRequest('post');

request.use = (name) => {
    const instance = instanceMap.get(name);
    return {
        get: handleRequest('get', instance),
        post:handleRequest('post',instance)
    };
}


export { request };

// 支持三种  request(url,params) request.post(url,params) request.get(url)
