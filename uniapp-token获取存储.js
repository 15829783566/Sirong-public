import { defineStore } from 'pinia'
// import { findUserInfo } from "/src/common/api.js"
import base from "@/common/config.js"

let baseUrl = base.baseUrl;

let findUserInfo = () => {
    const header = {
        'Content-Type': 'application/json;charset=UTF-8',
        'App-Authorization': 'App-Bearer ' + uni.getStorageSync('token'),
        'resource-type': 'app', //请求资源类型 app: C端  system:系统管理端
        'tenant-id': '2', //租户ID 写死,
    }
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + 'app/userInfo',
            header: header,
            method: "get"
        }).then(({
            data
        }) => {
            resolve(data.data)
        })
    })
}
export const userInfoStore = defineStore({
    id: 'userInfo', // id必填，且需要唯一
    state: () => {
        return uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '未登录'
    },
    // actions 用来修改 state
    actions: {
        userInfoSet() {
            return new Promise((r, e) => {
                findUserInfo().then(res => {
                    uni.setStorageSync('userInfo', res)
                    this.userInfo = res
                    r(true)
                })
            })

        },
    }

})
let login = () => {
    return new Promise((resolve, reject) => {
        let data;
        const req = data => {
            uni.request({
                url: baseUrl + 'auth/appLogin',
                data,
                method: "post"
            }).then(({
                data
            }) => {
                resolve(data.data.access_token)
            })
        }
        // #ifdef H5
        data = {
            tenantId: "2",
            //wxId: "o0u-y5MblieWKCcMtZt4agMmNcLk"//我的
            //wxId: "o0u-y5JcLk8DO7MavFE2AFzZh9VQ" //创客
            wxId: "o0u-y5GuXGB9Y_XDUGOKaJNcSCHM" //简简单单

        }
        req(data)
        // #endif 


        // #ifdef MP
        data = {
            tenantId: "2",
            code: ""
        }
        uni.login({
            provider: 'weixin',
            success: function (res) {
                console.log("code:" + res.code);
                data.code = res.code
                req(data)
            }
        })
        // #endif
    })

}

export const loginToken = defineStore('token', {
    state: () => {
        return {
            token: uni.getStorageSync('token') || null
        }
    },
    getters: {},
    actions: {
        loginGetToken() {
            return new Promise((r, e) => {
                login().then(data => {
                    uni.setStorageSync('token', data)
                    r(true)
                })
            })
        }
    }
})
