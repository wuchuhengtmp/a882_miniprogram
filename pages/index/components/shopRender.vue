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
	import {fetchShops} from "../../../services/shops";
	import {isSelectCity} from "../../../utils/common";

	export default {
		props: {
			activeGoToShopSelect: Boolean,
			messageFromParent: String
		},
		data() {
			return {
				title: '请选择',
				shops: []
			};
		},
		watch: {
			activeGoToShopSelect(param) {
				param && this.goToShopSelect();
			}
		},
		mounted: function() {
			uni.$on('selectCity',(data) => {
				this.city =  data.city;
				fetchShops(data.city).then((data) => {
					this.shops = data;
				});
			})
			uni.$on('selectShop',  (shopInfo) => {
				this.title = shopInfo.nickname;
			});
		},
		methods: {
			// 跳转到选择门店
			goToShopSelect: function() {
				isSelectCity().then(() => {
					uni.navigateTo({
					url: "/pages/index/selectShop/selectShop",
						success:(res) => {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit(
									'acceptDataFromOpenerPage',
									{
										city: this.city,
										shops: this.shops,
										message: this.messageFromParent
									}
							);
						}
					})
				}).catch(() => {
					uni.showModal({
						title: '提示',
						content: '请先选择城市',
						confirmText: '前往',
						success(res) {
							if (res.confirm === true) {
								uni.navigateTo({
									url: "./citySelect/citySelect"
								})
							}
						}
					});
				});
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
