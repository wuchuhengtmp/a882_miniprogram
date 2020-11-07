import {fetchOne} from "../services/config";

/**
 * 获取服务器的配置
 * @param key
 */
export const getConfigBykey = async (key: string) => {
    const configPrefix = 'config_';
    const saveKey = configPrefix + key;
    return new Promise((resolve) => {
        const refresh = () => {
            return new Promise((resolve) => {
                fetchOne(key).then(res => {
                    const {value} = res.data;
                    uni.setStorage({
                        key: saveKey,
                        data: value
                    });
                    resolve(value);
                });
            });
        };

        uni.getStorage({
            key: saveKey,
            success: (res) => {
                const value = res.data;
                resolve(value);
            },
            fail: () => {
            },
            complete: () => {
                refresh().then(value => {
                    resolve(value);
                });
            }
        });
    });
}

// 获取城市名
const mapApiHttpUrl =  'https://restapi.amap.com/v3/geocode/regeo';
export const getCityNameByLocation = ({longitude, latitude}): Promise<string> => {
    return new Promise((resolve, reject) => {
        getConfigBykey('AMAP_KEY').then(amapKey => {
            uni.request({
                url: `${mapApiHttpUrl}?key=${amapKey}&location=${longitude},${latitude}`,
                success: res => {
                    const {data} = res;
                    if (data.status == '1') {
                        resolve(data.regeocode.addressComponent.city);
                    } else {
                        reject('定位失败,高德地图接口调用失败');
                    }
                }
            });
        })
    });
};

// 是否选择城市了
export const isSelectCity = async () => {
    return new Promise((resolve, reject) => {
        uni.getStorage({
            key: 'selectCity',
            success: () => {
                resolve();
            },
            fail: () => {
                reject();
            }
        });
    });
}

// 计算坐标距离
export const getDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6378137; // 地球长半径
    var φ1 = toRadians(lat1);
    var φ2 = toRadians(lat2);
    var Δφ = toRadians(lat2-lat1);
    var Δλ = toRadians(lon2-lon1);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    return d;

    // 转为弧度
    function toRadians(d) {
        return d * Math.PI / 180;
    }
}

 // 获取地理坐标
export const getLocation = async () :Promise<{longitude: number; latitude: number}> => {
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: 'wgs84',
            success: res => {
                console.log(res);
                let latitude = res.latitude;
                let longitude = res.longitude;
                resolve({latitude, longitude });
            },
            fail: res => {
                reject();
            }
        });
    });
};