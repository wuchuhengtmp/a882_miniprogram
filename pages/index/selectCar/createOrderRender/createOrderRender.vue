<template>
	<scroll-view
		class="COMainWrapper"
		scroll-y="true"
	>
		<car-item-render
			:name="name"
			:brand="brand"
			:tags="tags"
			:banner="banner"
		/>
		<date-render />
		<banner />
		<insurance-cost-render/>
		<days-cost />
		<cost-item-render
			title="基本保障服务费"
            sub-title="40元/天"
            cost="299.00"
            clauses-id="4"
		/>
		<cost-item-render
			title="手续费"
			cost="44.00"
		/>

		<cost-item-render
			sub-title="无敌xxx优惠卷"
			cost="-400.00"
		>
            <template

			>
				<text
					class="volumeRender"
					@click="goToVolumeListPage"
				>优惠卷
				</text>
				<uni-icons
					type="arrowright"
				    :color="themeColor"
                    style="display: inline-block"
					@click="goToVolumeListPage"
				/>
			</template>
		</cost-item-render>
        <clause-list-render
			v-if="payNotices.length > 0"
			:items="payNotices"
		/>
		<agreen-render />
		<buttom-render
			all-cost="100"
		/>
	</scroll-view>
</template>

<script>
	import carItemRender from "./carItemRender/carItemRender";
	import dateRender from "./dateRender/dateRender";
	import banner from "./ banner/ banner";
	import insuranceCostRender from "./insuranceCostRender/insuranceCostRender";
	import daysCost from "./daysCost/daysCost";
	import itemRender from "./components/itemSlotRender/itemSlotRender";
	import costItemRender from "./components/costItemRender/costItemRender";
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import {themeColor} from "../../../../utils/Config";
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import ClauseListRender from "./clauseListRender/clauseListRender";
	import {fetchAll} from "../../../../services/payNotices";
	import ItemSlotRender from "./components/itemSlotRender/itemSlotRender";
	import agreenRender from "./agreenRender/agreenRender";
	import buttomRender from "./buttomRender/buttomRender";

	export default {
		components: {
			buttomRender,
			ItemSlotRender,
			ClauseListRender,
			carItemRender,
			dateRender,
			banner,
			insuranceCostRender,
			daysCost,
			itemRender,
			uniIcons,
			costItemRender,
			uniCollapse,
			uniCollapseItem,
			agreenRender
		},
		created() {
			uni.setNavigationBarTitle({title: '确认订单'});
			// 用户须知
			fetchAll().then(res => {
				this.payNotices = res;
			});
		},
		data() {
			return {
				name: '名字',
				brand: '品牌',
				tags: ['tag1', 'tag2', 'tag...'],
                banner: 'http://a882.xinwangd.cn/storage/9LYYKgyLVvJwoJlermowGsFm3RYVjs0KUG9tvRNT.png',
				themeColor,
				payNotices: []
			}
		},
		methods: {
			// 去能使用列表选择优惠卷
			goToVolumeListPage()
			{
				uni.navigateTo({
					url: '/pages/index/selectCar/createOrderRender/volumePage/volumePage',
				});
			}

		}
	}
</script>

<style lang="scss">
	@import "../../../../uni";
	.COMainWrapper {
		width: 100%;
		max-height: 100vh;
        display: flex;
        .volumeRender {
			color: $theme-color;
		}
	}
</style>
