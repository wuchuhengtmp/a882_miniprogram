<template>
    <view class="disMainWrapper">
        <view class="disListwrapper">
            <view class="disListRender">
                <view class="disTitleRender">用户评论</view>
                <!--加载动画-->
                <loading-render v-if="status === 'loading'" />
                <!--内容列表-->
                <template v-else-if="status === 'finish'" >
                    <view class="disList" >
                        <discuss-item
                                v-for="(item, index) in discussItems"
                                :name="item.name"
                                :date="item.date"
                                :content="item.content"
                                :rate="item.rate"
                                :avatar="item.avatar"
                                :key="index"
                        />
                    </view>
                    <view class="disShowMore" @click="open">查看更多</view>
                </template>
                <!--加载为空-->
                <view v-else class="emptyWrapper">
                    <image class="image" src="/static/images/empty.png"/>
                    <text> 暂无评论 </text>
                </view>
            </view>
        </view>
        <uni-popup ref="popup" type="bottom">
            <discuss-pagination
                    :shop-id="shopId"
                    :is-active="isActive"
            />
        </uni-popup>
    </view>
</template>

<script>
    import discussItem from './discussItem/discussItem';
    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import discussPagination from "./discussPagination/discussPagination";
    import {fetchList} from "../../../../../services/shopDiscuss";
    import loadingRender from "./components/loadingRender/loadingRender";

    export default {
        components: {
            discussItem,
            uniPopup,
            discussPagination,
            loadingRender
        },
        props: {
            shopId: Number,
        },
        data() {
            return {
                discussItems: [],
                status: 'loading',
                isActive: false
            };
        },
        watch: {
            shopId(params) {
                this.getDiscuss();
            }
        },
        methods: {
            open() {
                const popup = this.$refs.popup
                popup.open();
                this.isActive = true;
            },
            getDiscuss() {
                this.status = 'loading';
                fetchList({
                    id: this.shopId,
                    result: 3,
                    page: 1
                }).then((res) => {
                     const {items} = res;
                     this.discussItems = items;
                     this.status = items.length > 0 ? 'finish' : 'empty';
                })
            }
        },
    }
</script>

<style lang="scss">
    @import "../../../../../uni";
    .disMainWrapper {
        display: flex;
        flex-direction: column;
        background-color: $uni-bg-color;
        .disTitleRender {
            margin-top: 10upx;
        }
        .disListRender {
            padding-bottom: 20upx;
            // 暂无用户评论
            .emptyWrapper {
                width: 100%;
                display: flex;
                flex-grow: 1;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                image  {
                    width: 200upx;
                    height: 200upx;
                }
                text {
                    font-size: 0.8rem;
                    color: $subTitlecolor;
                }
            }
        }
        .disList {
            width: 90%;
        }
        .disShowMore {
            margin: 20upx 0;
            text-align: center;
            font-size: 0.8rem;
            line-height: 2rem;
            width: 170upx;
            height: 2rem;
            border: solid 1upx $uni-border-color;
            border-radius: 20upx;
        }
    }
</style>