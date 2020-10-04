<template>
	<view class="componentWrapper">
		<view class="labelRender">
			选择门店
		</view>
		<view>
			<picker @change="bindPickerChange"
			 :value="index"
			 :range="array" 
			 range-key="name"
			 >
				<view class="inputWrapper">
					<view class="uni-input">
						{{array[index].name}}
					</view>
					<view>
						<text class="icon-xiangxia"></text>
					</view>
				</view>
			</picker>
			</picker>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'picker',
				array: [{
					name: '中国'
				}, {
					name: '美国'
				}, {
					name: '巴西'
				}, {
					name: '日本'
				}],
				index: 0
			};
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
			}
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
			width: 4rem;
			display: flex;
			flex-direction: row;

			.uni-input {
				width: 3rem;
				text-align: center;
			}
		}
	}
</style>
