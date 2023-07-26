import Http from "@/utils/requset"

let Authorization = 'App-Bearer ' + uni.getStorageSync('token')
const upload = (url) => {
    
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: Http.baseUrl + 'app/upload',
            filePath: url,
            header: {
                "App-Authorization": Authorization,
                "client": "MP",
                "resource-type": "app",
                "tenant-id": "2"
            },
            name: 'file',
            success: (res) => {
                let data = JSON.parse(res.data)
                if (data.code === 200) {
                    resolve(data.data)
                } else {
                    reject(data)
                    uni.showToast({
                        title: data.msg,
                        icon: "none"
                    });
                }
            }
        })
    })
}

export default upload
