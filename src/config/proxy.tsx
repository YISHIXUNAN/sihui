export default {
    target: {
        default: {
            baseURL: 'https://some-domain.com/api/',
            timeout: 1000,
            headers: { 'X-Custom-Header': 'foobar' }
        },
        proxyName1: {}
    },
    before: [],
    after: []
};
