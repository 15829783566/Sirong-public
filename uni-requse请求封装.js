import { userInfoStore, loginToken } from "/src/store/user.js"
import base from "@/common/config.js"

let baseUrl = base.baseUrl;

const emptyObj = obj => {//去除参数所有空值
    if (Array.isArray(obj)) return obj;
    let data = { ...obj }
    for (var key in data) {
        if (data[key] === '' || data[key] === null) {
            delete data[key]
        }
    }
    return data
}


const request = async (method, url, data, options = {}) => {
    //临时写法 后期优化
    if (loginToken().token === null) {
        let res = await loginToken().loginGetToken()
        await userInfoStore().userInfoSet()
    }

    const header = {
        'Content-Type': 'application/json;charset=UTF-8',
        'App-Authorization': 'App-Bearer ' + uni.getStorageSync('token'),
        'resource-type': 'app', //请求资源类型 app: C端  system:系统管理端
        'tenant-id': '2', //租户ID 写死,
    }

    let config = {
        url: baseUrl + url || '',
        method: method || "GET",
        data: emptyObj(data) || {},
        header,
        timeout: 15000,
        withCredentials: true
    }
    if (options.load) uni.showLoading({
        title: '加载中',
        mask: true
    });
    let obj = {}

    return new Promise((resolve, reject) => {
        let requestData = {
            success: (res) => {
                uni.hideLoading()
                if (res.data.code === 200) {
                    resolve(res.data)
                } else if(res.data.code === 311){//直播红包抢完了
                    resolve(res.data)
                }else if(res.data.code === 401) {
                    loginToken().loginGetToken()
                } else {
                    uni.$emit('z-paging-error-emit');
                    uni.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 2000
                    });
                    //reject(res.data);
                    //给列表组件传递报错-不用每次写在catch中

                }
                // #ifdef MP-WEIXIN
                if (getApp().globalData.versionInfo != 'release') {
                    // #endif
                    console.log("接口请求数据", {
                        httpUrl: config.url,
                        result: res.data.data,
                        header: res.header,
                        code: res.data.code,
                        data: data,
                        method: method,
                        msg: res.data.msg
                    });
                    // #ifdef MP-WEIXIN
                }
                // #endif
            },
            fail: (err) => {
                uni.showToast({
                    title: err.errMsg,
                    icon: "none"
                });
                //给列表组件传递报错-不用每次写在catch中
                uni.$emit('z-paging-error-emit');
                reject(err);
            },
            complete: (data) => {
                //if (options.load) uni.hideLoading();
                //请求结束给loading组件传递状态-不用每次写在then后
                uni.$emit('loading-close', 'error');
            }
        }

        Object.assign(obj, config, requestData)
        uni.request(obj)
    })
}
const Http = {
    baseUrl, //后台请求url
    // header, //请求头
    /**
     * @param {后台api地址} url String
     * @param {需要接口参数} data Object
     * @param {自定义参数} options Object
     * @returns POST Promise
     */
    post(url, data, options) {
        return request('POST', url, data, options)
    },
    /**
     * @param {后台api地址} url String
     * @param {需要接口参数} data Object
     * @param {自定义参数} options Object
     * @returns GET Promise
     */
    get(url, data, options) {
        return request('GET', url, data, options)
    },
    /**
     * @param {后台api地址} url String
     * @param {需要接口参数} data Object
     * @param {自定义参数} options Object
     * @returns PUT Promise
     */
    put(url, data, options) {
        return request('PUT', url, data, options)
    },
    /**
     * @param {后台api地址} url String
     * @param {需要接口参数} data Object
     * @param {自定义参数} options Object
     * @returns DELETE Promise
     */
    delete(url, data, options) {
        return request('DELETE', url, data, options)
    }

}



export default Http
