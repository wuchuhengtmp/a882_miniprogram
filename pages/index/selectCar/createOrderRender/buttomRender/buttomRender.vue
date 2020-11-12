<template>
	<view class="Bmain">
		<view class="leftWrapper">
			<view class="contentRender">合计:
				<text>¥{{allCost}}
				</text>
			</view>
		</view>
		<view class="rightWrapper">
			<view class="centerRender">
				<image src="/static/images/ant.png" />
				免押预定
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			allCost:  {
				type: Number
			}
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
.Bmain {
	width: 100;
	height: 100upx;
    display: flex;
	flex-direction: row;
	justify-content: space-between;
	.leftWrapper {
		width: 70%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
        background-color: white;
        padding-left: 10%;
        .contentRender {
			text{
				padding-left: 10upx;
				color: $theme-color;
			}

		}
	}
	.rightWrapper {
		width: 30%;
		height: 100%;
        background: #60bec9;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		$borderLength: .85rem;
		font-size: $borderLength;
		.centerRender {
			image {
				margin-right: 10upx;
				display: inline-block;
				width: .7rem;
				height: .7rem;
			}
		}
	}
}
</style>
