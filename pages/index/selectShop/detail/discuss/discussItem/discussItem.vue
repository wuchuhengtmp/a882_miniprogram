<template>
	<view class="disItemWrapper">
		<view class="disAvatar">
			<img :src="avatar" />
		</view>
		<view class="disContentWrapper">
			<view class="disTopWrapper">
				<view class="disNameAndDate">
					<view class="disName">{{name}}</view>
					<view class="disDate">{{date}}</view>
				</view>
				<view class="disRateRender">
					<uni-rate
							:value="rate"
							:is-fill="false"
							readonly
							:size="12"
					/>
				</view>

			</view>
			<view class="disContentRender">
				{{content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: String,
			date: String,
			content: String,
			rate: Number,
			avatar: String
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
	@import "../../../../../../uni";
	$avatarAreaWidth: 45upx;

	// 定义头像区域
	@mixin avatar {
		.disAvatar {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			img {
				border-radius: 100%;
				height: $avatarAreaWidth;
				width: $avatarAreaWidth;
			}
		}
	}

	// 定义内容区域
	@mixin content {
		.disContentWrapper {
			margin-left: 8upx;
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			.disTopWrapper{
				width: 100%;
				display: flex;
				flex-direction: row;
				height: $avatarAreaWidth;
				justify-content: space-between;
				align-items: center;
				.disRateRender {
					display: flex;
					flex-direction: row;
				}
				.disNameAndDate {
					display: flex;
					flex-direction: column;
					.disName {
						font-size: 0.7rem;
					}
					.disDate {
						font-size: 0.5rem;
					}
				}
			}
			.disContentRender {
				flex-grow: 1;
				margin-top: 5upx;
			}
		}
	}
	.disListwrapper{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		.disListRender{
			width: 87%;
			background-color: white;
			border-radius: $border-radius;
			display: flex;
			flex-direction: column;
			align-items: center;
			// 列表项
			.disItemWrapper {
				width: 100%;
				padding: 20upx 0;
				display: flex;
				flex-direction: row;
				justify-items: center;
				align-content: center;
				@include avatar;
				@include  content;
			}
		}
	}
</style>
