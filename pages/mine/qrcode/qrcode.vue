<template>
	<view class="mainWrapper">
		<view class="centerWrapper">
			<view class="headerWrapper">
				<image src="/static/images/order/a.png"/>
                <view class="nameInfo">
					<view class="nameWrapper">
						<view>
							名字
						</view>
						<image src="/static/images/mine/man.png" />
					</view>
					<view class="locationWrapper">
						<view>广东</view>
						<view class="city">深圳</view>
					</view>
				</view>
			</view>
			<view class="qrWrapper">
                <image src="/static/images/mine/qrimg.png" class="qrRender" />
			</view>
			<view class="borderRender">
				<view>
					请出示二维码给业务员扫一扫，成为推广员
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    components: {
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted: function () {
			uni.setNavigationBarTitle({
				title: '二维码名片'
			});
		}
	}
</script>

<style lang="scss">
@import "../../../uni";

.mainWrapper {
	height: 100vh;
	width: 760upx;
    background-color: $uni-bg-color;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    .centerWrapper {
		width: 650upx;
		height: 850upx;
		background-color: #FFFFFF;
		border-radius: $border-radius;
		padding: 20upx;
		display: flex;
		flex-direction: column;
		.headerWrapper {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 150upx;
			image {
				width: 150upx;
				height: 150upx;
				border-radius: 4upx;
			}
            .nameInfo {
				display: flex;
				flex-direction: column;
				padding: 10upx;
				font-size: .9rem;
                .nameWrapper {
					display: flex;
					justify-content: flex-start;
					flex-direction: row;
					align-items: center;
					image {
						margin-left: 20upx;
						width: 35upx;
						height: 35upx;
					}
				}
				.locationWrapper {
					.city {
						margin-left: 10upx;
					}
					color: $subTitlecolor;
					font-size: .7rem;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-start;
				}
			}

		}
		.qrWrapper {
			width: 100%;
			display: flex;
            flex-direction: column;
			justify-content: center;
			align-items: center;
            height: 600upx;
			.qrRender {
				width: 550upx;
				height: 550upx;
			}
		}
		.borderRender {
			margin-top: 30upx;
			font-size: .7rem;
			color: $subTitlecolor;
			width: 100%;
            display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
