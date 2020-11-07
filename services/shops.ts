import request from '../utils/request';

export const fetchShops = async (cityName: string) => {
    return new Promise((resolve) => {
        request(`/shops/cities/${cityName}`).then(res => {
            resolve(res.data);
        })
    });
};

export interface FetchOneShopState {
    id: number;
    nickname: string;
    banners: Array<{id: number; url: string}>;
    longitude: number;
    latitude: number;
    address: string;
    rate: number;
}

export const fetchOneShop = (id: number): Promise<FetchOneShopState> => {
    return new Promise((resolve) => {
        request(`/shops/${id}`).then((res) => {
            const data = res.data as FetchOneShopState;
            resolve(data);
        });
    });
}
