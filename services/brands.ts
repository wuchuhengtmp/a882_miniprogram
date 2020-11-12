import request from '../utils/request';

/**
 *  获取品牌列表
 */
export const fetchAll = async () => {
    return new Promise((resolve) => {
        request('/brands').then(res => {
            let {data} = res;
            data = data.map(item => {
                const {id, name} = item;
                return {text: name, value: id};
            });
            resolve(data);
        });
    });
};