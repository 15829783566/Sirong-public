/**
 * 可视口计算 （单位px）
 * @param {需要减去尺寸 （单位rpx）} minus 
 * @returns 
 */
const visibleAreaHeight = (minus = 0) => { // 
    let height;
    let res = uni.getSystemInfoSync()
    height = res.windowHeight - res.statusBarHeight - uni.upx2px(minus) 
    return height
}
export {
    visibleAreaHeight
}
