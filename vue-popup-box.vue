<template>
    <uni-popup ref="dialog">
        <view class="dialog-logout">
            <view class="message"> {{ state.title }} </view>
            <view class="action-row">
                <button
                    @click="openclose('no')"
                    type="default"
                    class="btn-cancel"
                >
                    取消
                </button>
                <button
                    @click="openclose('ok')"
                    type="default"
                    class="btn-confirm"
                >
                    确定
                </button>
            </view>
        </view>
    </uni-popup>
</template>


<script setup>
import { reactive, ref } from "vue";
const state = reactive({
    title: "",
});
const dialog = ref();
let currentMsg = null;
const opens = (title) => {
    state.title = title;
    dialog.value.open();
    return new Promise((resolve, reject) => {
        currentMsg = { resolve, reject };
    });
};

const closes = () => {
    dialog.value.close();
};

const openclose = (action) => {
    if (action === "ok") {
        currentMsg.resolve(true);
    } else {
        currentMsg.reject(false);
    }
    closes();
};

defineExpose({
    opens,
});
</script>

<style lang="scss" scoped>
.dialog-logout {
    width: 600rpx;
    height: 305rpx;
    border-radius: 20rpx;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40rpx;

    .message {
        flex: 1;
        margin-top: 20rpx;
        font-size: 32rpx;
        color: #333333;
    }

    .action-row {
        width: 440rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .btn-cancel {
            width: 200rpx;
            height: 80rpx;
            border-radius: 80rpx;
            background-color: #ffffff;
            border: 1rpx solid #3d8eff;
            font-size: 32rpx;
            color: #3d8eff;
        }

        .btn-confirm {
            width: 200rpx;
            height: 80rpx;
            border-radius: 80rpx;
            background-color: #3d8eff;
            color: #ffffff;
            font-size: 32rpx;
        }
    }
}
</style>
