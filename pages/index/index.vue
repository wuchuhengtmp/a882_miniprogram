<template>
	<view class="wrapper">
		<view class="swiperWrapper">
			<carousel :img-list="imgList" url-key="url" @selected="selectedBanner" />
		</view>
		<view class="formWrapper">
			<view class="itemWrapper">
				<view class="fieldWrapper">
					<cityPickerRender />
				</view>

				<view class="fieldWrapper centerWrapper"></view>

				<view class="fieldWrapper">
					<shopRender />
				</view>
			</view>
			<view class="itemWrapper">
				<view class="fieldWrapper">
					<timeRender
					 label="取车时间"
					 @onChange="onStartTime"
					  />
				</view>
				<view class="fieldWrapper centerWrapper">
					<view class="expired">{{expiredDay}} 天
					</view>
					<view class="redirectRight">
						<view></view>
						<view></view>
					</view>
				</view>
				<view class="fieldWrapper">
					<timeRender 
						label="还车时间"
						@onChange="onEndTime"
						:start-time="endTimeStart"
						 />
				</view>
			</view>
			<view class="itemWrapper">
				<button
					type="default"
					class="buttonRender"
					size="default"
                    @click="goToSelectCar"
				>去选车</button>
			</view>
		</view>
	</view>
</template>

<script>
	import carousel from '@/components/vear-carousel/vear-carousel';
	import cityPickerRender from './components/cityPickerRender.vue';
	import shopRender from './components/shopRender.vue';
	import timeRender from './components/timeRender.vue'
	export default {
		components: {
			carousel,
			cityPickerRender,
			shopRender,
			timeRender
		},
		data() {
			return {
				imgList: [{
						url: '/static/images/swiper/1.jpg',
						id: 1,
						nav: 'http://xxx.com'
					},
					{
						url: '/static/images/swiper/2.jpg',
						id: 2,
						nav: 'http://xxx.com'
					},
					{
						url: '/static/images/swiper/3.jpg',
						id: 3,
						nav: 'http://xxx.com'
					}
				],
				startTime: undefined,
				endTime: undefined
			}
		},
		computed: {
			endTimeStart: function() {
				if (this.startTime) {
					const startTime = new Date(this.startTime);
					return (new Date(startTime.getTime() + 1000 * 60 * 60 * 24)).toString();
				} else {
					return undefined;
				}
			},
			expiredDay: function() {
				if (this.startTime !== undefined && this.endTime !== undefined) {
					const endTime = parseInt(new Date(this.endTime).getTime());
					const startTime = parseInt(new Date(this.startTime).getTime());
					const hours = (endTime - startTime) / 1000 / 60 / 60;
					const day = Math.floor(hours / 24);
					return day;
				} else {
					return 0;
				}
			}
		},
		methods: {
			goToSelectCar() {
				uni.navigateTo({
					url: "./selectCar/selectCar",
					success: function success(res) {
					    console.log(1);
					},
					fail(res) {
						console.log(2);
					}
				});
			},
			selectedBanner(item, index) {
			},
			onStartTime(time)
			{
				this.startTime = time;
			},
			onEndTime(time)
			{
				this.endTime = time;
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: '鑫旺达租车'
			});
			uni.$on('selectCity',(data) => {
				this.city =  data.city;
			})
		}
	}
</script>

<style lang="scss">
	@import "../../uni";
	@mixin flex-colunm-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	@mixin flex-row-center {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		.swiperWrapper {
			background-color: #fff;
		}
	}

	.formWrapper {
		margin-top: 40upx;
		width: 87%;
		background-color: white;
		border-radius: $border-radius;
		padding: 0% 4% 10% 4%;

		@include flex-colunm-center;

		.itemWrapper {
			margin-top: 50upx;
			width: 100%;
			@include flex-row-center;

			.fieldWrapper {
				flex: 1;
                display: flex;
				justify-content: center;
			}

			.centerWrapper {
				flex: none;
				width: 4rem;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: center;
                height: 100%;
				.expired {
					color: rgb(9, 111, 228);
                    font-size: .8rem;
					box-sizing: border-box;
					text-align: center;
					width: 80%;
				}
			}
			.buttonRender {
				background-color: $theme-color;
				color: #fff;
				font-size: .9rem;
				margin-top: 1rem;
				width: 500upx;
			}
		}
	}

	.uni-flex {
		display: flex;
	}

	.uni-row {
		flex-direction: row;
	}
	.direction {
		width: 150upx;
		height: 20upx;
	}
	// 方向样式
	.redirectRight {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		view {
			&:first-child {
				width: 140upx;
				height: 5upx;
				background-color: $theme-color;
			}
			&:last-child {
				height: 0;
				width: 0;
				border-color: transparent $theme-color;
				border-width: 0upx 0upx 15upx 15upx;
				border-style: solid;
			}
		}
		transform: rotateX(180deg);
	}
</style>
