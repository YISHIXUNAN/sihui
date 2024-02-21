import axios from 'axios';

axios.interceptors.request.use({})

axios.interceptors.response.use({});

class Request {

    constructor(params, url) {
        if (params && url) this.post(url, params);
    }

    get(url) {
        return axios.get(url);
    }

    post(url, params) {
        return axios.post(url, params);
    }
}

const instance = new Request();

const request = (params, url) => new Request(params, url);

request.get = instance.get;
request.post = instance.post;

export { request };

// 支持三种  request(url,params) request.post(url,params) request.get(url)