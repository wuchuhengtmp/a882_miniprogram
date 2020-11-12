import request from '../utils/request';

export const fetchAll = async () => {
    return new Promise((resolve) => {
        request('/tags').then(res => {
            let {data} = res;
            data = data.map(item => {
                const {id, name} = item;
                return {text: name, value: id};
            });
            resolve(data);
        });
    });
};