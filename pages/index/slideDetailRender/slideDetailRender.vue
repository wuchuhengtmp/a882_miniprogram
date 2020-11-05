<template>
	<view>
		<scroll-view>
			<image
					lazy-load
					mode="widthFix"
					:src="imgPath"
			/>
		</scroll-view>
	</view>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				imgPath: ''
			};
		},
        beforeCreate() {
			uni.getStorage({
				key: 'currentSlideDetailImg',
				success: (res) => {
					this.imgPath = res.data;
				}
			})
		}
	}
</script>

<style lang="less">
	image {
		width: 100%;
	}
</style>
