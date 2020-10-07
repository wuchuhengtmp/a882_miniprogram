<template>
	<view class="mainWrapper">
		<v-tabs
			v-model="activeTab"
			:scroll="false"
			:tabs="tabs"
			@change="changeTab"
            class="tabRender"
			height="8vh"
			lineScale="0.6"
			lineHeight="5rpx"
			fixed
		>
		</v-tabs>
        <view class="contentWrapper">
			<orderItemRender v-for="(item, index) in list[activeTab]"/>
		</view>
	</view>
</template>

<script>
    import orderItemRender from './orderItemRender/orderItemRender.vue';
	export default {
		components: {
			orderItemRender
		},
	    mounted: function() {
			uni.setNavigationBarTitle({
				title: '订单'
			});
		},
		onLoad: function (options) {
			setTimeout(function () {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		data() {
			return {
			    list: [
					5, 4, 3, 2
				],
				activeTab: 0,
				tabs: [
					'全部订单',
					'待付款',
					'预定中',
					'进行中',
				]
			}
		},
		methods: {
			changeTab(index) {
				console.log('当前选中的项：' + index)
                console.log(this.activeTab);
			}
		}
	}
</script>

<style lang="scss">
	@import "../../uni";
	.mainWrapper {
		background-color: $uni-bg-color;
        width: 100%;
		height: 100vh;
	}
	.tabRender {
		height: 10vh;
		box-sizing: border-box;
	}
	.contentWrapper {
		height: 90vh;
		width: 750upx;
		margin-top: .8vh;
		background-color: $uni-bg-color;
	}
</style>
