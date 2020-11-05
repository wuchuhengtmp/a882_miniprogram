<template>
	<view class="mainWrapper">
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
			<view
				class="itemWrapper"
				@click="onShowDatePicker('rangetime')"
			>
				<view class="fieldWrapper">
					<timeRender
					 label="取车时间"
                     :init-time="startTime"
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
						:init-time="endTime"
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
		<mx-date-picker
				:show="showPicker"
				:type="type"
				:value="value"
				:show-tips="true"
				:begin-text="'取车'"
				:end-text="'还车'"
				:show-seconds="true"
				@confirm="onSelected"
				@cancel="onSelected" />
	</view>
</template>

<script>
	import carousel from '@/components/vear-carousel/vear-carousel';
	import cityPickerRender from './components/cityPickerRender.vue';
	import shopRender from './components/shopRender.vue';
	import timeRender from './components/timeRender.vue'
	import yuDatetimePicker from "@/components/yu-datetime-picker/yu-datetime-picker.vue"
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import {fetchAll} from "../../services/bases";
	import {fetchAll as fetchAllSlides} from "../../services/slides";

	export default {
		components: {
			carousel,
			cityPickerRender,
			shopRender,
			timeRender,
			yuDatetimePicker,
			MxDatePicker
		},
		created: function() {

			const now = new Date(Date.now() + 10 * 60 * 1000);
			const year = now.getFullYear();
			const month = now.getMonth() + 1;
			const day = now.getDate();
			const hour = now.getHours();
			const min = now.getMinutes() + 10;
			const a = [`${year}/${month}/${day} ${hour}:${min}`, ''];
			this.rangetime = [`${year}/${month}/${day} ${hour}:${min}` ];
		},
		data() {
			return {
				showPicker: false,
				rangetime: [],
				type: 'rangetime',
				value: '',
				imgList: [
				    // :xxx 这里的垃圾图片要删除
					// {
					// 	url: '/static/images/swiper/1.jpg',
					// 	id: 1,
					// 	nav: 'http://xxx.com'
					// },
					// {
					// 	url: '/static/images/swiper/2.jpg',
					// 	id: 2,
					// 	nav: 'http://xxx.com'
					// },
					// {
					// 	url: '/static/images/swiper/3.jpg',
					// 	id: 3,
					// 	nav: 'http://xxx.com'
					// }
				],
				startTime: undefined,
				endTime: undefined
			}
		},
        beforeCreate() {
			const appNameKey = 'appName';
			uni.getStorage({
				key: appNameKey,
				success: function (res) {
					uni.setNavigationBarTitle({
						title: res
					});
				}
			});
			fetchAll().then((res) => {
				const appName = res.data.appName;
				uni.setNavigationBarTitle({
					title: appName
				});
				uni.setStorage({
					key: appNameKey,
					data: appName
				})
			});
		},
		computed: {
			expiredDay: function() {
				if (this.startTime !== undefined && this.endTime !== undefined) {
					const endTime = parseInt(new Date(this.endTime).getTime());
					const startTime = parseInt(new Date(this.startTime).getTime());
					const hours = (endTime - startTime) / 1000 / 60 / 60;
					const day = Math.floor(hours / 24);
					return day;
				} else {
					return '--';
				}
			}
		},
		methods: {
			onShowDatePicker(type){//显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) {//选择
				this.showPicker = false;
				if(e) {
					this[this.type] = e.value;
					console.log('value => '+ e.value);

					this.startTime = e.date[0].getTime();
					this.endTime = e.date[1].getTime();
					if  (this.startTime < (new Date).getTime())  {
						this.showPicker = true;
						uni.showModal({
							title: '错误',
							content: '取车时间不能早当前时间',
							success: function (res) {
								if (res.confirm) {
								} else if (res.cancel) {
								}
							},
							confirmColor: '#007aff',
						});
					}
				}
			},
			goToSelectCar() {
				uni.navigateTo({
					url: "./selectCar/selectCar",
					success: function success(res) {

					},
					fail(res) {

					}
				});
			},
			selectedBanner(item, index) {
				uni.setStorage({
					key: 'currentSlideDetailImg',
					data: item.nav
				})
				uni.navigateTo({
					url: './slideDetailRender/slideDetailRender',
					success(res) {
					},
					fail(res) {
					}
				})
			},
		},
		mounted() {
			uni.$on('selectCity',(data) => {
				this.city =  data.city;
			})
            // 幻灯片
			fetchAllSlides().then((res) => {
				const items = res.data.map(item => {
					return {id: item.id, url: item.slide.url, nav: item.detail.url};
				});
				this.imgList = items;
			});
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

	.mainWrapper {
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
