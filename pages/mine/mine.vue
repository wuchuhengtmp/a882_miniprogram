<template>
	<view class="mainWrapper">
		<view class='headerWrapper'>
			<view class="center">
				<view class="imageInfo">
					<image src="/static/images/order/a.png" />
					<view class="nameInfo">
						<view class="nameInfoCol">名字</view>
						<view class="qrWrapper">
							<view class="phone">
								13427****00
							</view>
                            <view class="qr">
								<image src="/static/images/mine/qr.png" />
								<view class="rightTag"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="moneyInfo">
					<view class="balance">佣金: 0.14元</view>
					<view class="withDraw">提现</view>
					<view class="log">佣金明细</view>
				</view>
			</view>
		</view>
        <view class="itemWrapper">
			<view class="itemRender">
				<image src="/static/images/mine/transactions.png" class="icon" />
				<view>我的账单</view>
				<view class="itemToRight"><view></view></view>
			</view>
			<view class="itemRender">
				<image src="/static/images/mine/promote.png" class="icon" />
				<view>我的推广</view>
				<view class="itemToRight"><view></view></view>
			</view>

			<view class="itemRender">
				<image src="/static/images/mine/errorLog.png" class="icon" />
				<view>违章记录</view>
				<view class="itemToRight"><view></view></view>
			</view>
			<view class="itemRender">
				<image src="/static/images/mine/contact.png" class="icon" />
				<view>紧急联系人</view>
				<view class="itemToRight"><view></view></view>
			</view>
			<view class="itemRender">
				<image src="/static/images/mine/fqa.png" class="icon" />
				<view>常见问题</view>
				<view class="itemToRight"><view></view></view>
			</view>
			<view class="itemRender">
				<image src="/static/images/mine/serverPhone.png" class="icon" />
				<view>服务热线</view>
				<view class="itemToRight"><view></view></view>
			</view>
			<view class="itemRender">
				<image src="/static/images/mine/suggest.png" class="icon" />
				<view>投诉建议</view>
				<view class="itemToRight"><view></view></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		mounted: function() {
			uni.setNavigationBarTitle({
				title: '我的'
			});
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	@import "../../uni";
.mainWrapper {
	display: flex;
    flex-direction: column;
    width: 760upx;
	height: 100vh;
	background-color: $uni-bg-color;
	.headerWrapper {
		width: 760vpx;
		background-color: $theme-color;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.center {
            margin-top: 35upx;
			margin-bottom: 35upx;
			width: 700upx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
            .imageInfo, .moneyInfo {
				width: 100%;
			}
			.imageInfo {
				height: 120upx;
				display: flex;
				flex-direction: row;
                align-items: center;
				justify-content: flex-start;
				image {
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
				}
				.nameInfo {
                    flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
					width: 100%;
					height: 100%;
					padding-left: 20upx;
                    color: #FFFFFF;
                    .nameInfoCol {
						font-size: .9rem;
					}
					.qrWrapper {
						.phone {
							font-size: .7rem;
						}
						width: 100%;
						height: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-direction: row;
                        padding-right: 60upx;
						.qr {
                            display: flex;
							flex-direction: row;
							justify-content: center;
							align-items: center;
							padding-right: 20upx;
							image {
								width: 40upx;
								height: 40upx;
								border-radius: 0;
								margin-right: 10upx;
							}
							.rightTag {
								width: 25upx;
								height: 25upx;
                                box-sizing: border-box;
								border-style: solid;
                                border-top: 3upx;
								border-right: 3upx;
								border-color: #ccc;
								transform: rotate(-135deg);
							}
						}
					}
				}
			}
			.moneyInfo {
				width: 100%;
                margin-top: 20upx;
				height: 70upx;
				background-color: #004faa;
				border-radius: 45upx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				font-size: .8rem;
				opacity:0.6;
				.balance {
					padding-right: 50upx;
				}
				.withDraw {
					border-right: 6upx solid #FFFFFF;
					border-left: 6upx solid #FFFFFF;
					padding-right: 50upx;
					padding-left: 50upx;
				}
                .log {
					padding-left: 50upx;
				}
			}
		}
	}
	.itemWrapper {
        margin-top: 20upx;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		width: 760upx;
		.itemRender {
			.icon {
				width: 50upx;
				height: 50upx;
				margin-right: 8upx;
			}
			font-size: .8rem;
            margin-bottom: 9upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-direction: row;
			width: 760upx;
			padding: 0 50upx;
			background-color: #fff;
			height: 100upx;
			box-sizing: border-box;
			margin-buttom: 3upx;
			.itemToRight {
				flex: 1;
				text-align: right;
				view {
					display: inline-block;
					width: 30upx;
					height: 30upx;
					border-style: solid;
					border-color: #ccc;
					border-top: 7upx;
					border-right: 7upx;
					transform: rotate(-135deg);
				}
			}
		}
	}
}
</style>
