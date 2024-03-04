export default {
    target: {
        default: {
            baseURL: 'http://api.uomg.com/api/',
            timeout: 1000,
            headers: { 'X-Custom-Header': 'foobar' }
        },
        proxyName1: {}
    },
    before: [],
    after: []
};
