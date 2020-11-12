<script src="../../../services/brands.ts"></script>
<template>
	<view
		class="mainWrapper"
	    @click="goToCreateOrderPage(item.id)"
	>
		<view class="contentWrapper">
			<view
				class="contentRender"
			>
				<image
					:src="banner.url"
                    class="car"
				/>
				<view class="carInfo">
					<view class="No1Col">
						<view>
							<view class="name">
								<view class="nameRender">
									{{`${brand} ${name}`}}
								</view>
									<preferential-render
										v-if="insuranceCost === 0"
									/>
							</view>
							<view class="subTitle">
								<text
									v-for="(tag, index) in tags"
									:key="index"
								>
									{{tag.name}}
								</text>
							</view>
						</view>
						<view class='redirectButton'></view>
					</view>
                    <view class="No2Col">
						<view class="price">
							¥ {{cost}}
						</view>
						<view class="priceNotice">
                            <view>
								{{id}}每日租金
							</view>
							<view class="toBottomIcon"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import preferentialRender from "./preferentialRender/preferentialRender";
    import {isLogin} from "../../../utils/common";

	export default {
		components: {
			preferentialRender
		},
		props: {
			item: Object,
			id: String,
			tags: Array,
			cost: Number,
			insuranceCost: Number,
			banner: Object,
			name: String,
			brand: String
		},
		data() {
			return {
				
			};
		},
		methods: {
			goToCreateOrderPage(id) {
				const nextPage = `/pages/index/selectCar/createOrderRender/createOrderRender?id=${id}`;
				isLogin().then(() => {
					uni.navigateTo({
						url: nextPage
					});
				}).catch(() => {
					uni.navigateTo({
						url: `/pages/login/login?nextPage=${nextPage}`
					});
				});
				// 去下单
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../uni";
	.mainWrapper {
		width: 760upx;
		height: 250upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		.contentWrapper{
			width: 96%;
			height: 230upx;
			border-radius: $border-radius;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
            .contentRender {
				width: 90%;
				height: 190upx;
				display: flex;
                flex-direction: row;
				justify-content: flex-start;
				align-items: center;
                .car {
					width: 40%;
					height: 90%;
                    border-radius: 8upx;
				}
				.carInfo {
                    padding-left: 10upx;
					flex:1;
					height: 90%;
                    display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;
					.No1Col {
                        flex: 1;
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.name {
							font-size: .8rem;
							display: flex;
							justify-content: flex-start;
							flex-direction: row;
							align-items: center;
						}
						.subTitle {
							font-size: .7rem;
                            color: $subTitlecolor;
						}
						.redirectButton {
							width: .5rem;
							height: .5rem;
							border-top: .25rem solid $subTitlecolor;
							border-right: .25rem solid $subTitlecolor;
							transform: rotate(45deg);
						}
					}
					.No2Col {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.price {
							color: $theme-color;
							font-size: .9rem;
						}
						.priceNotice {
							font-size: .7rem;
							color: $subTitlecolor;
							display: flex;
							flex-direction: row;
							.toBottomIcon {
								width: 0;
								height: 0;
								border-top: 10rpx solid transparent;
								border-right: 10rpx solid $subTitlecolor;
								border-bottom: 10rpx solid $subTitlecolor;
								border-left: 10rpx solid transparent;
								transform: rotate(45deg);
								margin-top: 1.5px;
								margin-left: 6rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
