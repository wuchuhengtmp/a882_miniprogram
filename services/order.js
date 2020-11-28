import request, {ResponseState} from '../utils/request';

export const create = () => {
	 return request(
			`/pay`, {
				method: 'POST'
			}
	 );
}