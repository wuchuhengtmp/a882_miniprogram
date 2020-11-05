import request from "../utils/request";

/**
 * 获取对外公开数据
 * @returns {Promise<unknown>}
 */
export const fetchAll = async () => {
    return request('/bases');
}