<template>
	<view
		ref="mainWrapper"
		class="mainWrapper">
		<view class="headerWrapper"
		>
			<ren-dropdown-filter
				:filterData='filterData'
				:defaultIndex='defaultIndex'
				@onSelected='onSelected'
				@dateChange='dateChange'
				:height="7"
			/>
		</view>
		<scroll-view
			class="contentWrapper"
			scroll-y="true"
			v-if="items.length > 0"
			@scrolltolower="onGoToBottom"
		>
			<select-car-item-render
					v-for="(item, index) in items"
					:item="item"
					:id="item.id"
					:tags="item.tags"
					:cost="item.cost"
					:insuranceCost="item.insuranceCost"
					:banner="item.banner"
					:name="item.name"
					:brand="item.brand.name"
                    :key="index"
			/>
			<view class="buttomLoadingTip">{{lazyLoadingTip}}</view>
		</scroll-view>
		<!--加载为空-->
		<view v-else-if=" items.length === 0 && !isActiveFullLLoading " class="emptyWrapper">
			<image class="image" src="/static/images/empty.svg"/>
			<view class="title">没有数据</view>
		</view>
		<!--加载动画-->
		<ourLoading
			isFullScreen
			:active="isActiveFullLLoading"
			text="加载中..." />
	</view>
</template>

<script>
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	import selectCarItemRender from "../components/selectCarItemRender";
	import {fetchList} from "../../../services/shopGoods";
	import ourLoading from '@/components/our-loading/our-loading.vue'
	import {fetchAll} from "../../../services/categores";
	import {fetchAll as brandsFetchAll } from '../../../services/brands';
	import {fetchAll as tagsFetchAll} from '../../../services/ tags'

	export default {
		components: {
			RenDropdownFilter,
			selectCarItemRender,
			ourLoading
		},
		mounted: function() {
			// 加载车型
			fetchAll().then(res => {
				const [firstItem, ...other] = this.filterData;
				const newFirstItem = [...firstItem, ...res];
				this.filterData = [newFirstItem, ...other];
			});
			// 加载品牌
			brandsFetchAll().then(res => {
				const [firstItem, brandItems, ...other] = this.filterData;
				const newBrandItems = [...brandItems, ...res];
				this.filterData = [firstItem, newBrandItems, ...other];
			});
			// 加载档位
			tagsFetchAll().then(res => {
				const [firstItem, brandItems, tags, ...other] = this.filterData;
				const newTags = [...tags, ...res];
				this.filterData = [firstItem, brandItems, newTags, ...other];
			});
			this.isActiveFullLLoading = true;
			uni.setNavigationBarTitle({
				title: '选择汽车'
			});
			uni.getSystemInfo({
				success: function(res) { // res - 各种参数
					console.log(res.windowWidth); // 屏幕的宽度

					let info = uni.createSelectorQuery().select(".contentWrapper");
					info.boundingClientRect(function(data) { //data - 各种参数

					}).exec()
				}
			});
		},
		data() {
			return {
			    contentWrapperHeight: 0,
				filterData:[
					[
						{ text: '车型', value: '' },
						{ text: '全部', value: '' }
					],
					[
						{ text: '品牌', value: '' },
						{ text: '全部', value: '' },
					],
					[
						{ text: '档位', value: '' },
						{ text: '全部', value: '' },
					],
					[
						{ text: '价格区间', value: '' },
						{ text: '全部', value: '' },
						{ text: '200以下', value: '200' },
						{ text: '200-300', value: '200,300' },
						{ text: '300-400', value: '300,400' },

					],
				],
				defaultIndex:[0,0, 0, 0],
				shopId: undefined,
				startTime: undefined,
				endTime: undefined,
				items: [], // 列表项
				total: undefined, // 总数量
				pageSize: 0, // 当前页数,
				result: 10, // 当前页数量
				isLoading: false,
				isActiveFullLLoading: false,
                selectedBrandId: undefined,
				selectedTagId: undefined,
				selectedCategoryId: undefined,
                selectedCostRange: undefined,
			};
		},
		computed: {
			lazyLoadingTip() {
				return this.hasNextPage() ? '加载中...' : '--我也是有底线的--';
			}
		},
		onLoad(options) {
			const { endTime, shopId, startTime } = options;
			this.endTime = endTime;
			this.shopId = shopId;
			this.startTime = startTime;
			this.onGetNextPage();
			// 获取商品列表
		},
		methods: {
			// 是否有下一页
            hasNextPage() {
				return Math.ceil(this.total / this.result) >  this.pageSize;
			},
			//  列表触底事件
			onGoToBottom() {
            	this.hasNextPage() && this.onGetNextPage();
			},
			// 加载下一页面
			onGetNextPage() {
				this.isLoading = true;
				const page = this.pageSize + 1;
				const filterParams = {};
				if (this.selectedBrandId !== undefined) filterParams.brandId = this.selectedBrandId;
				if (this.selectedCategoryId !== undefined) filterParams.categoryId = this.selectedCategoryId;
				if (this.selectedTagId !== undefined) filterParams.tagId = this.selectedTagId;
				if (this.selectedCostRange !== undefined) filterParams.costRange= this.selectedCostRange;
				fetchList({page, shopId: this.shopId, result: this.result, ...filterParams}).then(res => {
					this.items = this.isActiveFullLLoading ? res.items : [...this.items, ...res.items];
					this.pageSize = page;
					this.total = res.total;
					if (this.isActiveFullLLoading) this.isActiveFullLLoading = false;
				});
			},
			onSelected(res){
				this.pageSize = 0;
				this.isActiveFullLLoading = true;
				const [selectCategory, selectBrand, selectTag, selectCost ] = res;
				this.selectedCategoryId =  selectCategory[0].value == '' ? undefined :selectCategory[0].value;
				this.selectedBrandId = selectBrand[0].value  == ''  ? undefined : selectBrand[0].value;
				this.selectedTagId = selectTag[0].value  == ''  ? undefined : selectTag[0].value;
				this.selectedCostRange = selectCost[0].value  == ''  ? undefined : selectCost[0].value;
				this.onGetNextPage();
			},
			dateChange(d){
				debugger
			}
		},
	}
</script>

<style lang="scss">
	@import "../../../uni";
	$mainHeight: 100vh;
	$headerHeight: 7vh;
	@mixin commonPadding{
		padding: 0 20upx;
	}
	.mainWrapper {
		background-color: $uni-bg-color;
		height: $mainHeight;
		.headerWrapper {
			background-color: #FFFFFF;
			height: $headerHeight;
			width: 100%;
			@include commonPadding;
		}
		background-color: $uni-bg-color;
		.contentWrapper {
            margin-top: 1.5vh;
			width: 100%;
			overflow: auto;
			height: 91.5vh;
		}
		.buttomLoadingTip {
			width: 100vw;
			text-align: center;
		}
		.emptyWrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
            height: 90vh;
			.image {
				$width: 200upx;
				width: $width;
				height: $width;
			}
			.title {
				color: $subTitlecolor;
			}
		}
	}

</style>
