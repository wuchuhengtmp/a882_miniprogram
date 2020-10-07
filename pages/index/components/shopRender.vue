<template>
	<view class="componentWrapper">
		<view class="labelRender">
			选择门店
		</view>
		<view>
				<view class="inputWrapper"
				  @click="goToShopSelect"
				>
					<view
						class="uni-input"
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
			width: 100%;
			text-align: center;

		}

		.inputWrapper {
			display: flex;
			flex-direction: row;

			.uni-input {
				text-align: center;
				font-size: .8rem;
			}
		}
	}
</style>
