<template>
    <item-render>
		<template>
			<view class="dateMainWrapper">

				<view class="itemWrapper betweenPartWrapper">
					<view class="title">取车时间</view>
					<view class="date">11月11日</view>
					<view class="dayAndTime">
						<view>周四</view>
						<view>12:22</view>
					</view>
				</view>

				<view class="centerWrapper">
					<view class="day">3天</view>
					<view class="direct">
						<view class="line" />
						<view class="triangle" />
					</view>
					<view class="addressRender">惠州市地铁站永恒租车</view>
				</view>

				<view class="itemWrapper betweenPartWrapper">
					<view class="title">还车时间</view>
					<view class="date">11月11日</view>
					<view class="dayAndTime">
						<view>周四</view>
						<view>12:22</view>
					</view>
				</view>

				</view>
			</view>
		</template>
	</item-render>
</template>

<script>
	import itemRender from "../components/itemSlotRender/itemSlotRender";
	export default {
		components:{
			itemRender
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import "../../../../../uni";
	.dateMainWrapper {
        height: 4rem;
		width: 100%;
		display: flex;
		flex-direction: row;
		.itemWrapper {
			flex-grow: 1;
		}
		.centerWrapper {
			flex-grow: 3.3;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			.day {
				color: $theme-color;
			}
			// 方向
			.direct {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: flex-start;
				height: .5rem;
				transform: rotateX(180deg);
				.line {
					height: .13rem;
					width: 4rem;
					background-color: $theme-color;
				}
				.triangle {
					height: 0;
					width: 0;
					border-color: transparent #007aff;
					border-width: 0upx 0upx 15upx 15upx;
					border-style: solid;
				}
			}
			.addressRender {
				font-size: .7rem;
				color: $subTitlecolor;
			}
		}
		.betweenPartWrapper  {
		   display: flex;
		   flex-direction: column;
		   justify-content: space-around;
		   align-items: flex-start;
		   .title {
			   color: $subTitlecolor;
			   font-size: .8rem;
		   }
		   .date {
			   font-size: .9rem;
		   }
		   .dayAndTime {
			   display: flex;
			   flex-direction: row;
			   justify-content: space-between;
               color: $subTitlecolor;
			   font-size: .7rem;
               align-items: flex-end;
		   }
	   }
	}
</style>
