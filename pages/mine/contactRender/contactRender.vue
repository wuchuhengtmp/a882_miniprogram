<template>
	<view class="mainWrapper">
		<view class="contentWrapper">
			<uni-notice-bar text="请填写您的紧急联系人信息，这能让我们更好地为您提供帮助，谢谢！"></uni-notice-bar>
			<view class="itemWrapper">
				<view class="label">姓名:</view>
				<view class="inputWrapper">
					<input focus placeholder="请输入紧急联系人" />
				</view>
			</view>
			<view class="itemWrapper">
				<view class="label">手机:</view>
				<view class="inputWrapper">
					<input placeholder="请输入紧急联系人手机" />
				</view>
			</view>
			<view class="itemWrapper">
				<view class="label">关系:</view>
				<view class="inputWrapper">
					<input placeholder="请输入你们之间的关系" />
				</view>
			</view>
			<button primary="default" class="button" >保存</button>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		components: {uniNoticeBar},
		data() {
			return {
				
			};
		},
		mounted: function () {
			uni.setNavigationBarTitle({
				title: '紧急联系人'
			});
		}
	}
</script>

<style lang="scss">
@import "../../../uni";
.mainWrapper {
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
    .contentWrapper {
		width: 85%;
		background-color: #fff;
		border-radius: $border-radius;
        padding: 40upx;
        .itemWrapper {
			.inputWrapper {
				height: 2.5rem;
				border: 1upx solid #ccc;
                border-radius: 10upx;
				display: flex;
				align-items: center;
				justify-content: flex-start;

			}
            &:not(:first-child) {
				margin-top: 30upx;
			}
            .label:before {
				content: '*';
				color: red;
			}
		}
		.inputRender {
			border: 1upx solid $subTitlecolor;
			border-radius: $border-radius;
			height: 1rem !important;
		}
		.button {
            margin-top: 70upx;
			width: 200upx;
			background-color: $theme-color;
			color: #fff;
		}
	}
}
</style>
