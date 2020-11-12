import request from '../utils/request'

export const fetchAll = () => {
    return new Promise((resolve) => {
        request('/payNotices').then(res => {
            const{data} = res;
                resolve(data);
        });
    });
};