<template>
	<view class="mainWrapper">
        <view class="leftBarWrapper">
			<view
					v-for="(item, index) in list"
					:key="index"
					:class="{itemWrapper: true, active: index === active}"
					@click="onChangeActive(index)"
			>
				{{item.title}}
			</view>
		</view>
		<view class="rightBarWrapper">
			<view class="contentRender">
				{{list[active].content}}
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data: function() {
			return {
			    active: 0,
			    list: [
					{title: '问题1', content: '问题1内容'},
					{title: '问题2', content: '问题2内容'},
					{title: '问题3', content: '问题3内容'},
					{title: '问题4', content: '问题4内容'},
					{title: '问题5', content: '问题5内容'},
					{title: '问题6', content: '问题6内容'},
					{title: '问题7', content: '问题7内容'},
					{title: '问题8', content: '问题8内容'},
					{title: '问题9', content: '问题9内容'},
					{title: '问题10', content: '问题10内容'},
					{title: '问题11', content: '问题11内容'},
					{title: '问题12', content: '问题12内容'},
					{title: '问题13', content: '问题13内容'},
					{title: '问题14', content: '问题14内容'},
					{title: '问题15', content: '问题15内容'},
					{title: '问题16', content: '问题16内容'},
					{title: '问题17', content: '问题17内容'},
					{title: '问题18', content: '问题18内容'},
					{title: '问题19', content: '问题19内容'},
					{title: '问题20', content: '问题20内容'},
				]
			};
		},
        create: function() {
			uni.setNavigationBarTitle({
				title: '常见问题'
			});
		},
		methods: {
			onChangeActive: function(index) {
				this.active = index
			}
		}
	}
</script>

<style lang="scss">
    @import "../../../uni";
.mainWrapper {
    width: 100%;
	height: 100vh;
    display: flex;
	flex-direction: row;
	.leftBarWrapper {
		width: 200upx;
		height: 100%;
        background-color: $uni-bg-color;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		overflow: auto;
        .itemWrapper {
            $height: 80upx;
			line-height: $height;
			height: $height;
			width: 100%;
            color: black;
			text-align: center;
		}
        .active {
			background-color: #fff;
		}
	}
	.rightBarWrapper {
        flex: 1;
		height: 100%;
		background-color: #fff;
		.contentRender {
			padding: 20upx;
		}
	}
}
</style>
