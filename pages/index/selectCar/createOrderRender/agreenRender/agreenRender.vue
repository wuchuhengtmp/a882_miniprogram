<template>
	<itemSlotRender
			background="none"
	>
		<view class="agreenWrapper">
			<radio
				 class="isAgreenClause"
			     :color="themeColor"
			/>我已阅读并同意
			<text
				class="clauseRender"
				@click="goToClauses(2)"
			>《预定条款》</text>
			<text class="clauseRender"
				  @click="goToClauses(5)"
			>《预定须知》
			</text>
		</view>
	</itemSlotRender>
</template>

<script>
    import {themeColor} from "../../../../../utils/Config";
    import itemSlotRender from "../components/itemSlotRender/itemSlotRender";
    import {nativeToClausePageById} from "../../../../../utils/common";

	export default {
		components: {
			itemSlotRender
		},
		data() {
			return {
				themeColor
			}
		},
		methods: {
			// 跳转到条款说明页面
			goToClauses(id)
			{
				nativeToClausePageById(id);
			}
		}
	}
</script>

<style lang="scss">
    @import "../../../../../uni";
	.agreenWrapper {
		font-size: .8rem;
		.isAgreenClause {
			transform: scale(0.85);
			display: inline-block;
		}
		.clauseRender {
			color: $theme-color;
		}
	}
</style>
