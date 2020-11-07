<template>
	<view class="disPageMainWrapper">
		<view class="disListwrapper">
			<view class="disListRender disPageListRender">
				<view class="disTitleRender">用户评论</view>
				<!--内容列表-->
				<scroll-view
					class="disList"
					scroll-y="true"
					v-if="status === 'finish'"
					@scrolltolower="onScrolltolower"
				>
					<discuss-item
						v-for="(item, index) in discussItems"
						:name="item.name"
						:date="item.date"
						:content="item.content"
						:rate="item.rate"
						:avatar="item.avatar"
						:key="index"
					/>
					<view class="bottomTipRender">{{bottomTip}}</view>
				</scroll-view>
				<!--加载动画-->
				<loading-render v-if="status === 'loading'"/>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<discuss-pagination />
		</uni-popup>
	</view>
</template>

<script lang="ts">
	import discussItem from "../discussItem/discussItem";
	import {fetchList} from "../../../../../../services/shopDiscuss";
	import loadingRender from "../components/loadingRender/loadingRender.vue";

	export default {
	    props: {
	        shopId: Number,
			isActive: Boolean // 用户外部首次点击 这边第一次加载数据用的
	    },
		components: {
			discussItem,
			loadingRender
		},
		data() {
			return {
				status: 'loading',
                discussItems: [],
				nexPage: 1,
				result: 10,
				total: 1,
				bottomTip: '加载中...',
				isLoadingNextPage: false // 防抖
			}
		},
        watch: {
			shopId(params) {
				// this.getDiscuss();
			},
            isActive(params) {
				const id = this.shopId;
				if (params) {
					this.getPageList({page: this.nexPage})
				}
			}

		},
		methods: {
			// 获取分页数据
			getPageList({ page}: {page: number}) {
				const id = this.shopId;
				const result = this.result;
				if (!this.isLoadingNextPage) {
					this.isLoadingNextPage = true;
					fetchList({id, result, page}).then((res) => {
						const {items, total} = res;
						this.total = total;
						this.page = page
						this.discussItems = [...this.discussItems, ...items] ;
						this.status = 'finish';
						this.isLoadingNextPage = false
					});
				}
			},
            // 触底事件
			onScrolltolower(params) {
				const maxPage = Math.ceil(this.total / this.result);
				// 更新下一页
				if (maxPage > this.page) {
				    this.bottomTip = '加载中...'
					this.getPageList({ page: this.page + 1 })
				} else {
					this.bottomTip = '--我也是有底线的--'
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../../../../uni";
	.disPageMainWrapper {
		display: flex;
		flex-direction: column;
		.disTitleRender {
			margin: 10upx 0;
		}
		.disList {
			max-height: 85vh;
			width: 90%;
		}
		.disShowMore {
			margin: 20upx 0;
			text-align: center;
			font-size: 0.8rem;
			width: 150upx;
			height: 1rem;
		}
		.disPageListRender {
            border-radius: $border-radius $border-radius 0 0;
		}
        .bottomTipRender {
			width: 100%;
			text-align: center;
		}
	}
</style>
