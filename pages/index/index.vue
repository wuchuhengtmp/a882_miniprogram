<template>
	<carousel :img-list="imgList" url-key="url" @selected="selectedBanner" />
</template>

<script>
	import carousel from '@/components/vear-carousel/vear-carousel'
	export default {
		components: {
			carousel
		},
		data() {
			return {
				imgList: [{
						url: '/static/images/swiper/1.jpg',
						id: 1,
						nav: 'http://xxx.com'
					},
					{
						url: '/static/images/swiper/2.jpg',
						id: 2,
						nav: 'http://xxx.com'
					},
					{
						url: '/static/images/swiper/3.jpg',
						id: 3,
						nav: 'http://xxx.com'
					}
				]
			}
		},
		methods: {
			selectedBanner(item, index) {
				console.log('', item, index)
			}
		}
	}
</script>
