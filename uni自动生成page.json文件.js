//mainSubImport.js 文件
// const home = require('./modules/home.js')
// const commodity = require('./modules/commodity.js')
// const classification = require('./modules/classification.js')
// const myContent = require('./modules/my-content.js')
// const shoppingTrolley = require('./modules/shopping-trolley.js')
// const userTheory = require('./modules/user-theory.js')
// const groupPurchase = require('./modules/group-purchase.js')
// const order = require('./modules/order.js')
// const personalCenter = require('./modules/personal-center.js')
// const ckUserTheory = require('./modules/ck-user-theory.js')
// const activity = require('./modules/activity.js')
// const ponzi = require('./modules/ponzi.js')
// const groupBuying = require('./modules/group-buying.js')
// const liveBroadcast = require('./modules/live-broadcast.js')
// const seckill = require('./modules/seckill.js')
// const imLogin = require('./modules/im-login.js')
// const integralMall = require('./modules/integral-mall.js')
// const explosiveGoods = require('./modules/explosive-goods.js')


// /**
//  * 主包模块
//  */
// const mainPackagesPages = [
//     home,
//     classification,
//     myContent,
//     shoppingTrolley,
//     userTheory,
//     personalCenter,
//     ckUserTheory,
//     activity,
//     groupBuying
// ]
// /**
//  * 分包模块
// */
// const subPackagesPages = [
//     commodity,
// 	groupPurchase,
// 	order,
// 	ponzi,
// 	imLogin,
// 	seckill,
//     liveBroadcast,
//     integralMall,
//     explosiveGoods
// ]

// module.exports = {
//     mainPackagesPages,
//     subPackagesPages
// }

//index.js 文件
// module.exports = {
//     lazyCodeLoading: "requiredComponents",
//     globalStyle: {
//         navigationBarBackgroundColor: "#FFFFFF",
//         navigationBarTextStyle: "black",
//         navigationBarTitleText: "uni-app",
//         backgroundColor: "#F8F8F8",
//         enablePullDownRefresh:true

//     },
//     easycom: {
//         autoscan: true,
//         custom: {
//             "^u-(.*)": "uview-plus/components/u-$1/u-$1.vue",
// 			"^hj-(.*)": "@/components/hj-$1/hj-$1.vue"
//         }
//     },
// 	"mp-weixin" : {
// 		optimization:{"subPackages":true}
// 	},
//     tabBar: {
//         color: '#666',
//         backgroundColor: '#FFFFFF',
//         borderStyle: 'white',       
//         list: [
//             {
//                 pagePath: 'pages/home/index',
//                 iconPath: 'static/img/Bar/1.png',
//                 selectedIconPath: 'static/img/Bar/1-1.png',
//             },
//             {
//                 pagePath: 'pages/ck-user-theory/index',
//                 iconPath: 'static/img/Bar/2.png',
//                 selectedIconPath: 'static/img/Bar/2-1.png',
//             },
//             {
//                 pagePath: 'pages/classification/index',
//                 iconPath: 'static/img/Bar/3.png',
//                 selectedIconPath: 'static/img/Bar/3-1.png',
//             },
//             {
//                 pagePath: 'pages/shopping-trolley/index',
//                 iconPath: 'static/img/Bar/4.png',
//                 selectedIconPath: 'static/img/Bar/4-1.png',
//             },
//             {
//                 pagePath: 'pages/personal-center/index',
//                 iconPath: 'static/img/Bar/5.png',
//                 selectedIconPath: 'static/img/Bar/5-1.png',
//             },
//         ]
//     }
// }






const fs = require('fs')
const router = require('../index.js')
const { mainPackagesPages, subPackagesPages } = require('./../mainSubImport.js')

/**
 * 加载'./modules'目录子路由配置文件
 * @returns {*[]}
 */
const getRouter = () => {
    let router = []
    mainPackagesPages.forEach(item => {
        router = [...router, ...mainPackagesPagesBuildRouter(item)]
    })
    return router
}

/**
 * 加载需要分包的路由配置文件
 */
const getSubPackagesRouter = () => {
    let router = []
    subPackagesPages.forEach(item => {
        router = [...router, subPackagesBuildRouter(item)]
    })
    return router
}

/**
 * 将子路由模块配置文件转化为pages.json配置文件格式
 * @param route
 * @returns {*[]}
 */
const mainPackagesPagesBuildRouter = route => {
    const res = []
    const { baseUrl, children } = route
    children.forEach(i => {
        const obj = {
            path: baseUrl + i.path,
            style: {
                navigationBarTitleText: i.name
            }
        }
        Object.keys(i).forEach(ii => {
            !['path', 'name'].includes(ii) && (obj.style[ii] = i[ii])
        })
        res.push(obj)
    })
    return res
}

/**
 * 构建分包页面路由
 */
const subPackagesBuildRouter = (route) => {
    const { baseUrl, children } = route
    const jo = {
        root: baseUrl,
        pages: []
    }
    children.forEach(item => {
        let obj = {};
        item.path ? obj.path = item.path : null;
        item.name ? obj.name = item.name : null;
        obj = {
            ...obj,
            style: {
                navigationBarTitleText: item.text
            }
        }
        Object.keys(item).forEach(ii => {
            !['path', 'name'].includes(ii) && (obj.style[ii] = item[ii])
        })
        jo.pages.push(obj)
    })
    return jo
}

/**
 * 构建 pages 并写入 pages.json 文件
 * 用两个空格缩进pages.json,或使用制表符:`\t`
 * @type {*[]}
 */
router.pages = getRouter()
let ArrSubPackages = getSubPackagesRouter()
if (ArrSubPackages.length > 0) router.subPackages = ArrSubPackages
fs.rename(__dirname + '/../../pages.json', __dirname + '/../../pages.json.back', err => {
    if (err) {
        console.log('ERR:',err)
    } else {
        console.log('"pages.json" Backup succeeded!')
        fs.writeFile(__dirname + '/../../pages.json',
            //JSON.stringify(router, null, '\t'),
            JSON.stringify(router),
            err => {
                err ? console.error('ERR:',err) : console.log('"pages.json" update successfully!')
            }
        )
    }
})
