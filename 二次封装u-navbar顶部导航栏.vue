使用
<navbar key="5" :showLeftIcon="false" topColor="#FFF" title="XXXXX"></navbar>


<template>
    <view class="" :style="customStyle">
        <u-navbar @left-click="leftClick" :title="navbarInit.title" :autoBack="false" :height="navbarInit.navbarHeight"
            :fixed="isfixed" :leftIconSize="showLeftIcon ? navbarInit.leftIconSize : 0" :bgColor="navbarInit.navground"
            :leftIconColor="navbarInit.topColor" :titleStyle="[{ 'color': navbarInit.topColor }, $u.addStyle(titleStyle)]">
            <template #left>
                <block v-if="showLeftIcon">
                    <u--image src="http://jkzl.oss-accelerate.aliyuncs.com/theme/ckhw/icon_back.png" width="48rpx"
                        height="48rpx" v-if="!backIcon"></u--image>
                    <u-icon :name="backIcon" size="48rpx" v-else></u-icon>
                </block>
            </template>
        </u-navbar>
    </view>
</template>
<script setup>
import {
    reactive,
    getCurrentInstance,
    onMounted,
    ref,
    onUnmounted
} from "vue";
import {
    onLoad, onPageScroll, onBackPress
} from "@dcloudio/uni-app";

const props = defineProps({
    //标题
    title: {
        type: String,
        default: ''
    },
    //导航栏是否固定在顶部
    isfixed: {
        type: Boolean,
        default: true
    },
    //开启沉浸式，不显示标题
    immersive: {
        type: Boolean,
        default: false
    },
    //导航栏高度
    navbarHeight: {
        type: [Number, String],
        default: '88rpx'
    },
    //左变icon大小
    leftIconSize: {
        type: [Number, String],
        default: '40rpx'
    },
    // 背景颜色
    navground: {
        type: String,
        default: 'transparent'
    },
    // 导航栏背景颜色After
    navgroundAfter: {
        type: String,
        default: '#ffffff'
    },
    //标题颜色
    topColor: {
        type: String,
        default: '#252525'
    },
    //不传则默认
    backIcon: {
        type: String,
        default: null
    },
    //是否显示左边返回
    showLeftIcon: {
        type: Boolean,
        default: true
    },
    //外层自定义样式
    customStyle: {
        type: Object,
        default: () => {
            return {}
        }
    },
    titleStyle: {
        type: Object,
        default: () => {
            return {}
        }
    },
    isCustom: {//左侧返回自定义跳转
        type: Boolean,
        default: false
    }


});
const emit = defineEmits();
const navbarInit = reactive({
    title: props.immersive ? '' : props.title,
    scrollTop: 88,
    topColor: props.topColor,
    navground: props.navground,
    leftIconSize: props.leftIconSize,
    navbarHeight: props.navbarHeight,
})

const leftClick = () => {
    if (props.isCustom) {
        emit('getBack')
        return
    }

    let routes = getCurrentPages()
    if ((routes.length - 2) >= 0) {
        let lastPage = routes[routes.length - 2].route // 页面栈中的最后一个项为当前页面，route属性为页面路径
        if (lastPage === 'pages/home/QRcodePage') {
            uni.switchTab({ url: "/pages/home/index" })
        } else {
            uni.navigateBack({
                delta: 1,
                fail() {
                    uni.switchTab({
                        url: "/pages/home/index"
                    })
                },
            })
        }
    } else {
        uni.switchTab({
            url: "/pages/home/index"
        })
    }
}

onLoad(() => {
    uni.$on('onPageScroll', function (data) {
        if (data >= navbarInit.scrollTop) {
            navbarInit.navground = props.navgroundAfter
            navbarInit.topColor = '#333'

        } else if (data < navbarInit.scrollTop && data > parseInt(navbarInit.scrollTop) / 2) {
            navbarInit.navground = props.navgroundAfter
            navbarInit.title = props.title
            navbarInit.topColor = '#333'

        } else {
            navbarInit.navground = 'transparent'
            navbarInit.title = props.immersive ? '' : props.title
            navbarInit.topColor = props.topColor
        }
    });
})


onUnmounted(() => {
    console.log('onUnmounted')
    uni.$off(['onPageScroll', ''])
    uni.$u.setConfig({
        config: {
            unit: 'rpx'
        },
    })
})
</script>

<style lang="scss" scoped>
.u-nav-slot {
    width: 48rpx;
    height: 48rpx;
}
</style>
