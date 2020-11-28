import Config from "./Config";
import {isLogin} from "./common";

const request = (url, options = {data: {}, method: 'GET'}) => {
    let header = {};
	options.data = options.data ? options.data : {};
    const data = Object.keys(options.data).length > 0 ? {data: options.data} : {};
    return new Promise((resolve) => {
        isLogin().then(token => {
            header = {
                Authorization: `Bearer ${token}`
            }
            uni.request({
                url: Config.httpBaseUrl + url,
                ...data,
                method: options.method,
	            header: {...header},
                success: (res) => {
                    resolve(res.data);
                }
            });
        }).catch(() => {
            uni.request({
                url: Config.httpBaseUrl + url,
                ...data,
                method: options.method,
                success: (res) => {
                    resolve(res.data);
                }
            });
        })
    });
}

export default request;


/**
 *  格式化数据 取出data
 * @param params
 */
export const fonmatResponse = (params) => {
    return new Promise((resolve) => {
        params.then(res => {
            resolve(res.data);
        })
    });
};