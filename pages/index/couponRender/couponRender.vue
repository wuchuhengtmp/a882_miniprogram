<template>
    <view>
<!--        <uni-popup ref="popup" type="center">底部弹出 Popup</uni-popup>-->
<!--        <button @click="open">open</button>-->
    </view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				
			}
		},
		methods: {
            open() {
	            this.$refs.popup.open()
            }
		}
	}
</script>

<style>

</style>
