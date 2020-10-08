<template>
	<view class="mainWrapper">
        <view class="filterWrapper">
			<ren-dropdown-filter
					:filterData='filterData'
					:defaultIndex='defaultIndex'
					@onSelected='onSelected'
					@dateChange='dateChange'
                    :height="7"
			/>
		</view>
        <view class="contenWrapper">
			<item-render type="expend" />
			<item-render type="expend" />
			<item-render type="income" />
		</view>
	</view>
</template>

<script>
	import RenDropdownFilter from '@/components/filter/ren-dropdown-filter.vue'
	import itemRender from "./itemRender/itemRender";
	export default {
		components: {
			RenDropdownFilter,
			itemRender
		},
        methods: {
			onselected(res){
				console.log(res)
			},
			datechange(d){
				uni.showtoast({
					icon:'none',
					title:d
				})
			}
		},
		data() {
			return {
				contentWrapperHeight: 0,
				filterData:[
					[
						{ text: '项目名', value: '' },
						{ text: '全部', value: 1 },
						{ text: '200以下', value: 2 },
						{ text: '200-300', value: 3 },
						{ text: '300-400', value: 4 },

					]
				],
				defaultIndex:[0]
			};
		},
		mounted: function () {
			let sys = uni.getSystemInfoSync();
			let winHeight = sys.screenHeight;
			uni.setNavigationBarTitle( {
						title: '我的账单'
					} );
		}
	}
</script>

<style lang="scss">
    @import "../../../uni";
.mainWrapper {
	width: 760upx;
	height: 100vh;
	background-color: $uni-bg-color;
	.filterWrapper {
		height: 9vh;
	}
	.contenWrapper {
		height: 91vh;
		width: 100%;
		overflow: auto;
	}
}
</style>
