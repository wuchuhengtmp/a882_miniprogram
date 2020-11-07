// 门店的评论
import request, {fonmatResponse} from '../utils/request';

/**
 *  门店的评论列表
 * @param id
 * @param result
 * @param page
 */
export const fetchList = ({id, result, page}: {id: number; result: number; page: number}) => {
    const response =  request(`/shops/${id}/discusses?result=${result}&page=${page}`);
    return fonmatResponse(response);
};
