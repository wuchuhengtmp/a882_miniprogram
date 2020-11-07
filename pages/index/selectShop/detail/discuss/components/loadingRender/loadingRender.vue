<template>
	<view class="loadingWrapper">
		<view class='parent' >
			<ourLoading
					active
					size="30"
					text="加载中"
			/>
		</view>
	</view>
</template>

<script>
	import ourLoading from '@/components/our-loading/our-loading.vue'

	export default {
	    components: {
			ourLoading
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
	.loadingWrapper {
		height: 300upx;
		position: relative;
	.parent {
		width: 100%;
		margin-top: 100upx;
		height: 50vh;
		position:  absolute;  /* 注意需要为加载器定义一个相对定位的父容器 */
	}
	}
</style>
