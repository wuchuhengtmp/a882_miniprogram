<template>
	<view class="mainWrapper">
		<view class="swiperWrapper">
			<carousel
					:img-list="shopInfo.banners"
					url-key="url"
			/>
		</view>
		<view class="listwrapper">
			<view class="listRender">
				<view class="itemWrapper">
					<view class="titleRender">门名</view>
					<view class="titleContent">{{shopInfo.nickname}}</view>
				</view>
				<view class="itemWrapper">
					<view class="titleRender">评分</view>
					<view class="contentRender">
						<uni-rate
								:value="shopInfo.rate"
								:is-fill="false"
								readonly
								:size="16"
						/>
					</view>
				</view>
				<view class="itemWrapper">
					<view class="titleRender">联络电话</view>
					<view class="contentRender" @click="onCallPhone">
						{{shopInfo.phone}}
					</view>
				</view>
				<view class="itemWrapper">
					<view class="titleRender">地址</view>
					<view class="contentRender">
						{{shopInfo.address}}
					</view>
				</view>
				<view
						class="itemWrapper removeBorder"
						v-if="shopInfo.latitude.length > 0"
				>
					<view class="titleRender">位置{{distance}}</view>
					<view class="contentRender">
						<map
								:latitude="shopInfo.latitude"
								:longitude="shopInfo.longitude"
                                height="200"
                                :markers="markers"
						/>
					</view>
				</view>
				<view class="itemWrapper removeBorder">
					<view class="contentRender actionWrapper">
						<button
							size="mini"
							@click="onGoToLocation"
						>去这里</button>
						<button
							type="default"
							size="mini"
							class="pickShopButton"
							@click="onSelected"
						>选这里</button>
					</view>
				</view>
			</view>
		</view>

		<!--用户评论-->
		<discuss
				class="discussRender"
				:shopId="shopInfo.id"
		/>
	</view>
</template>

<script lang="ts">
	import {fetchOneShop, FetchOneShopState} from "../../../../services/shops";
	import carousel from '@/components/vear-carousel/vear-carousel';
	import discuss from './discuss/discuss';
	import {getDistance} from "../../../../utils/common";

	export default {
		components: {
			carousel,
			discuss
		},
		data() {
			return {
				isLoad: false,
				markers: [
				],
				shopInfo: {
					id: 0,
					nickname: '',
					banners: [],
					longitude: 0,
					latitude: 0,
					address: '',
					rate: 0,
					phone: ''
				},
				distance: '', //门店和坐标的距离
			};
		},
		created: function() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
		},
		methods: {
			// 计算坐标距离
			caculateDistance(latitude, longitude) {
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						let myLatitude = res.latitude;
						let myLongitude = res.longitude;
						let distance =  getDistance(latitude, longitude, myLatitude, myLongitude);
						distance = Math.round(distance / 1000);
						this.distance = `（距离您当前位置:${distance}Km）`
					}
				});
			},
			// 拨打电话
			 onCallPhone() {
				 uni.makePhoneCall({
					 phoneNumber: `${this.shopInfo.phone}`
				 });
			 },
			// 打开外部地图应用
			onGoToLocation() {
				uni.openLocation({
					latitude: parseFloat(this.shopInfo.latitude),
					longitude: parseFloat(this.shopInfo.longitude),
					name: this.shopInfo.nickname,
					address: this.shopInfo.address
				});
			},
			// 选择这家门店
            onSelected() {
				uni.$emit('selectShop', {
					nickname: this.shopInfo.nickname,
					id: this.shopInfo.id
				});
				uni.navigateBack({
					delta: 2
				})
			}
		},
		onLoad: function (option: {shopId: number}) {
			const shopId = option.shopId;
			fetchOneShop(shopId).then((res) => {
				uni.hideLoading();
				this.shopInfo = res;
				const masker = {
						id: 1,
						latitude: res.latitude,
						longitude: res.longitude,
						iconPath: '',
						title: res.address
				};
				this.markers = [masker];
				this.isLoad = true;
				this.caculateDistance(res.latitude, res.longitude);
			});
		}
	}
</script>

<style lang="scss">
	@import "../../../../uni";
	.mainWrapper{
        display: flex;
        flex-direction: column;
        background-color: $uni-bg-color;
		.swiperWrapper {
		}
		.listwrapper{
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			.listRender{
				width: 87%;
                background-color: white;
				border-radius: $border-radius;
				display: flex;
				flex-direction: column;
				align-items: center;
				// 列表项
				.itemWrapper {
                    width: 90%;
					padding: 20upx 0;
					.titleRender {
						font-size: 0.85rem;
						color: $subTitlecolor;
						margin-bottom: 10upx;
					},
					.contentRender {
						font-size: 0.95rem;
					}
					.actionWrapper {
						width: 60%;
						margin-left: 20%;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
                        .pickShopButton {
							background-color: $theme-color;
							color: white;
						}
					}

				}
				.itemWrapper:not(first) {
					border-bottom: 1upx solid $uni-border-color;
				}
				.removeBorder{
					border-bottom: 0upx solid $uni-border-color !important;
				}
			}
		}
		.discussRender {
			margin-top: 20upx;
		}
	}
</style>
