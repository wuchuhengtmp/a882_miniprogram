// import {isH5, Platform} from ''

import {Platform, EPlatform, isH5, isMpWeixin} from "./EPlatform";

/**配置信息*/
export default class Config {
    static baseUrl = 'https://a882.xinwangd.cn/api'
    // 获取请求基地址
    static get httpBaseUrl(): string {
        return `${this.baseUrl}/wechat`
    }
}

// 主题颜色
export const themeColor = '#007aff';