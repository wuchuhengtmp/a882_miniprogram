<template>
	<view class="componentWrapper">
		<view class="labelRender">
			{{label}}
		</view>
		<view>
			<view
				class="inputWrapper"
			>
				<view v-if="initTime">
					<view class="uni-input">
						{{(new Date(initTime)).getFullYear()}}/{{(new Date(initTime)).getMonth() + 1 | formateDate}}/{{(new Date(initTime)).getDate() | formateDate}}
					</view>
					<view class="uni-input">
						{{(new Date(initTime)).getHours() | formateDate}}:{{(new Date(initTime)).getMinutes() | formateDate}}
					</view>
				</view>
				<view v-else class="notice">
					请选择
					<text class="icon-xiangxia"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
		props: {
			label: String,
			initTime: {
				type: Number,
				default: undefined
			}
		},

		data() {
			return {
				isShow: false
			};
		},
		filters:{
			formateDate: (e) => e < 10 ? `0${e}` : `${e}`
		},
		computed: {
		},
		methods: {
		},
		updated() {

		},
		mounted() {

		},
		created() {
			console.log(this.initTime);
		}
	}
</script>

<style lang="scss">
	@import '../index.scss';

	.componentWrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		.labelRender {
			font-size: .7rem;
			margin-bottom: .5rem;
			color: $color;
			width: 4rem;
			text-align: center;

		}
		.inputWrapper {
			display: flex;
			flex-direction: column;
			width: 100%;
			.notice {
				width: 100%;
				text-align: center;
				padding-left: 10upx;
			}
			.uni-input {
				flex: 1;
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
