<template>
    <view class="itemWrapper" @click="goToDetail">
        <view class="contentWrapper">
            <view class="imageWrapper">
                <image
                        src="/static/images/mine/break.png"
                        class="incomeImage"
                />
            </view>
            <view class="iniforWrapper">
                <view class="info">
                    <view class="centerWrapper leftCenterWrapper">
                        <view class="title">车座损耗</view>
                        <view class="category">订单号: 20190318998343</view>
                        <view class="date">10-06 01:33</view>
                    </view>
                </view>
                <view class='balance'>
                    <view :class="{
                        centerWrapper: true,
                        expend: true
                    }">
                        <text>-</text>
                         10.00
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
            goToDetail: function() {
                uni.navigateTo({url: './breakDetailRender/breakDetailRender'});
            }
		},
        mounted: function () {
		    uni.setNavigationBarTitle({
                title: '违章详情'
            });
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
            height: 13vh;
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
                height: 13vh;
            }
            .iniforWrapper {
                flex: 1;
                height: 13vh;
                border-bottom: 2upx solid $uni-bg-color;
                display: flex;
                justify-content: flex-start;
                flex-direction: row;
                align-items: center;
                .info > .centerWrapper, .balance > .centerWrapper{
                    height: 10vh;
                    width: 90%;
                }
                .info {
                    .leftCenterWrapper {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        view {
                            &:nth-child(2) {
                                margin-top: 10upx;
                                margin-bottom: 10upx;
                            }
                        }
                        .title {
                            font-size: .9rem;
                        }
                        .category, .date {
                            color: $subTitlecolor;
                            font-size: .8rem;
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
                    width: 140upx;
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
