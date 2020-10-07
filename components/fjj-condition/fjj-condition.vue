<template>
	<view>
		<uni-drawer :visible="visibleDrawer" mode="right" @close="closeDrawer()">
			<scroll-view class="drawer-list" scroll-y :style="{'height': drawerHeight}">
				<block v-for="(item, index) in menuList" :key="index">
					<!-- 单选、多选  isMutiple是否支持多选-->
					<view v-if="item.type == 'custom' && item.detailList.length">
						<view class="drawer-list-title flex justify-between">
							<view>
								{{item.title}}
							</view>
							<text v-if="item.detailList.length>showLenght" @tap="showMore(index)">{{item.showMoreList ? '收起' : '更多'}}</text>
						</view>
						<view class="draer-list-con">
							<template v-if="!item.showMoreList">
								<text :style="{background: textItem.isSelected ? color : '', color:  textItem.isSelected ? '#ffffff' : ''}" v-if="idx<showLenght" v-for="(textItem, idx) in item.detailList" :key="idx" :class="textItem.isSelected ? 'on' : ''"
								 @tap="itemTap(idx,item.detailList,item.key, item.isMutiple)">
									{{textItem.title}}
								</text>
							</template>
							<template v-else>
								<text :style="{background: textItem.isSelected ? color : '', color:  textItem.isSelected ? '#ffffff' : ''}" v-for="(textItem, idx) in item.detailList" :key="idx" :class="textItem.isSelected ? 'on' : ''" @tap="itemTap(idx,item.detailList,item.key, item.isMutiple)">
									{{textItem.title}}
								</text>
							</template>
						</view>
					</view>
					<!-- 时间带时分秒范围选择 -->
					<view v-if="item.type == 'rangetime'">
						<view class="drawer-list-title flex justify-between">
							<view>
								{{item.title}}
							</view>
						</view>
						<view class="dateContent" @click="onShowDatePicker('rangetime', item.key)">
							<view>
								<template v-if="result[item.key] && result[item.key].length > 0">
									{{rangetime[0]}}
								</template>
							</view>
							<view>
								<template v-if="result[item.key] && result[item.key].length > 0">
									{{rangetime[1]}}
								</template>
							</view>
						</view>
					</view>
					<!-- 时间不带时分秒范围选择 -->
					<view v-if="item.type == 'range'">
						<view class="drawer-list-title flex justify-between">
							<view>
								{{item.title}}
							</view>
						</view>
						<view class="dateContent" @click="onShowDatePicker('range', item.key)">
							<view>
								<template v-if="result[item.key] && result[item.key].length > 0">
									{{range[0]}}-{{range[1]}}
								</template>
							</view>
						</view>
					</view>
					<!-- 数值范围选择 -->
					<view v-if="item.type == 'rangenumber'">
						<view class="drawer-list-title flex justify-between">
							<view>
								{{item.title}}
							</view>
						</view>
						<view class="dateContent rangenumber-content flex">
							<view class="rangenumber-input">
								<input class="m-input" type="number" clearable v-model="minNumber" :placeholder="item.minPlaceholder || '最小值'" @blur="numberInputBlur(item.key)"></input>
							</view>
							<text>-</text>
							<view class="rangenumber-input">
								<input class="m-input" type="number" clearable v-model="maxNumber" :placeholder="item.maxPlaceholder || '最大值'" @blur="numberInputBlur(item.key)"></input>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
			<view class="filter-content-footer flex justify-center">
				<view class="filter-content-footer-item" @tap="resetClick">
					<text>重置</text>
				</view>
				<view class="filter-content-footer-item" :style="{color}" @tap="sureClick">
					<text>确认</text>
				</view>
			</view>
		</uni-drawer>
		<mx-date-picker :show="showPicker" :color="color" :type="dateType" :value="dateValue" :show-tips="true" :show-seconds="true"
		 @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	/***
	 * 筛选组件，当前支持多选、单选
	 * list、visibleDrawer（是否显示）参数必填
	 * item.type (custom 单选、多选、rangetime 时间范围带时分秒、range 时间范围不带时分秒、rangenumber 数字范围)
	 * item.isMutiple 是否支持多选
	 * 筛选后返回格式{"listName1":[value,value](多选),"listName2":"value"（单选）,...}
	 * rangenumber形式-可能为["",1]或[1,""]表示只有一个最大值或最小值
	 ***/
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	export default {
		props: {
			list: {
				required: true,
				type: Array,
				default () {
					return [];
				},
			},
			visibleDrawer: {
				required: true,
				type: Boolean,
				default: false
			},
			color: {
				type: String,
				default: '#4D7BFE',
			},
		},
		components: {
			uniDrawer,
			MxDatePicker
		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					this.drawerHeight = (res.windowHeight - uni.upx2px(120)) + 'px';
				}
			});
		},
		computed: {
			defaultSelectedObj() { // 保存初始状态
				return this.getSelectedObj()
			},
			selectedObj: {
				get() {
					return this.getSelectedObj()
				},
				set(newObj) {
					return newObj;
				}
			},
			menuList() {
				return this.list;
			}
		},
		data() {
			return {
				menuKey: 1,
				showLenght: 6,
				drawerHeight: '500px',
				selectDetailList: [],
				result: {},
				showPicker: false,
				date: '',
				time: '',
				datetime: '',
				range: [new Date(new Date().getTime() - 24 * 60 * 60 * 1000).Format('yyyy/MM/dd'), new Date().Format('yyyy/MM/dd')],
				rangetime: [new Date(new Date().getTime() - 24 * 60 * 60 * 1000).Format('yyyy/MM/dd hh:mm'), new Date().Format(
					'yyyy/MM/dd hh:mm')],
				dateType: 'rangetime',
				dateValue: '',
				minNumber: '',
				maxNumber: '',
			};
		},

		methods: {
			getSelectedObj() {
				let obj = {};
				for (let i = 0; i < this.menuList.length; i++) {
					let item = this.menuList[i];
					item.isMutiple ? obj[item.key] = [] : obj[item.key] = '';

				}
				this.result = obj;
				return obj;
			},
			
			//筛选项选中或取消
			itemTap(index, list, key, isMutiple) {
				if (isMutiple == true) {
					list[index].isSelected = !list[index].isSelected;
					if (list[index].isSelected) {
						this.selectedObj[key].push(list[index].value);
					} else {
						list[index].isSelected = false;
						var idx = this.selectedObj[key].indexOf(list[index].value);
						this.selectedObj[key].splice(idx, 1);
					}
					this.result = this.selectedObj;
				} else {
					this.selectedObj[key] = list[index].isSelected ? '' : list[index].value;
					this.result = this.selectedObj;
					for (let i = 0; i < list.length; i++) {
						if (index == i && !list[i].isSelected) {
							list[i].isSelected = true
						} else {
							list[i].isSelected = false
						}
					}
				}

				// #ifdef H5
				this.$forceUpdate();
				// #endif
			},

			sureClick() {
				let str_result = {};
				let hasChoose = false;
				for (let key in this.result) {
					if (typeof this.result[key] == 'object') {
						str_result[key] = this.result[key].join(',');
						if (!hasChoose) {
							hasChoose = this.result[key].join(',') !== '' ? true : false;
						}
					} else {
						str_result[key] = this.result[key];
						if (!hasChoose) {
							hasChoose = this.result[key] !== '' ? true : false;
						}
					}
				}

				this.$emit("result", {
					'str_result': str_result,
					'result': this.result,
					'hasChoose': hasChoose,
					'visibleDrawer': false
				});
			},
			resetClick(list, key) {
				this.minNumber = '';
				this.maxNumber = '';
				for (let key in this.result) {
					if (typeof this.result[key] == 'object') {
						this.result[key] = [];
					} else {
						this.result[key] = '';
					}
				}
				for (let i = 0; i < this.menuList.length; i++) {
					if (this.menuList[i].type == 'custom') {
						for (let j = 0; j < this.menuList[i].detailList.length; j++) {
							this.menuList[i].detailList[j].isSelected = false;
						}
					}
				}
				// #ifdef H5
				this.$forceUpdate();
				// #endif
			},
			closeDrawer() {
				this.$emit("result", {
					'changeStatus': true,
					'visibleDrawer': false
				});
			},

			showMore(index) {
				this.menuList[index].showMoreList = !this.menuList[index].showMoreList;
				++this.menuKey;
				// #ifdef H5
				this.$forceUpdate();
				// #endif
			},

			onShowDatePicker(type, key) { //显示
				this.dateType = type;
				this.dateValue = this[type];
				this.showPicker = true;
				this.tempKey = key;
			},

			onSelected(e, key) { //选择
				this.showPicker = false;
				if (e) {
					this[this.dateType] = e.value;
					this.result[this.tempKey] = e.value;
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
				}
			},
			
			numberInputBlur(key) {
				if (this.minNumber != '' && this.maxNumber != '' && parseFloat(this.minNumber) > parseFloat(this.maxNumber)) {
					let temp = this.minNumber;
					this.minNumber = this.maxNumber;
					this.maxNumber = temp;
				}
				this.result[key] = [];
				this.result[key].push(this.minNumber && parseFloat(this.minNumber));
				this.result[key].push(this.maxNumber && parseFloat(this.maxNumber));
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 筛选样式 */
	.drawer-list {
		padding: 0 20rpx;
	}

	.drawer-list .drawer-list-title {
		font-size: 34rpx;
		font-weight: 400;
		line-height: 48rpx;
		margin: 38rpx 0 18rpx;
		color: rgba(34, 34, 34, 1);
	}

	.drawer-list .drawer-list-title>text {
		font-size: 26rpx;
		color: #666666;
	}

	.drawer-list .draer-list-con>text {
		background: rgba(93, 92, 254, 0.1);
		border-radius: 28px;
		color: #666666;
		font-size: 28rpx;
		padding: 10rpx 28rpx;
		margin: 10rpx 10rpx 10rpx 0;
		display: inline-block;
	}

	.filter-content-footer-item {
		width: 160rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		box-shadow: 0rpx 4rpx 16rpx rgba(0, 0, 0, 0.18);
		border-radius: 12rpx;
		margin: 24rpx;
	}

	.filter-content-footer-item:first-child {
		color: #F00A6B;
	}

	.picker {
		z-index: 99999 !important;
	}

	.dateContent {
		&>view {
			background: rgba(244, 244, 244, 1);
			border-radius: 8rpx;
			width: 90%;
			height: 64rpx;
			line-height: 64rpx;
			margin-bottom: 12rpx;
		}
	}
	
	.rangenumber-content {
		&>text {
			display: inline-block;
			width: 10%;
			text-align: center;
			height: 64rpx;
			line-height: 64rpx;
		}
		.rangenumber-input {
			width: 45%;
			display: inline-block;
			padding: 0 12rpx;
			.m-input {
				height: 64rpx;
				line-height: 64rpx;
			}
		}
	}
	/deep/.picker {
		z-index: 999;
	}
</style>
