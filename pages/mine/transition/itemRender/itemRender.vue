<template>
    <view class="itemWrapper">
        <view class="contentWrapper">
            <view class="imageWrapper">
                <image
                        v-if="type === 'expend'"
                        src="/static/images/mine/expend.png" />
                <image
                        src="/static/images/mine/income.png"
                        v-if="type === 'income'"
                        class="incomeImage"
                />
            </view>
            <view class="iniforWrapper">
                <view class="info">
                    <view class="centerWrapper leftCenterWrapper">
                        <view class="title">租车费用</view>
                        <view class="category">订单号: 20190318998343</view>
                        <view class="date">10-06 01:33</view>
                    </view>
                </view>
                <view class='balance'>
                    <view :class="{
                        centerWrapper: true,
                        income: type === 'income',
                        expend: type === 'expend',
                    }">
                        <text  class="income" v-if="type === 'income'">+</text>
                        <text v-if="type === 'expend'">-</text>
                         10.00
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	export default {
        props: {
            type: {
                type: 'expend' | 'income'
            }
        },
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
    .itemWrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        background-color: #fff;
        .contentWrapper {
            height: 17vh;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            .imageWrapper {

                .incomeImage {
                    width: 80rpx;
                    height: 80rpx;
                }
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                image {
                    width: 70upx;
                    height: 70upx;
                }
                width: 137upx;
                height: 17vh;
            }
            .iniforWrapper {
                flex: 1;
                height: 17vh;
                border-bottom: 2upx solid $uni-bg-color;
                display: flex;
                justify-content: flex-start;
                flex-direction: row;
                align-items: center;
                .info > .centerWrapper, .balance > .centerWrapper{
                    height: 14vh;
                    width: 90%;
                }
                .info {
                    .leftCenterWrapper {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        view {
                            flex: 1;
                        }
                        .title {
                            font-size: .8rem;
                        }
                        .category, .date {
                            color: $subTitlecolor;
                            font-size: .7rem;
                        }
                    }
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    height: 100%;
                }
                .balance {
                    .income {
                        color: red;
                    }
                    .expend {
                        color: black;
                    }
                    width: 200upx;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
</style>
