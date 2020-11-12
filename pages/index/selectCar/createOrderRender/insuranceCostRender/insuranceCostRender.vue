<template>
    <item-render>
        <view class="IMainWrapper">
            <view class="leftWrapper">
                <view class="name">驾无忧保险
                    <uni-icons
                        type="help"
                        @click="goToClauses(4)"
                    />
                </view>
                <view class="subTitle">
                    添加一份无忧保险,添一份安心
                </view>
            </view>
            <view class="rightWrapper">
                    <view>
                        {{`50元 x 3天, `}}
                    </view>
                    <view class="cost">+¥299.00</view>
                    <radio
                            class="isSelectInsurance"
                            :color="themeColor"
                    />
                </view>
        </view>
    </item-render>
</template>

<script>
	import itemRender from '../components/itemSlotRender/itemSlotRender';
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import {themeColor} from "../../../../../utils/Config";
	import {nativeToClausePageById} from "../../../../../utils/common";

	export default {
		components: {
			itemRender,
            uniIcons
		},
		data() {
			return {
                themeColor
			}
		},
		methods: {
			// 打开条款说明
            goToClauses(id)
            {
                nativeToClausePageById(id)
            }
		}
	}
</script>

<style lang="scss">
    @import "../../../../../uni";
    .IMainWrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .leftWrapper {
            flex-grow: 1;
            display: flex;
            display: flex;
            flex-direction: column;
            .subTitle  {
                font-size: .7rem;
                color: $subTitlecolor;
                height: 1rem;
                line-height: 1rem;
            }
        }
        .rightWrapper {
            color: $subTitlecolor;
            font-size: .75rem;
            text-align: center;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .cost {
                color: $theme-color;
                font-size: 1rem;
            }
           .isSelectInsurance  {
               margin-left: 15upx;
           }
        }
    }
</style>
