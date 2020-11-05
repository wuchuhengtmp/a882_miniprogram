<template>
	<view class="mainWrapper">
		<view class="contentWrapper">
			<uni-notice-bar text="如果您对本产品有任何疑问，欢迎留言。我们将优先处理您的宝贵意见。谢谢！"></uni-notice-bar>
			<textarea
					placeholder="请输入您的意见。。。" v-model="content"
					  focus
			></textarea>
            <view class="inputWrapper">
				<view class="label">姓名</view>
				<view class="inputRender" >
					<input
						v-model="name"
						placeholder="请输入姓名"
					/>
				</view>
			</view>
			<view class="inputWrapper">
				<view class="label">手机</view>
				<view class="inputRender">
					<input
						v-model="phone"
						placeholder="请输入手机"
					/>
				</view>
			</view>

			<button
					primary="default"
                    @click="onSubmit"
			>提交</button>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		components: {uniNoticeBar},
	    created: function() {
			uni.setNavigationBarTitle({title: '投诉建议'});
		},
		methods: {
			onSubmit: function () {

			}
		},
		data() {
			return {
				content: '',
				phone: '',
				name: ''
			};
		}
	}
</script>

<style lang="scss">
	@import "../../../uni";
.mainWrapper {
	background-color: $uni-bg-color;
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
	.contentWrapper {
		width: 680upx;
		background-color: #fff;
        border-radius: $border-radius;
		padding: 20upx;
		textarea {
			padding: 3%;
			border: 3upx solid #ccc;
			width: 94%;
			min-height: 400upx;
			border-radius: $border-radius;
		}
		.inputWrapper {
            margin-top: 15upx;
            .label:before {
				content: '*';
				color: red;
			}
            .inputRender{
				border-radius: 20upx;
				border: 1upx solid #ccc;
				height: 75upx;
                display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
			}
		}
		button {
			margin-top: 80upx;
			width: 200upx;
			margin-bottom: 20upx;
		}
	}
}
</style>
