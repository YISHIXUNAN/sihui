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
            // console.log('proxy after', res);
            // res.status = 300;
            // console.log('res', res);
            // return res;
        }
    ]
};
