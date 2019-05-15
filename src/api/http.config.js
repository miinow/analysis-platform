const httpConfig = {
    mock: '',
    development: {
        default: 'http://localhost:3000/',
        auth: 'http://localhost:3000/'
    },
    test: {
        default: 'http://api.prod.bigdata.atguat.com.cn',
        auth: '/service-venus/'
    },
    production: ''
};

export default httpConfig[process.env.http];
