<template>
	<view class="componentWrapper">
		<view class="labelRender">
			取还车城市
		</view>
		<view>
			<view class="inputWrapper">
				<view class="uni-input"
					  @click="goToSelectCityPage"
				>
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
	export default {
		mounted: function() {
			uni.$on('selectCity',(data) => {
				this.currentCity =  data.city;
			})
			uni.getStorage({
				key: 'selectCity',
				success: (res) =>  {
				    console.log(res.data);
					uni.$emit('selectCity',{city: res.data})
				},
				fail: (res) => {
					uni.getLocation({
						type: 'wgs84',
						success: res => {
							console.log(res);
							let latitude = res.latitude;
							let longitude = res.longitude;
							uni.request({
								url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude +
										'&key=UGMBZ-S5AKU-YQGV3-47M5J-BAQ62-ZBBJW',
								success: data => {
									uni.setStorageSync('selectCity', data.data.result.address_component.city)
									uni.$emit('selectCity',{city: data.data.result.address_component.city});
								}
							});
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


