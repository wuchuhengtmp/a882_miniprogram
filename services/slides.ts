import request from "../utils/request";

/**
 * 获取幻灯片
 * @returns {Promise<unknown>}
 */
export const fetchAll = async () => {
    return request('/slides');
}
