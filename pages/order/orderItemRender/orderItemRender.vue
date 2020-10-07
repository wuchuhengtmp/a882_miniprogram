<template>
	<view class="mainWrapper">
		<view class="headerWrapper addborder">
			<text>订单号: <text class="numberRender">2020100117481898</text></text>
            <text class="stautsRender">已取消</text>
		</view>
		<view class="itemWrapper carWrapper addborder">
			<image src="/static/images/order/a.png" />
			<view class="titleWrapper">
				<view>
					<text class="titleRender">车子商品标题。。。</text>
				</view>
				<view class="tabWrapper">
					<text>标签1</text>
					<text>标签2</text>
					<text>标签3</text>
				</view>
			</view>
		</view>
		<view class="itemWrapper orderTimeWrapper">
			<view class="getCarTimeWrapper">
				<text>取车时间</text>
				<text>10月24日</text>
				<text>周二 18:47</text>
			</view>
			<view class="expiredWrapper">
				<view class="dayRender">2天</view>
				<view class="redirectRight">
					<view></view>
					<view></view>
				</view>
				<view class="shopNameRender">店名字</view>
			</view>
			<view class="takeCarWrapper">
				<text>还车时间</text>
				<text>10月25日</text>
				<text>周三 18:47</text>
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
    $backbroundColor: #fff;
	$mainHeight: 40vh;
    $headerHeight: 7vh;
	.mainWrapper {
		border-radius: $border-radius;
		height: $mainHeight;
		margin: 17upx 17upx 0 17upx;
		width: 716upx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		.addborder{
			border-radius: $border-radius;
			border-bottom: 1upx solid $uni-bg-color;
			box-sizing: border-box;
			padding: 0 20upx;
		}
		.itemWrapper {
			height: ($mainHeight - $headerHeight) / 2;
		}
		.headerWrapper {
            height: $headerHeight;
            line-height: $headerHeight;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
            background-color: $backbroundColor;
			font-size: .8rem;
			text {
				.numberRender {
					padding-left: 10upx;
					font-size: .7rem;
				}
			}
			.stautsRender {
				font-size: .7rem;
				color: $subTitlecolor;
			}
		}
		.carWrapper {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			image {
				width: 40%;
				height: 80%;
				box-sizing: border-box;
			}
			.titleWrapper {
				flex: 1;
				display: flex;
				flex-direction: column;
                justify-content: center;
				align-items: flex-start;
                width: 100%;
				height: 80%;
				.titleRender {
					font-size: .9rem;
				}
				.tabWrapper {
					font-size: .7rem;
					color: $subTitlecolor;
                    text:not(:first-child) {
						margin-left: 10upx;
					}
				}
			}
		}
		.orderTimeWrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			.getCarTimeWrapper, .expiredWrapper, .takeCarWrapper {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
            .getCarTimeWrapper, .takeCarWrapper {
                text {
					&:first-child {
						color: $subTitlecolor;
						font-size: .7rem;
					}
					&:nth-child(2) {
						font-size: .85rem;
					}
					&:last-child {
						font-size: .7rem;
					}
				}
			}
			.expiredWrapper {
                .shopNameRender {
					margin-top: .5rem;
					color: $subTitlecolor;
					font-size: .7rem;
				}
				.dayRender {
					color: $theme-color;
					font-size: .8rem;
				}
				// 方向样式
                .redirectRight {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					view {
						&:first-child {
							width: 140upx;
							height: 5upx;
							background-color: $theme-color;
						}
						&:last-child {
							height: 0;
							width: 0;
							border-color: transparent $theme-color;
							border-width: 0upx 0upx 15upx 15upx;
							border-style: solid;
						}
					}
					transform: rotateX(180deg);
				}
			}
		}
	}
</style>
