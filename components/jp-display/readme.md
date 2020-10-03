### 标签名: ```<jp_display>```
#### 有偿组件：有需要请联系 QQ:371524845   微信：jp99ww
### 参数说明： 
| 参数        | 默认值    | 类型 |  说明  |
|  :----:   |  :----:  | :----:  |:----:  |
|    images   |   |   Array |图片列表 |
| vtouch        |  true  |   Boolean   |是否支持手势切换  |
| autoplay        |    true   |  Boolean  |是否自动轮播 |
| interval        |    3000   |  Number  |轮播间隔（ms） |
| clockwise        |    false   |  Boolean  |顺时针轮播 |
| height        |    308rpx   |  String  |图片高度 |

### 事件

| 参数         |  说明  |
|  :----:   |  :----:  |
|    itap   | 返回图片在列表中的index  |


### 使用示例
```
<template>
	<view style="padding: 30rpx;">
		<jpDisplay :images="img1" :vertical="false" :vtouch="true" @itap="tap" :autoplay="autoplay" :clockwise="true"
		 :interval="3500" height="318rpx"></jpDisplay>
	</view>
</template>

<script>
	import jpDisplay from '@/components/jp_display/jp_display.vue';
	export default {
		components: {
			jpDisplay
		},
		data() {
			return {
				autoplay: true,
				deg: 0,
				img1: [require('@/static/1.png'), require('@/static/5.png'), require('@/static/6.png'), require('@/static/2.png')],
				current: 0,
			};
		},
		onShow: function() {
			this.autoplay = true
		},
		onHide: function() {
			this.autoplay = false
			console.log(this.autoplay)
		},
		watch: {},
		methods: {
			tap(el, eit) {
				console.log(el, eit)
			},
		}
	}
</script>


```