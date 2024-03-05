import axios from 'axios';
import proxy from '@/config/proxy';
import { message } from 'antd';

const { target = {} } = proxy;
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDdXJyZW50VXNlciI6eyJpZCI6MSwiY29tcGFueV9pZCI6MSwibmFtZSI6IuWFrOWPuDAxIiwiY3JlYXRlZF9hdCI6MTcwNjU4MzEyNywidXBkYXRlZF9hdCI6MTcwNjU4MzEyN30sImV4cCI6MTcwOTYyMTk3MX0.wpaV5IcNTealpKhsy-fGVJ-p7N5Hc-KJvsyjMs_jSeY';
const reqSuccess = (config) => {
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
    console.log('response', response);
    if (response.status !== 200) return Promise.reject(response?.data)
    handleGeneralError(response?.data?.errno, response?.data?.errmsg)
    return response
};

const resFaild = (err) => {
    handleNetworkError(err?.response?.status)
    // Promise.reject(err?.response)
}

const handleNetworkError = (errStatus) => {
    console.log('errStatus',errStatus)
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
    console.log(target[key],key)
    const instance = axios.create(target[key]);
    // 添加拦截器
    instance.interceptors.request.use(reqSuccess,reqFailed);
    instance.interceptors.response.use(resSuccess, resFaild);
    instanceMap.set(key, instance);
}

console.log('instanceMap',instanceMap)
const post = (url,params={},name="default") => {
    const instance = instanceMap.get(name);
    
    instance.post(url, params);
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
