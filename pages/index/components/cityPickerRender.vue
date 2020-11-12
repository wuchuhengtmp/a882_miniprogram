<template>
	<view class="componentWrapper" @click="goToSelectCityPage">
		<view class="labelRender">
			取还车城市
		</view>
		<view>
			<view class="inputWrapper">
				<view class="uni-input">
					{{currentCity }}
				</view>
				<view>
					<text class="icon-xiangxia"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getCityNameByLocation} from "../../../utils/common";

	export default {
		props: {
			activeGoToSelect: Boolean // 由上层指示跳转到城市选择页面
		},
        watch: {
			activeGoToSelect(params) {
				if (params) {
					this.goToSelectCityPage();
				}
			}
		},
		mounted: function() {
			uni.$on('selectCity',(data) => {
				this.currentCity =  data.city;
			})
			uni.getStorage({
				key: 'selectCity',
				success: (res) =>  {
					uni.$emit('selectCity',{city: res.data})
				},
				fail: (res) => {
					uni.getLocation({
						type: 'wgs84',
						success: res => {
							console.log(res);
							let latitude = res.latitude;
							let longitude = res.longitude;
							getCityNameByLocation({latitude, longitude}).then(city => {
								uni.setStorageSync('selectCity', city);
								uni.$emit('selectCity',{city});
							}).catch(e => {
								uni.showToast({
									title: e
								})
							})
						}
					});
				}
			})
		},
		data() {
			return {
				currentCity : '请选择'
			};
		},
		methods: {
		    onChange: function (e) {
				this.$emit('onChange', e);
			},
			goToSelectCityPage: function()
			{
				uni.navigateTo({
					url: "./citySelect/citySelect",
					success(res) {
					},
					fail(res) {
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	@import '../index';
	.componentWrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
				font-size: .8rem;
				text-align: center;
			}
		}
	}
</style>


