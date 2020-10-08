<template>
	<view>
		<order-item-render />
		<order-item-render />
		<order-item-render />
	</view>
</template>

<script>
    import orderItemRender from "../orderItemRender/orderItemRender";
	export default{
		components: {
			orderItemRender
		}

	}
</script>

<style lang="scss">
</style>
