<template>
	<item-render>
		<template>
			<image
					:src="banner"
			/>
			<view class="CIInfoWrapper">
				<view class="name">
					{{`${brand} ${name}`}}
					<preferential-render />
				</view>
				<view class="tags">
					<text
							v-for="(tag, index) in tags"
							:key="index"
					>
						{{`${tag} `}}
					</text>
				</view>
			</view>
		</template>
	</item-render>
</template>

<script>
    import itemRender from '../components/itemSlotRender/itemSlotRender'
	import preferentialRender from "../../../components/preferentialRender/preferentialRender";

	export default {
    	components: {
			itemRender,
			preferentialRender
		},
		props:{
			name: String,
			tags: Array,
			banner: String,
			brand: String
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
	@import "../../../../../uni";
	image {
		width: $car-img-width;
		height: $car-img-height;
		border-radius: $car-img-border-radius;
	}
	// 信息说明区
	.CIInfoWrapper  {
		margin-left: 10upx;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		$item-height: 48upx;
		.name {
			font-size: .9rem;
			height: $item-height;
			line-height: $item-height;
		}
		.tags {
			font-size: .7rem;
			color: $subTitlecolor;
			height: $item-height;
			line-height: $item-height;
		}
	}
</style>
