//                    _             
//   ____     _ __   __ _  __ _(_)_ __   __ _ 
//  |_  /____| '_ \ / _` |/ _` | | '_ \ / _` |
//   / /_____| |_) | (_| | (_| | | | | | (_| |
//  /___|    | .__/ \__,_|\__, |_|_| |_|\__, |
//           |_|          |___/         |___/ 
// v2.5.7 (2023-03-14)

// 文档地址：https://z-paging.zxlee.cn
// github地址：https://github.com/SmileZXLee/uni-z-paging
// dcloud地址：https://ext.dcloud.net.cn/plugin?id=3935
//page.json文件全局引入
// easycom: {
//         autoscan: true,
//         custom: {
// 						"^z-paging": "@/components/hj-$1/hj-$1.vue"
//         }
//     },

<z-paging ref="paging" v-model="state.commodityList" @query="queryList">
	<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
				<template #top>
				
				</template>
				内容写这里
					正常使用state.commodityList数据
</z-paging>
const queryList = (pageNo, pageSize) => {
	//组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
		//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
	const params = {
			pageNum: pageNo,
			pageSize: pageSize,
			...queryParams
		}
		Api(params).then(data => {
			proxy.$refs.paging.complete(data);
		})
	
})
