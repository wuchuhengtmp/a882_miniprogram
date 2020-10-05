<template>
	<view class="mainWrapper">
		<view class="header" >
            <view>海口</view>
		</view>
		<view class="contentWrapper">
			<view class="ledtWrapper">
				<template
					v-for="(item, index) in list"
					:key="index"
				>
					<view
						:class="{item: true,  active: index === active ? true : false}"
                        @click="onChangeGroup(index)"
					><text>{{item.areaname}}</text></view>
				</template>
			</view>
			<view class="rightWrapper">
                <template
					v-for="(item, index) in list[active]['storeList']"
                    :key="index"
				>
					<view
						class="shopItem"
						@click="onChangeShop(item)"
					>
						<view class="shopTitle">{{item.name}}</view>
						<view class="shopAddress">{{item.address}}</view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    mounted: function() {
			uni.setNavigationBarTitle({
				title: '选择门店'
			});
		},
		data() {
			return {
			    area: '海口',
			    active: 0,
				list: [
					{
						areaname: "惠阳区",
						storeList: [
							{
								id: 29,
								address: "测试门店3的地址",
								name: "测试门店3",
								tag: "火车站"
							},
							{
								id: 32,
								address: "皇家公馆（测试地址第一近）",
								name: "测试门店7",
								tag: "火车站"
							},
							{
								id: 33,
								address: "测试地址第二近",
								name: "测试门店8",
								tag: "飞机场"
							},
							{
								id: 34,
								address: "测试地址第3近",
								name: "测试门店9",
								tag: "火车站"
							}
						]
					},
						{
							areaname: "惠东县",
							storeList: [
								{
									id: 30,
									address: "测试门店5的地址是在惠东县那边的",
									name: "测试门店5",
									tag: "飞机场"
								},
								{
									id: 31,
									address: "惠东县测试门店6的地址哈",
									name: "惠东县测试门店6",
									tag: "火车站"
								}
							]
						}
					]
			}
		},
		methods: {
			onChangeGroup: function (index) {
				this.active = index;
			},
			onChangeShop: function (shopInfo) {
				uni.$emit('selectShop', shopInfo);
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
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
	border-bottom: 3upx solid black;
	box-sizing: border-box;
}
.contentWrapper {
	display: flex;
	flex-direction: row;
	width: 100%;
    height: 93vh;
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
	height: 93vh;
	overflow: auto;
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
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

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
