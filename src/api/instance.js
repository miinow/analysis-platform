import host from './http.config';
import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    baseURL: host.default,
    timeout: 120000,
    withCredentials: true,
    headers: {},
    validateStatus(status) {
        return status >= 200 && status <= 500; // default
    }
});
instance.interceptors.request.use(config => config);
instance.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            return Promise.reject(response.data);
        }
        if (+response.data.code === 1) {
            return Promise.resolve(response.data);
        }
        if (response.data.code !== 200) {
            console.log(response.data.msg);
            return Promise.reject(response.data);
        }
        return response.data;
    },
    error => Promise.reject(error)
);

const authInstance = axios.create({
    baseURL: host.auth,
    timeout: 30000,
    withCredentials: true,
    headers: {},
    validateStatus(status) {
        return status >= 200 && status <= 500; // default
    }
});
authInstance.interceptors.request.use(config => config);
authInstance.defaults.transformRequest = [
    data => {
        return qs.stringify(data);
    }
];
authInstance.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            return Promise.reject(response.data);
        }
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default { instance, authInstance };
