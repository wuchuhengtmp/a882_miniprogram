<template>
	<view class="componentWrapper">
		<view class="labelRender">
			取还车城市
		</view>
		<view>
			<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
				<view class="inputWrapper">
					<view class="uni-input">
						<!-- 	{{multiArray[0][multiIndex[0]]}}，
						{{multiArray[1][multiIndex[1]]}}， -->
						{{multiArray[2][multiIndex[2]]}}
					</view>
					<view>
						<text class="icon-xiangxia"></text>
					</view>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				multiArray: [
					['亚洲', '欧洲'],
					['中国', '日本'],
					['北京', '上海', '广州']
				],
				multiIndex: [0, 0, 0]
			};
		},
		methods: {
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.multiIndex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.multiIndex[0]) {
							case 0:
								this.multiArray[1] = ['中国', '日本']
								this.multiArray[2] = ['北京', '上海', '广州']
								break
							case 1:
								this.multiArray[1] = ['英国', '法国']
								this.multiArray[2] = ['伦敦', '曼彻斯特']
								break
						}
						this.multiIndex.splice(1, 1, 0)
						this.multiIndex.splice(2, 1, 0)
						break
					case 1: //拖动第2列
						switch (this.multiIndex[0]) { //判断第一列是什么
							case 0:
								switch (this.multiIndex[1]) {
									case 0:
										this.multiArray[2] = ['北京', '上海', '广州']
										break
									case 1:
										this.multiArray[2] = ['东京', '北海道']
										break
								}
								break
							case 1:
								switch (this.multiIndex[1]) {
									case 0:
										this.multiArray[2] = ['伦敦', '曼彻斯特']
										break
									case 1:
										this.multiArray[2] = ['巴黎', '马赛']
										break
								}
								break
						}
						this.multiIndex.splice(2, 1, 0)
						break
				}
				this.$forceUpdate()
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
