<template>
	<item-render>
        <view class="daysWrapper">
			<view class="headerWrapper" >
				<view>租金</view>
				<view class="costRender">¥299.00</view>
			</view>
				<view class="listRender" >
                    <view class="itemWrapper">
						<view>11月13号</view>
						<view>¥299</view>
					</view>
					<view class="itemWrapper">
						<view>11月13号</view>
						<view>¥299</view>
					</view>
					<view class="itemWrapper">
						<view>11月13号</view>
						<view>¥299</view>
					</view>
					<view class="itemWrapper">
						<view>11月13号</view>
						<view>¥299</view>
					</view>
					<view class="itemWrapper">
						<view>11月13号</view>
						<view>¥299</view>
					</view>
					<view class="itemWrapper">
						<view>11月13号</view>
						<view>¥299</view>
					</view>
					<view class="itemWrapper">
						<view>11月13号</view>
						<view>¥299</view>
					</view>
					<view class="itemWrapper">
						<view>11月13号</view>
						<view>¥299</view>
					</view>
					<view class="itemWrapper">
						<view>11月13号</view>
						<view>¥299</view>
					</view>
					<view class="itemWrapper">
						<view>11月13号</view>
						<view>¥299</view>
					</view>
					<view class="itemWrapper">
						<view>11月13号</view>
						<view>¥299</view>
					</view>
				</view>
		</view>
	</item-render>
</template>

<script>
	import itemRender from '../components/itemSlotRender/itemSlotRender';
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"

	export default {
		components: {
			itemRender,
			uniGrid,
			uniGridItem
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
    .daysWrapper {
        width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
        .costRender {
			color: $theme-color;
		}
		.headerWrapper {
			$height:2rem;
			height: $height;
			line-height: $height;
			display: flex;
			width: 100%;
			flex-grow: 1;
			flex-direction: row;
			justify-content: space-between;
			align-content: center;
			border-bottom: solid .75upx $subTitlecolor;
		}
		.listRender {
			width: 100%;
			display: flex;
			justify-content: space-evenly;
			flex-wrap: wrap;
			.itemWrapper  {
               border-radius: $border-radius / 2;
			   border: 1upx solid $subTitlecolor;
			   height: 80upx;
			   flex-basis: calc(130upx - 20upx);
               margin-top: 20upx;
               display: flex;
			   font-size: .7rem;
               display: flex;
			   flex-direction: column;
			   justify-content: center;
               align-items: center;
                view:first-child {
					color: $subTitlecolor;
				}
			   view:last-child{
			   	color: $theme-color;
			   }
		   }
		}
	}
</style>
