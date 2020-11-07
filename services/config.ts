import request, {ResponseState} from '../utils/request';

export interface FetchOneResponseSate extends ResponseState{
    data: {value: string}
}

export const fetchOne = async (key: string): Promise<FetchOneResponseSate > => {
    return request(`/configs/${key}`);
}