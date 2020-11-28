<template>
	<view class="mainWrapper">
		<view class="itemWrapper">
			<view class="costWrapper">
				<view>
					<text>￥</text>
					<text class="costRender">50</text>
				</view>
				<view class="nameRender">优惠券</view>
			</view>
			<view class="contentWrapper">
				<view>萌新专享优惠券</view>
				<view class="subTitleRender">适用于租金满10000.00使用</view>
				<view class="expireRender"> 2019-10-21 后过期 </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		mounted() {
			uni.setNavigationBarTitle({
				title: '选择优惠卷'
			})
		},
	}
</script>

<style lang="scss" scoped>

	.mainWrapper {
		width: 100vw;
		display: flex;
		flex-direction: column;
		padding: 10upx;
		.itemWrapper {
			margin-top: 10upx;
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 200upx;
			.costWrapper {
                height: 100%;
				width: 10rem;
				background-image: linear-gradient(to right, #57A7FF , #007AFF);
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: white;
				.nameRender {
					font-size: .5rem;
					margin-top: 10upx;
				}
				.costRender {
					font-size: 1.5rem;
				}
			}
			.contentWrapper {
				margin: 0 20upx;
				display: flex;
				height: 100%;
				width: 100%;
				flex-direction: column;
				justify-content: space-around;
				.subTitleRender {
					font-size: .7rem;
					height: 1.7rem;
					line-height: 1.7rem;
                    border-bottom: solid 1upx #ECECEC;
					color: $subTitlecolor;
				}
				.expireRender {
                    @extend .subTitleRender;
					border-bottom: none;
				}
			}
		}
	}

</style>
