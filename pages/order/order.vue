<template>
	<view class="mainWrapper">
		<v-tabs
			:value="activeTab"
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
			<view>
				<all-render v-if="activeTab === 0"/>
				<pending-render v-else-if="activeTab === 1"/>
				<scheduling-render v-else-if="activeTab === 2"/>
				<processing-render v-else-if="activeTab === 3"/>
				<finish-render v-else-if="activeTab === 4"/>
			</view>
		</view>
	</view>
</template>

<script>
    import orderItemRender from './orderItemRender/orderItemRender.vue';
    import allRender from './allRender/allRender'
	import pendingRender from "./pendingRender/pendingRender";
    import finishRender from "./finishRender/finishRender";
    import schedulingRender from "./schedulingRender/schedulingRender";
	import processingRender from "./processingRender/processingRender";
	export default {
		components: {
			orderItemRender,
			allRender,
			pendingRender,
			finishRender,
			schedulingRender,
			processingRender
		},
	    mounted: function() {
			uni.setNavigationBarTitle({ title: '订单' });
		},
		data() {
			return {
				animationData: {},
				transType: 'left2right',
				activeTab: 0,
				tabs: [ '全部', '待付款', '预定中', '进行中', '完成', ]
			}
		},
		onShow: function(){
		},

		methods: {
			changeTab(index) {
				console.log('当前选中的项：' + index)
				this.activeTab = index
			},
			rotateAndScaleThenTranslate: function () {
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
