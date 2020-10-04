<template>
	<view class="wrapper">
		<view class="swiperWrapper">
			<carousel :img-list="imgList" url-key="url" @selected="selectedBanner" />
		</view>
		<view class="formWrapper">
			<view class="itemWrapper">
				<view class="fieldWrapper">
					<citiPickerRender />
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
					<view class="expired">{{expiredDay}} 天</view>
				</view>
				<view class="fieldWrapper">
					<timeRender 
						label="还车时间"
						@onChange="onEndTime"
						 />
				</view>

			</view>
			<view class="itemWrapper">
				<button type="default" class="buttonRender" size="default">去选车</button>
			</view>
		</view>

	</view>
</template>

<script>
	import carousel from '@/components/vear-carousel/vear-carousel';
	import citiPickerRender from './components/citiPickerRender.vue';
	import shopRender from './components/shopRender.vue';
	import timeRender from './components/timeRender.vue'
	export default {
		components: {
			carousel,
			citiPickerRender,
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
			expiredDay: function() {
				if (this.startTime && this.endTime) {
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
		created()
		{
			// 设定当前时间默认往后20分钟
			const startTime = Date.now() + 20 * 60 * 1000;
			this.startTime = new Date(startTime);
			// setTimeout(() => {
			// 	this.startTime = new Date(startTime + 1);
			// }, 2000);
		},
		methods: {
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
		}
	}
</script>

<style lang="scss">
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
		border-radius: 25upx;
		padding: 0% 4% 10% 4%;

		@include flex-colunm-center;

		.itemWrapper {
			margin-top: 50upx;
			width: 100%;
			@include flex-row-center;

			.fieldWrapper {
				flex: 1;
			}

			.centerWrapper {
				flex: none;
				width: 4rem;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;

				.expired {
					box-sizing: border-box;
					padding-bottom: 20upx;
					border-bottom: 8upx solid #007aff;
					text-align: center;
					width: 80%;
				}
			}

			.buttonRender {
				background-color: #007aff;
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
</style>
