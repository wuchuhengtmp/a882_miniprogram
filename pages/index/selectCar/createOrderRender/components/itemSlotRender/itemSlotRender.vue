<template>
	<view class="CIMainWrapper">
		<view class="CICenterWrapper"
			  :style="{background}"
		>
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			name: String,
			tags: Array,
			banner: String,
			brand: String,
			background: {
				type: String,
				default: 'white'
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
	@import "../../../../../../uni";
	.CIMainWrapper {
		margin-top: 10upx;
		width: 100vw;
		display: flex;
		flex-direction: row;
		justify-content: center;
		.CICenterWrapper {
			width: $centerWrapperWidth;
			border-radius: $border-radius;
			padding: 20upx 30upx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
		}
	}

</style>
