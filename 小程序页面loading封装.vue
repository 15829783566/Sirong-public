<template>
	<view class="">
		<view
			class="loading-wrapper"
			:class="{ 'loading-wrapper-embed': embed }"
			:style="{ top: topSize, bottom: bottomSize }"
			hover-stop-propagation
			@tap.stop.prevent="defThouch"
			@touchmove.stop.prevent="defMove"
			v-if="inMethods?true:loading"
		> 
		<!-- inMethods -->
			<view class="">
				<view class="progress-loader" ref="wrapper">
					<text class="_text-bold" :style="{ color: underColor, fontSize: fontSize + 'rpx' }">{{ text }}</text>
					<view class="progress-under" :class="{'progress-hidden': initting}" :style="{ color: highlightColor }" ref="progressUnder">
						<text class="_text-bold" :style="{ color: highlightColor, fontSize: fontSize + 'rpx' }">{{ text }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	
	
</template>

<script>
// hj-loading组件内置动画效果组件: 模拟进度条动画效果
// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
const dom = weex.requireModule('dom');
// #endif
let sit;
export default {
	name: 'progress-loader',
	props: {
		// 是否预留出标题栏的高度
		nav: {
			type: Boolean,
			default: false
		},
		// 是否预留出tabBar的高度
		tab: {
			type: Boolean,
			default: false
		},
		// embed 是否为嵌入模式
		embed: {
			type: Boolean,
			default: false
		},
		// 加载中的文字
		text: {
			type: String,
			default: getApp().globalData.appName
		},
		// 加载中文字大小
		fontSize: {
			type: [String, Number],
			default: 58
		},
		// 底层颜色
		underColor: {
			type: String,
			default: '#e8e7e8'
		},
		// 高亮部分颜色
		highlightColor: {
			type: String,
			default: getApp().globalData.color
		},
		//为防止接口调用异常-添加容错延迟： 传负数则此参数不生效
		timeout:{
			type:Number,
			default: 10000
		},
		back:{
			type:Boolean,
			default:false
		},
		//是否启用组件内部方法关闭
		inMethods:{
			type:Boolean,
			default:false
		}
	},
	data() {
		return {
			// 容器初始化
			// nvue初始化时，容器需要有宽度。 为了保证文字最初显示底色，初始化时给高亮色部分先隐藏
			initting: true,
			topSize:'',
			loading:true
		}
	},
	computed: {
		bottomSize() {
			return this.tab ? '50px' : '0';
		}
	},
	created() {
		setTimeout(() => {
			const res = uni.getSystemInfoSync();
			this.topSize = this.nav ? `${res.statusBarHeight + 44}px` : `0px`;
		}, 1);
	},
	
	mounted() {
		// #ifdef APP-NVUE
		// 加个延时，保证一定可以获取到文字容器的宽度
		setTimeout(() => {
			this.createAnimation();
		}, 100);
		// #endif
		// #ifndef APP-NVUE
		this.initting = false;
		// #endif
		uni.$on('loading-close',this.loadingClose)
		
		//为防止接口调用异常-添加容错延迟
		if(this.timeout>0){
			setTimeout(() => {
				this.loadingClose('time')
			}, this.timeout);
		}
	},
	destroyed() {
		clearInterval(sit);
		uni.$off('loading-close')
	},
	methods: {
		createAnimation() {
			// 获取文字容器宽度
			const result = dom.getComponentRect(this.$refs.wrapper, option => {
				const width = option.size.width + 'px';
				this.levelReset();
				// 初始化完毕，显示高亮文字
				setTimeout(() => {
					this.initting = false;
				}, 40);
				this.executeAnimation(width);
			});
		},
		executeAnimation(width) {
			this.progressLeval(width);
			let timer = 0;
			clearInterval(sit);
			sit = setInterval(() => {
				if (timer == 3) {
					this.levelReset();
					timer = 0;
				} else {
					if (timer == 0) {
						this.progressLeval(width);
					}
					timer++;
				}
			}, 1000);
		},
		// 进度重置
		levelReset(width = '0px') {
			animation.transition(this.$refs.progressUnder, {
				styles: {
					width,
				},
				duration: 0, //ms
				timingFunction: 'linear',
				needLayout: false,
				delay: 0 //ms
			});
		},
		// 进度动画
		progressLeval(width) {
			animation.transition(this.$refs.progressUnder, {
				styles: {
					width
				},
				duration: 3000, //ms
				timingFunction: 'linear',
				needLayout: false,
				delay: 0 //ms
			});
		},
		loadingClose(str){
			if(str==='time'&&this.loading){
				this.$emit('timeOut')
			}else if(str==='error'){
				if(this.back){
					uni.showToast({
						icon:'none',
						title:'加载失败'
					})
					this.$u.sleep(1500).then(()=>{
						uni.navigateBack()
					})
					
				}
			}
			this.loading=false
		},
		loadingOpen(){
			this.loading=true
		},
		defThouch(e) {
			// 阻止点击穿透
			// #ifdef APP-NVUE
			e.stopPropagation();
			// #endif
		},
		defMove(e) {
			// 阻止滚动穿透
			// #ifdef APP-NVUE
			e.stopPropagation();
			// #endif
		}
	}
};
</script>

<style scoped>
.loading-wrapper {
	position: fixed;
	left: 0;
	right: 0;
	z-index: 997;
	background-color: #ffffff;
	/* #ifdef APP-NVUE */
	flex: 1;
	/* #endif */
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.loading-wrapper-embed {
	flex: 1;
	position: relative;
	margin-top: 0;
	margin-right: 0;
	margin-bottom: 0;
	margin-left: 0;
	text-align: center;
	background-color: transparent;
	z-index: 1;
}
	
.progress-loader {
	position: relative;
	flex: 1;
}

.progress-under {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	overflow: hidden;
	/* #ifdef APP-NVUE */
	lines: 1;
	width: 750rpx;
	/* #endif */
	/* #ifndef APP-NVUE */
	width: 0;
	white-space: nowrap;
	animation-name: progressloader;
	animation-delay: 0.5s;
	animation-timing-function: linear;
	animation-duration: 3s;
	animation-iteration-count: infinite;
	/* #endif */
}

._text-bold {
	font-weight: 700;
	lines: 1;
}

.progress-hidden {
	opacity: 0;
}

/* #ifndef APP-NVUE */
@keyframes progressloader {
	0% {
		width: 0%;
	}
	100% {
		width: 100%;
	}
}
/* #endif */
</style>
