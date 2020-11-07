<template>
	<view class="mainWrapper">
		<view class="header" >
            <view>{{area}}.{{list[active].name}}</view>
		</view>
		<view class="contentWrapper">
			<view class="ledtWrapper">
				<template
					v-for="(item, shopIndex) in list"
				>
					<view
						:key="item.id"
						:class="{item: true,  active: shopIndex === active ? true : false}"
                        @click="onChangeGroup(shopIndex)"
					><text>{{item.name}}</text></view>
				</template>
			</view>
			<view class="rightWrapper">
                <template v-if="list[active]['shopItems'].length > 0">
					<template
							v-for="(item, index) in list[active]['shopItems']"
					>
						<view
								:key="item.id"
								class="shopItem"
						>
							<view
									class="itemLeftWrapper"
									@click="onChangeShop(item)"
							>
								<view class="shopTitle">{{item.nickname}}
									<view class="tagsWrapper">
										<view
												v-for="(tag, tagIndex) in item.tags"
												:key="tagIndex"
										>{{tag}}</view>
									</view>
								</view>
								<view class="shopAddress">{{item.address}}</view>
							</view>
							<view class="itemRightWrapper" @click="onGoToDetail(item.id)" >
                                    <distance-render
											class="rate"
                                            :latitude="item.latitude"
											:longitude="item.longitude"
											:myLatitude="latitude"
											:myLongitude="longitude"
											v-if="isGetLocation"
									/>
								<view class="rate" v-else>{{item.rate}}分</view>
								<view class="detail" >查看门店</view>
							</view>
						</view>
					</template>
				</template>
				<template v-else>
					<view class="empty">
						<image class="image" src="/static/images/empty.png"/>
						<view>
							暂时无门店
						</view>
					</view>
				</template>
			</view>
		</view>
		<quick-message ref="message"></quick-message>
	</view>
</template>

<script>
	import message from '@/components/quick-message/quick-message.vue'
    import {getLocation, getDistance} from "../../../utils/common";
	import distanceRender from "./distanceRender/distanceRender";

	export default {
		components: {
			'quick-message': message,
			distanceRender
		},
		data() {
			return {
				isGetLocation: false, // 是否获取到定位
                longitude: undefined,
				latitude: undefined,
				area: '',
				active: 0,
				list: [],
				eventchannel: undefined
			}
		},
		mounted: function() {
			uni.setNavigationBarTitle({
				title: '选择门店'
			});
			// 获取坐标
			getLocation().then(({longitude, latitude}) => {
				this.isGetLocation = true;
				this.longitude = longitude;
				this.latitude = latitude;
			});
		},
		created: () => {
			uni.showLoading({title: '加载中',mask:true});
		},
		watch: {
			list: (params) => {
				console.log(params);
			}
		},
		methods: {
			// 换算距离
			getDistanceByLocation({latitude, longitude}) {
				const myLatitude = this.latitude;
				const myLongitude = this.longitude;
				return Math.round(getDistance(latitude, longitude, myLatitude, myLongitude) / 1000);
			},
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
			onGoToDetail: (shopId) => {
                uni.navigateTo({
					url: `/pages/index/selectShop/detail/detail?shopId=${shopId}`,
				});
			},
			onChangeGroup: function (index) {
				this.active = index;
			},
			// 选择门店
			onChangeShop: function (shopInfo) {
				uni.$emit('selectShop', shopInfo);
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad: function(option){
			//获取事件对象
			const eventChannel = this.getOpenerEventChannel()
			// 监听acceptData事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('acceptDataFromOpenerPage',(data) => {
				this.list = data.shops;
				this.area = data.city; // 关闭加载动画
				uni.hideLoading();
				this.eventChannel = eventChannel;
				// 显示消息
				data.message && data.message.length > 0 && this.showMessage(data.message);
			});
		},
	}
</script>

<style lang="scss">
	@import "../../../uni";
.shopTitle{
	display: flex;
	justify-content: center;
	align-items: center;
	.tagsWrapper {
		display: flex;
		justify-content: center;
		align-items: center;
        font-size: 0.7rem;
		view {
			background-color: #03a9f4;
			border-radius: 0.2rem;
			color: white;
			padding: 0 2upx;
		}
        view:not(.first) {
			margin-left: 10upx;
		}
	}
}
.mainWrapper {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
.header {
	width: 100%;
	text-align: center;
	height: 7vh;
    display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 3upx solid $uni-border-color;
	box-sizing: border-box;
}
.contentWrapper {
	display: flex;
	flex-direction: row;
	width: 100%;
    height: 87vh;
}
.ledtWrapper {
	width: 30%;
	background-color: #f5f5f5;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 93vh;
	overflow: auto;
}
.rightWrapper {
	flex: 1;
    padding: 20upx;
	height: 87vh;
	overflow: auto;
	background-color: white;
}
.empty {
	height: 87vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    color: #cccccc;
}
.image {
	width: 200upx;
	height: 200upx;
}
.item {
	min-height: 9vh;
	text-align: center;
    display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.shopItem {
    display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	.itemLeftWrapper {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}
    .itemRightWrapper {
		.rate {
            width: 100%;
			font-size: 0.65rem;
			color: red;
			text-align: right;
		}
		.detail {
			font-size: 0.8rem;
			color: #03a9f4;
		}
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}
}
.shopItem:not(:first-child) {
	 margin-top: 20upx;
}
.shopAddress {
	font-size: .7rem;
	color: #d1d1d1;
}
.active {
	background-color: #FFFFFF;
	color: #2d74d6;
}
</style>
