<template>
    <item-slot-render>
        <view class="CLmainWrapper">
            <view class="CLtitleWrapper"
                  @click="isShow = !isShow"
            >
                <view>用户须知</view>
                <uni-icons
                    v-if="isShow"
                    type="arrowdown"
                />
                <uni-icons
                    v-else
                    type="arrowright"
                />
            </view>
            <view class="CLlistWrapper"
                  v-if="isShow"
            >
                <view
                    class="itemWrapper"
                    v-for="(item, index) in items"
                    :key="index"
                >
                    <view>
                        <image :src="item.icon.url"/>
                    </view>
                    <view class="CLcontentWrapper">
                        <view class="ClTitleRender">{{item.title}}</view>
                        <view class="CLContentWrapper">
                            {{item.content}}
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </item-slot-render>
</template>

<script>
	import itemSlotRender from "../components/itemSlotRender/itemSlotRender";
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"

	export default {
		props: {
            items: {
            	type: Array,
                default: []
            }
        },
		components: {
			itemSlotRender,
            uniCollapse,
            uniCollapseItem,
            uniIcons
		},
		data() {
			return {
                isShow: false
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.CLmainWrapper {
    width: 100%;
    .CLtitleWrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.3rem;
        font-size: .9rem;
    }
    .CLlistWrapper {
        display: flex;
        flex-direction: column;
        .itemWrapper {
            margin-top: 10upx;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start ;
            align-items: flex-start;
            image {
                width: 45upx;
                height: 45upx;
            }
            .CLcontentWrapper {
                margin-left: 10upx;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                .ClTitleRender {
                    font-size: .9rem;
                }
                .CLContentWrapper {
                    margin-top: 5upx;
                    font-size: .7rem;
                }
            }
        }
    }
}
</style>
