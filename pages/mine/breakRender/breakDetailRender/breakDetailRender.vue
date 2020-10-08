<template>
	<view class="mainWrapper">
		<view class="headerWrapper">
			<image src="/static/images/mine/logo.jpg" class="avatar"/>
			<view class="company">鑫旺达租车公司</view>
			<view class="balance">-701.12</view>
			<view class="status">交易成功</view>
		</view>
        <view class="infoWrapper">
			<view class="introduction">
				<view class="itemWrapper">
					<view class="subTitle">付款方式</view>
					<view>冻结扣款</view>
				</view>
				<view class="itemWrapper">
					<view class="subTitle">扣款原因</view>
					<view>车座损耗</view>
				</view>
				<view class="itemWrapper">
					<view class="subTitle">订单号</view>
					<view>2019101815123433</view>
				</view>
				<view class="itemWrapper">
					<view class="subTitle">创建时间</view>
					<view class="date">2020-10-06 <text>01:33</text></view>
				</view>
			</view>
			<view class="detailWrapper">
				<view class="detailTitle">详情说明</view>
				<view class="contentWrapper">
					<view> 我的车子坏了，赔钱。。</view>
					<view> 我的车子坏了，赔钱。。</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    mounted: function () {
			uni.setNavigationBarTitle({
				title: '违章详情'
			});
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	@import "../../../../uni";
.mainWrapper {
	width: 100%;
	height: 100vh;
    .headerWrapper {
		.company {
			font-size: .9rem;
			margin-top:20upx;
			margin-buttom:20upx;
		}
        .balance {
			font-size: 1.5rem;
			margin-top:20upx;
			margin-buttom:20upx;
		}
		.status {
			font-size: .8rem;
			margin-top: 20upx
		}
		.avatar {
			width: 80upx;
			height: 80upx;
            border-radius: 50%;
			border: 10upx solid #fff;
		}
		width: 100%;
		height: 24vh;
        display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
        border: 10upx solid $uni-bg-color;
	}
	.infoWrapper {
		$width: 680upx;
		width: 100%;
		display: flex;
        flex-direction: column;
		justify-content: center;
		align-items: center;
		.introduction {
			width: $width;
			border-radius: $border-radius;
			background-color: #fff;
			padding: 20upx;
            .itemWrapper {
				height: 70upx;
				.subTitle  {
					color: $subTitlecolor;
				}
				.date {
					text {
						margin-left: 10upx;
					}
				}
				display: flex;
				justify-content: space-between;
				align-items: center;
                font-size: 1rem;
			}
		}
		.detailWrapper {
            margin-top: 20upx;
			width: $width;
			border-radius: $border-radius;
			background-color: #fff;
			padding: 20upx;
            .detailTitle {
				font-size: 1.3rem;
				margin-bottom: 20upx;
			}
		}
	}
}

</style>
