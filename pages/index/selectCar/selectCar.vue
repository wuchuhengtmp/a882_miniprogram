<template>
	<view
		ref="mainWrapper"
		class="mainWrapper">
		<view class="headerWrapper">
			<ren-dropdown-filter
				:filterData='filterData'
				:defaultIndex='defaultIndex'
				@onSelected='onSelected'
				@dateChange='dateChange'
				:height="7"
			></ren-dropdown-filter>
		</view>
		<view class="contentWrapper" >
			<select-car-item-render />
		</view>
	</view>
</template>

<script>
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	import selectCarItemRender from "../components/selectCarItemRender";

	export default {
		components: {
			RenDropdownFilter,
			selectCarItemRender
		},
		mounted: function() {
			uni.setNavigationBarTitle({
				title: '选择汽车'
			});
			uni.getSystemInfo({
				success: function(res) { // res - 各种参数
					console.log(res.windowWidth); // 屏幕的宽度

					let info = uni.createSelectorQuery().select(".contentWrapper");
					info.boundingClientRect(function(data) { //data - 各种参数
						console.log(data.width)  // 获取元素宽度
					}).exec()
				}
			});
		},
		data() {
			return {
			    contentWrapperHeight: 0,
				filterData:[
					[
						{ text: '车型', value: '' },
						{ text: '全部', value: 1 },
						{ text: '别客GL', value: 2 },
					],
					[
						{ text: '品牌', value: '' },
						{ text: '小轿车', value: 1 },
						{ text: '商务车', value: 2 },
						{ text: '皮卡车', value: 3 }
					],
					[
						{ text: '档位', value: '' },
						{ text: '全部', value: 1 },
						{ text: '自动档', value: 2 },
						{ text: '手动档', value: 3 }
					],
					[
						{ text: '价格区间', value: '' },
						{ text: '全部', value: 1 },
						{ text: '200以下', value: 2 },
						{ text: '200-300', value: 3 },
						{ text: '300-400', value: 4 },

					],
				],
				defaultIndex:[0,0, 0, 0]
			};
		},
		onLoad() {

		},
		methods: {
			onSelected(res){
				console.log(res)
			},
			dateChange(d){
				uni.showToast({
					icon:'none',
					title:d
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../uni";
	$mainHeight: 100vh;
	$headerHeight: 7vh;
	@mixin commonPadding{
		padding: 0 20upx;
	}
	.mainWrapper {
		background-color: $uni-bg-color;
		height: $mainHeight;
		.headerWrapper {
			background-color: #FFFFFF;
			height: $headerHeight;
			width: 100%;
			@include commonPadding;
		}
		background-color: $uni-bg-color;
		.contentWrapper {
            margin-top: 1.5vh;
			width: 100%;
			overflow: auto;
			height: 91.5vh;
		}
	}
</style>
