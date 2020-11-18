<template>
	<view class="mainWrapper">
		<view class="swiperWrapper">
			<carousel :img-list="imgList" url-key="url" @selected="selectedBanner" />
		</view>
		<view class="formWrapper">
			<view class="itemWrapper">
				<view class="fieldWrapper">
					<cityPickerRender
						:active-go-to-select="activeGoToSelectCity"
					/>
				</view>
				<view class="fieldWrapper centerWrapper"></view>
				<view class="fieldWrapper">
					<shopRender
						:active-go-to-shop-select="activeGoToSelectShop"
                        :message-from-parent="messageToShopSelect"
					/>
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
		<quick-message ref="message"></quick-message>
		<coupon-render />
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
	import {validate} from "./index";
	import message from '@/components/quick-message/quick-message.vue'
	import couponRender from "./couponRender/couponRender";
	import Bounce from "../../components/our-loading/loaders/bounce";

	export default {
		components: {
			Bounce,
			carousel,
			cityPickerRender,
			shopRender,
			timeRender,
			yuDatetimePicker,
			MxDatePicker,
			message,
			couponRender
		},
		created: function() {
			// const nextPage = '/pages/index/selectCar/createOrderRender/createOrderRender';
			// uni.navigateTo({
			// 	url: `/pages/login/login?nextPage=${nextPage}`
			// });
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
				activeGoToSelectCity: false, // 激活选择城市
				activeGoToSelectShop: false, // 激活选择门店
				messageToShopSelect: '', // 提示消息在选择门店中显示
				showPicker: false,
				rangetime: [],
				type: 'rangetime',
				value: '',
				imgList: [],
				startTime: undefined,
				endTime: undefined,
                shopId: undefined,
                city: undefined,
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
			// 显示提示消息
			showMessage(params) { //显示message
				this.$refs.message.show({
					type:'default', //String 默认default
					msg: params, //String 显示内容 *
					direction:'top', //String 默认顶部显示
					icon:true, //Boolean|String 显示icon(false/true/string 默认显示icon)
					mask: false, //Boolean 遮罩（默认false没有遮罩）
					time:5000, //Number|Boolean 默认3000/false为不自动关闭
					iconSize: 10, //Number 自定义icon大小(单位px 默认16 设置后会覆盖自定义样式里的设置优先级最高)
					iconColor: '#007aff', //String icon颜色(默认主题颜色 设置后会覆盖自定义样式里的设置优先级最高)
				})
			},
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
				const id = this.shopId;
				const  startTime = this.startTime;
				const endTime = this.endTime;
				validate({
					shopId:id,
					startTime,
					endTime
				}).then(() => {
					uni.navigateTo({
						url: `./selectCar/selectCar?shopId=${this.shopId}&startTime=${this.startTime}&endTime=${this.endTime}`
					});
				}).catch(e => {
					switch (e.errorType) {
						case 'timeRange':
							this.showMessage(e.message)
							this.showPicker = true;
							break;
						case 'shop':
							if (this.city === undefined) {
								this.showMessage(e.message)
								this.activeGoToSelectCity = true;
							} else if (this.shopId === undefined)  {
								this.activeGoToSelectShop = true;
								this.messageToShopSelect = e.message;
							}
							break;
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
			uni.$on('selectShop',  (shopInfo) => {
				this.shopId = shopInfo.id;
			});
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
		width: $centerWrapperWidth;
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
