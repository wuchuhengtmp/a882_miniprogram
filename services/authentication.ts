import request from '../utils/request';
import {ResponseState} from "../utils/RequestType";
import {auth} from "../utils/common";

// login
interface  AuthenticationParamsState  {
    avatarUrl: string;
    city: string;
    code: string;
    country: string;
    gender: string;
    language: string;
    nickName: string;
    province: string;
}
interface AuthenticationResponseState extends ResponseState{
    data: {
        token: string;
    }
}
export const authentication = (params: AuthenticationParamsState): Promise<AuthenticationResponseState> => {
    return new Promise((resolve) => {
        request('/authentications', {
            method: 'POST',
            data: params
        }).then((res) => {
            auth(res.data.token);
            resolve(res);
        });
    });
}