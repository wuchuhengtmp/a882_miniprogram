<template>
    <item-render>
        <view class="CIitemWrapper">
            <view class="CItitle">
                {{title !== '' ? title : ''}}
                <slot />
                <uni-icons
                    v-if="clausesId"
                    type="help"
                    @click="goToClauses(clausesId)"
                />
            </view>
            <view class="CIrightWrapper" >
                <view class="CIsubtitle"
                  v-if="subTitle !== ''"
                >{{subTitle}}</view>
                <view class="CIcost">
                    {{cost > 0 ? `+` : `-`}}
                    ¥{{Math.abs(cost)}}</view>
            </view>
        </view>
    </item-render>
</template>

<script>
	import itemRender from '../itemSlotRender/itemSlotRender'

	export default {
		props: {
            title: {
                type: String,
                default: ''
            },
            subTitle: {
                type: String,
                default: ''
            },
            cost: Number,
            clausesId: {
            	type: Number,
                default: 0
            }
        },
		components: {
			itemRender
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 打开条款说明
			goToClauses(id)
			{
				uni.navigateTo({
					url: `/pages/index/selectCar/createOrderRender/clause/clause?id=${id}`
				});
			}
		}
	}
</script>

<style lang="scss">
    .CIitemWrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .CItitle {
            font-size: .9rem;
        }
        .CIrightWrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            height: 1rem;
            align-items: center;
            .CIsubtitle {
                font-size: .7rem;
                color: $subTitlecolor;
            }
            .CIcost {
                margin-left: 10upx;
                min-width: 150upx;
                color: $theme-color;
                text-align: right;
            }
        }
    }
</style>
