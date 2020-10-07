<template>
	<view class="mainWrapper">
		<view class="contentWrapper">
			<view
				class="contentRender"
			>
				<image
					src="/static/images/order/a.png"
                    class="car"
				/>
				<view class="carInfo">
					<view class="No1Col">
						<view>
							<view class="name">
								<view class="nameRender">
									汪淮 标签
								</view>
                                <view class="cashTag">
                                    <image src="/static/images/index/ant.png" />
									押金双免
								</view>
							</view>
							<view class="subTitle">汪淮 标签</view>
						</view>
						<view class='redirectButton'></view>
					</view>
                    <view class="No2Col">
						<view class="price">
							$0.02
						</view>
						<view class="priceNotice">
                            <view>
								每日租金
							</view>
							<view class="toBottomIcon"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	@import "../../../uni";
	.mainWrapper {
		width: 760upx;
		height: 250upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		.contentWrapper{
			width: 96%;
			height: 230upx;
			border-radius: $border-radius;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
            .contentRender {
				width: 90%;
				height: 190upx;
				display: flex;
                flex-direction: row;
				justify-content: flex-start;
				align-items: center;
                .car {
					width: 40%;
					height: 90%;
				}
				.carInfo {
                    padding-left: 10upx;
					flex:1;
					height: 90%;
                    display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;
					.No1Col {
                        flex: 1;
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.name {
							font-size: .8rem;
							display: flex;
							justify-content: flex-start;
							flex-direction: row;
							align-items: center;
							.cashTag {
                                image {
									width: 25rpx;
									height: 25rpx;
								}
								font-size: 25rpx;
								width: 130upx;
								height: .8rem;
								border-radius: 10upx;
								background-color: #60bec9;
								margin-left: 20upx;
								color: #FFFFFF;
							}
						}
						.subTitle {
							font-size: .7rem;
                            color: $subTitlecolor;
						}
						.redirectButton {
							width: .5rem;
							height: .5rem;
							border-top: .25rem solid $subTitlecolor;
							border-right: .25rem solid $subTitlecolor;
							transform: rotate(45deg);
						}
					}
					.No2Col {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.price {
							color: $theme-color;
							font-size: .9rem;
						}
						.priceNotice {
							font-size: .7rem;
							color: $subTitlecolor;
							display: flex;
							flex-direction: row;
							.toBottomIcon {
								width: 0;
								height: 0;
								border-top: 10rpx solid transparent;
								border-right: 10rpx solid $subTitlecolor;
								border-bottom: 10rpx solid $subTitlecolor;
								border-left: 10rpx solid transparent;
								transform: rotate(45deg);
								margin-top: 1.5px;
								margin-left: 6rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
