import axios from './instance';

export const fetchFactory = () => (url, params, isRes = false, method = 'get') => {
    return new Promise((resolve, reject) => {
        const data = method.toUpperCase() === 'GET' ? 'params' : 'data';
        axios
            .instance({
                method,
                url,
                [data]: params
            })
            .then(res => {
                if (isRes) {
                    resolve(res);
                } else {
                    resolve(res.data);
                }
            })
            .catch((err = {}) => {
                reject(err);
            });
    });
};
export const getData = fetchFactory();
