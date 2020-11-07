/**
 * 为首页提供支支持
 */

// 验证时间
export const validate = (params: {startTime: any, endTime:any; shopId: any}) => {
        return new Promise((resolve, reject) => {
                if (
                    params.startTime === undefined ||
                    params.endTime === undefined
                ) {
                        reject({
                                errorType: 'timeRange',
                                message: '请选择取还车时间'
                        });
                } else if (params.startTime < (new Date()).getTime()) {
                    reject({
                            message: '取车时间不能早于当前时间',
                            errorType: 'timeRange'
                    });
                } else if (params.shopId === undefined) {
                    reject({
                        message: '请选择门店',
                        errorType: 'shop'
                    });
                } else {
                    resolve();
                }
        });

}


