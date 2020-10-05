<template>
	<view class="componentWrapper">
		<view class="labelRender">
			选择门店
		</view>
		<view>
				<view class="inputWrapper">
					<view
						class="uni-input"
						@click="goToShopSelect"
					>
						{{title}}
					</view>
					<view>
						<text class="icon-xiangxia"></text>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '请选择'
			};
		},
		mounted: function() {
			uni.$on('selectShop',  (shopInfo) => {
				this.title = shopInfo.name;
			});
		},
		methods: {
		    goToShopSelect: function() {
				uni.navigateTo({
					url: "./selectShop/selectShop",
					success(res) {
					},
					fail(res) {
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../index.scss';
	.componentWrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;

		.labelRender {
			font-size: .7rem;
			margin-bottom: .5rem;
			color: $color;
			width: 4rem;
			text-align: center;

		}

		.inputWrapper {
			width: 4rem;
			display: flex;
			flex-direction: row;

			.uni-input {
				width: 3rem;
				text-align: center;
			}
		}
	}
</style>
