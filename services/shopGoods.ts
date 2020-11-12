import request from '../utils/request';

interface FetchListParamsState {
    shopId: number;
    page: number;
    result: number;
    costRange?: string;
    tagId?: number;
    brandId?: number;
}

/**
 *  获取商品分页列表
 * @param shopId
 * @param page
 * @param result
 */
export const fetchList = async (params: FetchListParamsState ) => {
    const {shopId, ...otherParams} = params;
    let queryParams = [];
    for(const i in otherParams) {
        queryParams.push(`${i}=${otherParams[i]}`);
    }
    const queryStr = queryParams.join('&');
    return new Promise((resolve) => {
        request(`/shops/${shopId}/goods?${queryStr}`).then((res) => {
            const {data} = res;
            resolve(data);
        });
    });
};
