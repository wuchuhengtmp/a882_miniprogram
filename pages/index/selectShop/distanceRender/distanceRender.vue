<template>
	<view>
        {{distance}}Km
	</view>
</template>

<script>
	import {getDistance} from "../../../../utils/common";

	export default {
		props: {
			latitude: Number,
			longitude: Number,
			myLatitude: Number,
			myLongitude: Number
		},
		data() {
			return {
				
			}
		},
        computed: {
			distance() {
				let distance = getDistance(this.latitude, this.longitude, this.myLatitude,this.myLongitude);
				distance = Math.round(distance / 1000);
				return distance;
			}
		}
	}
</script>

<style>

</style>
