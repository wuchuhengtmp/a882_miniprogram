<template>
	<view class="bannerMainWrapper">
		<view class="titleWrapper ">
			精选服务
		</view>
	</view>
</template>

<script>
	import itemRender from '../components/itemSlotRender/itemSlotRender';
	export default {
		components: {
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
	.bannerMainWrapper {
        width: 100%;
		margin-top: 10upx;
        display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		.titleWrapper {
			height: 2rem;
			background-color: $theme-color;
			border-radius: $border-radius;
            width: 90vw;
            font-size: .9rem;
			color: white;
			line-height: 2rem;
            padding-left: 5vw;
		}
	}

</style>
