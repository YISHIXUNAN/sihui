export default {
    target: {
        default: {
            // baseURL: 'http://api.uomg.com/api/',
            baseURL: 'https://callbotapi.uincall.com',
            timeout: 1000,
            headers: { 'X-Custom-Header': 'foobar' }
        },
        youyin: {
            baseURL: 'https://callbotapi.uincall.com'
        }
    },
    before: [],
    after: []
};
