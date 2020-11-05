import Config from "./Config";

const request = (url, options = {data: {}, method: 'GET'}) => {
    return new Promise((resolve) => {
        const data = Object.keys(options.data).length > 0 ? {data: options.data} : {};
        uni.request({
            url: Config.httpBaseUrl + url,
            ...data,
            // header: {
            //     'custom-header': 'hello' //自定义请求头信息
            // },
            success: (res) => {
                resolve(res.data);
            }
        });
    });
}

export default request;