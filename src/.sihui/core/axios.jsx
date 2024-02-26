import axios from 'axios';
import proxy from '@/config/proxy';
import { message } from 'antd';

const { target } = proxy;

const reqSuccess = (config) => {
    if (config.method === 'post') {
        config.headers['Content-Type'] = 'application/json';
    }
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
};

const reqFailed = (err) => {
    return Promise.reject(err);
};

const resSuccess = (res) => {
    if (response.status !== 200) return Promise.reject(response.data)
    handleGeneralError(response.data.errno, response.data.errmsg)
    return response
};

const resFaild = (err) => {
    handleNetworkError(err.response.status)
    Promise.reject(err.response)
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
}

const handleGeneralError = (errno, errmsg) => {
    if (err.errno !== '0') {
        meessage.error(err.errmsg)
        return false
    }

    return true
}

const defaultInstance = axios.create(target.default);

defaultInstance.interceptors.request.use(reqSuccess,reqFailed);

defaultInstance.interceptors.response.use(resSuccess,resFaild);

const request =  defaultInstance.post;

request.get = defaultInstance.get;
request.post = defaultInstance.post;
request.use = (name) => {
    const axiosInstance = axios.create(target[name]);
    return axiosInstance;
}

export { request };

// 支持三种  request(url,params) request.post(url,params) request.get(url)
