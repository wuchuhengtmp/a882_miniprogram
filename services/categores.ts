import request from '../utils/request';

export const fetchAll = () => {
    return new Promise((resolve) => {
        request('/categores').then(res => {
            let { data } = res;
            data = data.map(item => {
                return {text: item.name, value: item.id};
            });
            resolve(data);
        });
    });
};
